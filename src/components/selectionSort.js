import { useEffect, useState } from  'react';


const SelectionSort = () => {
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

    const handleSort = async () => {
        let newArray = [...array];
        const length = newArray.length;
        if (length < 1) return;
    
        for (let i = 0; i < length; i++) {
            let minIndex = i;
            setCurrentIdx(i);
            for (let j = i + 1; j < length; j++) {
                if (newArray[j] < newArray[minIndex]) {
                    minIndex = j;
                }
                setSwappedIdx(minIndex);
            }
            if (minIndex !== i) {
                [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
                setArray([...newArray]); // Cập nhật mảng sau mỗi lần hoán đổi
                await new Promise(resolve => setTimeout(resolve, 100)); // Độ trễ để hiển thị trên UI
            }
        }
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

export default SelectionSort;