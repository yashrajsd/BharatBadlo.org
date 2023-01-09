import React from 'react'
import './Progress.scss'
const Progress = ({loader}) => {
  return (
    <div className='progress-container'>
      <div className='progress-div'>
        <div className={`progress-tracker ${loader}`}>

        </div>
      </div>
    </div>
  )
}

export default Progress