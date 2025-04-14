import {useEffect, useState} from 'react';
import { useTimer } from '../hooks/useTimer';
import { useCompletionAnimation } from '../hooks/useCompletionAnimation';

const InsertionSort = () => {
    const [array, setArray] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [swappedIdx, setSwappedIdx] = useState(-1);
    const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();
    const { completedIndices, animateCompletion } = useCompletionAnimation(40);

    useEffect(() => {
        generateArray();
    }, []);

    const generateArray = () => {
        const newArray = [];
        for (let i = 0; i < 40; i++) {
            newArray.push(Math.floor(Math.random() * 400) + 1);
        }
        setArray(newArray);
    };

    const insertionSort = async () => {
        resetTimer();
        startTimer();
        let newArray = [...array];
        for (let i = 1; i < newArray.length; i++) {
            let current = newArray[i];
            let j = i - 1;
    
            setCurrentIdx(i);
            
            while ((j > -1) && (current < newArray[j])) {
                newArray[j + 1] = newArray[j];
                setSwappedIdx(j);
                j--;
                
                setArray([...newArray]);
                await new Promise(resolve => setTimeout(resolve, 30));
            }
            newArray[j + 1] = current;
        }
        setArray(newArray);
        setCurrentIdx(-1);
        setSwappedIdx(-1);
        await animateCompletion();
        stopTimer();
    }

    return (
        <div>
            <div className="flex flex-col gap-3 items-center mb-3">
                <button className="w-32 bg-orange-400 px-2 py-1" onClick={insertionSort}>Sort</button>
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
    );
}

export default InsertionSort;