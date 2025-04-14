import { useEffect, useCallback } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useCompletionAnimation } from '../hooks/useCompletionAnimation';
import { useArrayAnimation } from '../hooks/useArrayAnimation';

const MergeSort = () => {
    const { array, currentIdx, swappedIdx, generateArray, updateArray } = useArrayAnimation(40);
    const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();
    const { completedIndices, animateCompletion } = useCompletionAnimation(40);

    useEffect(() => {
        generateArray();
    }, []); // Remove generateArray from dependencies

    const mergeSortRecursive = useCallback(async (arr, start, end) => {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);
        await mergeSortRecursive(arr, start, mid);
        await mergeSortRecursive(arr, mid + 1, end);
        await merge(arr, start, mid, end);
    }, [updateArray]);

    const merge = useCallback(async (arr, start, mid, end) => {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            await updateArray(arr, k, mid);
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            k++;
        }

        while (i < left.length) {
            await updateArray(arr, k, start + i);
            arr[k] = left[i];
            i++;
            k++;
        }

        while (j < right.length) {
            await updateArray(arr, k, mid + 1 + j);
            arr[k] = right[j];
            j++;
            k++;
        }
    }, [updateArray]);

    const handleSort = useCallback(async () => {
        resetTimer();
        startTimer();
        const arrCopy = [...array];
        await mergeSortRecursive(arrCopy, 0, arrCopy.length - 1);
        await updateArray(arrCopy, -1, -1);
        await animateCompletion();
        stopTimer();
    }, [array, mergeSortRecursive, updateArray, resetTimer, startTimer, stopTimer, animateCompletion]);

    return (
        <div>
            <div className="flex flex-col gap-3 items-center mb-3">
                <button className="w-32 bg-orange-400 px-2 py-1" onClick={handleSort}>Sort</button>
            </div>
            <div className="flex flex-row justify-center items-start h-96">
                {array.map((value, idx) => (
                    <div
                        className={`w-10 mr-1 transition-colors duration-300 ${
                            completedIndices[idx] ? 'bg-green-500' : 
                            idx === currentIdx ? 'bg-orange-500' : 
                            idx === swappedIdx ? 'bg-green-500' : 
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
    )
}

export default MergeSort;