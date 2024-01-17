import React, {useEffect} from 'react';

const BubbleSort = () => {
    // Implement the Bubble Sort logic here
    const [array, setArray] = React.useState([]);
    const [currentIdx, setCurrentIdx] = React.useState(-1);
    const [swappedIdx, setSwappedIdx] = React.useState(-1);


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

    const bubbleSort = () => {
        const n = array.length;
        let tempArray = [...array];

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (tempArray[j] > tempArray[j + 1]) {
                    // Swap elements
                    let temp = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = temp;

                    // Create a copy of the array for each swap step
                    let newArray = [...tempArray];

                    // Set the updated array state
                    setTimeout(() => {
                        setArray(newArray);
                        setCurrentIdx(j);
                        setSwappedIdx(j + 1);
                    }, (i * (n - 1) + j + 1) * 100);
                }
            }
        }
    };



    return (
        <div>
            <div className="flex flex-col gap-3 items-center mb-3">
                <button className="w-32 bg-orange-400 px-2 py-1" onClick={bubbleSort}>Sort</button>
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
    );



};

export default BubbleSort;
