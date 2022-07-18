import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


const LineChart = () => {
    return (
        <div>
            <Line
                data={{
                    labels: ['Sprint1', 'Sprint2', 'Sprint3', 'Sprint4', 'Sprint5'],
                    datasets:[{
                        label: 'Actual Days',
                        data: [23, 8, 17, 22, 6],
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        // ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                        tension: 0.1
                    },
                    {
                        label: 'Committed Days',
                        data: [23, 16, 15, 30, 26],
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        // ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                        tension: 0.1
                    }
                ]
                }}
                // height={400}
                // width={10}
                options={{maintainAspectRatio: false,}}
            />
        </div>
    )
}

export default LineChart;