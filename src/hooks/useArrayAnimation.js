import { useState, useCallback } from 'react';

export const useArrayAnimation = (initialSize) => {
    const [array, setArray] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [swappedIdx, setSwappedIdx] = useState(-1);

    const generateArray = useCallback(() => {
        const newArray = [];
        for (let i = 0; i < initialSize; i++) {
            newArray.push(Math.floor(Math.random() * 400) + 1);
        }
        setArray(newArray);
        setCurrentIdx(-1);
        setSwappedIdx(-1);
    }, [initialSize]);

    const updateArray = useCallback(async (newArray, current = -1, swapped = -1, delay = 30) => {
        return new Promise(resolve => {
            setArray([...newArray]);
            setCurrentIdx(current);
            setSwappedIdx(swapped);
            if (delay > 0) {
                setTimeout(resolve, delay);
            } else {
                resolve();
            }
        });
    }, []);

    return {
        array,
        currentIdx,
        swappedIdx,
        generateArray,
        updateArray,
        setArray
    };
};
