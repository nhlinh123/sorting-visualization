import {useEffect, useState} from 'react';

const InsertionSort = () => {
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



    const insertionSort = async () => {
        let newArray = [...array];
        for (let i = 1; i < newArray.length; i++) {
            let current = newArray[i];
            let j = i - 1;
    
            setCurrentIdx(i);
            
            while ((j > -1) && (current < newArray[j])) {
                newArray[j + 1] = newArray[j];
                setSwappedIdx(j);
                j--;
                
                // Cập nhật trạng thái UI tại mỗi bước
                setArray([...newArray]);
                await new Promise(resolve => setTimeout(resolve, 100)); // Đợi một khoảng thời gian để hiển thị trạng thái trên UI
            }
            newArray[j + 1] = current;
        }
        // Cuối cùng cập nhật mảng sau khi sắp xếp xong
        setArray(newArray);
        setCurrentIdx(-1);
        setSwappedIdx(-1);
    }

    return (
        <div>
             <div className="flex flex-col gap-3 items-center mb-3">
                <button className="w-32 bg-orange-400 px-2 py-1" onClick={insertionSort}>Sort</button>
            </div>
            <div className="flex flex-row items-start h-96">
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
}

export default InsertionSort;