import React from 'react'
import './table.css'

const SummaryBoard = () => {
    return (
        <div class='summaryBoard'>
            <div>
                <table>
                    <tr>
                        <td>
                            Prediction: 3
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Complexity Level: Medium
                        </td>
                        <td>Overall Sentiment: Positive</td>
                    </tr>
                    <tr>
                        <td>
                            Total number of Story Points: 25
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
        )
}

export default SummaryBoard;