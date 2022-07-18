import React from 'react'

import BarChart from './components/Barchart';
import LineChart from './components/Linechart'
import RadarChart from './components/Radar'
import SummaryBoard from './components/SummaryBoard'
import IssueBoard from './components/IssueBoard'
import './App.css';


const App = () => {
  return (
    <div>
      <div className='tables'>
        <div><SummaryBoard /></div>
        <div><IssueBoard /></div>
      </div>
      
      <div className='graphs'>
        <div className='radar'>
          <RadarChart />
        </div>
        <div className='linebar'>
          <LineChart />
          <BarChart />
        </div>
      </div>
      
    </div>
    )
}

export default App