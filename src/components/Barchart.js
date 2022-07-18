import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


const BarChart = () => {
    return (
        <div>
            <Bar
                data={{
                    labels: ['Delivered Story Points', 'Committed Story Points'],
                    datasets:[{
                        label: 'Current Team Performance',
                        data: [18, 34],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}
                // height={400}
                // width={10}
                options={{maintainAspectRatio: false,}}
            />
        </div>
    )
}

export default BarChart;
