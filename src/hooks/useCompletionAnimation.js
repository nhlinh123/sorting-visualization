import { useState } from 'react';

export const useCompletionAnimation = (arrayLength) => {
    const [completedIndices, setCompletedIndices] = useState(new Array(arrayLength).fill(false));

    const animateCompletion = async () => {
        for(let flash = 0; flash < 3; flash++) {
            for(let i = 0; i < arrayLength; i++) {
                setCompletedIndices(prev => {
                    const newState = new Array(arrayLength).fill(false);
                    for(let j = 0; j <= i; j++) {
                        newState[j] = true;
                    }
                    return newState;
                });
                await new Promise(resolve => setTimeout(resolve, 30));
            }
            setCompletedIndices(new Array(arrayLength).fill(false));
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    };

    const resetCompletion = () => {
        setCompletedIndices(new Array(arrayLength).fill(false));
    };

    return {
        completedIndices,
        animateCompletion,
        resetCompletion
    };
};
