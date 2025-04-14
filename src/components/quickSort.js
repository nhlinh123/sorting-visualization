import React, { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useCompletionAnimation } from '../hooks/useCompletionAnimation';
import { useArrayAnimation } from '../hooks/useArrayAnimation';

const QuickSort = () => {
    const { array, currentIdx, swappedIdx, generateArray, updateArray } = useArrayAnimation(40);
    const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();
    const { completedIndices, animateCompletion } = useCompletionAnimation(40);

    useEffect(() => {
        generateArray();
    }, [generateArray]);

    const quickSort = async () => {
        resetTimer();
        startTimer();
        const arr = [...array];
        await quickSortHelper(arr, 0, arr.length - 1);
        await updateArray(arr, -1, -1);
        await animateCompletion();
        stopTimer();
    };

    const quickSortHelper = async (arr, low, high) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    };

    const partition = async (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            await updateArray(arr, j, high);
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                await updateArray(arr, i, j);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        await updateArray(arr, i + 1, high);
        return i + 1;
    };

    return (
        <div>
            <div className="flex flex-col gap-3 items-center mb-3">
                <button className="w-32 bg-orange-400 px-2 py-1" onClick={quickSort}>Sort</button>
            </div>
            <div className="flex flex-row justify-center items-start h-96">
                {array.map((value, idx) => (
                    <div
                        className={`w-10 mr-1 transition-colors duration-300 ${
                            completedIndices[idx] ? 'bg-green-500' : 
                            idx === swappedIdx ? 'bg-red-500' : 
                            idx === currentIdx ? 'bg-orange-500' : 
                            'bg-blue-500'
                        }`}
                        key={idx}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
            <div className="text-center mt-4">
                Time: {(elapsedTime / 1000).toFixed(2)} seconds
            </div>
        </div>
    );
};

export default QuickSort;
