import React from 'react'
import { Radar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


const RadarChart = () => {
    return (
        <div>
            <Radar
                data={{
                    labels: ['Project Management', 'Communication', 'Complexity', 'Efficiency', 'Collaboration'],
                    datasets:[{
                        label: 'Sentiment Score by Category',
                        data: [15, 10, 15, 30, 20],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            // 'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            // 'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}
                height={400}
                width={100}
                options={{maintainAspectRatio: false,}}
            />
        </div>
    )
}

export default RadarChart;
