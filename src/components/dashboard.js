import { useState, useEffect } from 'react';
import BubbleSort from './bubbleSort';

const Dashboard = () => {
    const [currentAlgorithms, setCurrentAlgorithms] = useState('bubbleSort');

    const sortAlgorithm = [
        'bubbleSort',
        'insertionSort',
        'selectionSort',
        'quickSort',
        'mergeSort',
        'countSort',
        'radixSort',
        'heapSort',
        'cyclicSort',
        'timSort',
        'bitonicSort',
        'bucketSort',
    ]


    useEffect(() => {
        setCurrentAlgorithms('bubbleSort');
    }, []);

    const onChangeAlgorithms = (event) => {
        const algorithms = event.target.value;
        setCurrentAlgorithms(algorithms);
    }

    const renderDashboard = () => {
        switch(currentAlgorithms) {
            case 'bubbleSort':
                return <BubbleSort/>;
            default:
                return <div className="flex justify-center">{currentAlgorithms} name not found!!</div>;
        }
    }
    
    return (
        <div className="w-100">
            <div className="flex justify-center gap-3 my-3 items-center">
                <select className="w-64 p-3 border-2 border-sky-500" onChange={onChangeAlgorithms}>
                    {
                        sortAlgorithm?.map((value) => {
                            return <option key={value} className="p-2" value={value}>{value}</option>
                        })
                    }
                </select>
            </div>
            <div className="grid-rows-1 grid-flow-col">
                {renderDashboard()}
            </div>
        </div>
    );
}

export default Dashboard;