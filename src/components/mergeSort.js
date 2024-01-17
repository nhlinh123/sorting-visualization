import { useEffect, useState } from 'react';

const MergeSort = () => {
    // Implement the Bubble Sort logic here
    const [array, setArray] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [swappedIdx, setSwappedIdx] = useState(-1);

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

    const mergeSortRecursive = async (arr, startIndex = 0) => {
        if (arr.length < 2) return arr;
    
        const middle = Math.floor(arr.length / 2);
        const left = await mergeSortRecursive(arr.slice(0, middle), startIndex);
        const right = await mergeSortRecursive(arr.slice(middle), startIndex + middle);
    
        return await merge(left, right, startIndex);
    }
    
    const merge = async (left, right, startIndex) => {
        let result = [], leftIndex = 0, rightIndex = 0;
    
        while (leftIndex < left.length && rightIndex < right.length) {
            setCurrentIdx(startIndex + leftIndex + rightIndex);
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex++]);
            } else {
                result.push(right[rightIndex++]);
            }
            setSwappedIdx(startIndex + result.length - 1);
            await new Promise(resolve => setTimeout(() => resolve, 100));
        }
    
        const merged = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        setArray(merged);
        return merged;
    }
    
    const handleSort = async () => {
        const sortedArray = await mergeSortRecursive(array);
        setArray(sortedArray);
        setCurrentIdx(-1);
        setSwappedIdx(-1);
    }
    

    return (
        <div>
            <div className="flex flex-col gap-3 items-center mb-3">
                <button className="w-32 bg-orange-400 px-2 py-1" onClick={handleSort}>Sort</button>
            </div>
            <div className="flex flex-row justify-center items-start h-96">
                {array.map((value, idx) => (
                    <div
                        className={`bg-blue-500 w-10 mr-1 transition-colors duration-300 ${idx === currentIdx ? 'bg-orange-500' : idx === swappedIdx ? 'bg-green-500' : ''}`}
                        key={idx}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default MergeSort;