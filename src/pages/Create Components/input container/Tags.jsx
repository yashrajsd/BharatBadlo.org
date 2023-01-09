import React from 'react'
import { useState } from 'react'
import './Tags.scss'

const topics=[
  'Animals',
  'Civic',
  'Criminal Jusctice',
  'Economic Justice',
  'Education',
  'Enviroment',
  'Entertainment',
  'Family',
  'Food',
  'Health',
  'Human Rights',
  'immigration',
  'Politics',
  'CHild Rights',
  'Womens Rights',
  'Other'
]

const Tags = ({setRender,setloader}) => {
  const [active,setActive] = useState(null);
  const handleTags=(e)=>{
  }
  const handleBack=()=>{
      setRender('locality')
      setloader('p-1')
  }
  const handleContinue=()=>{
      setRender('title')
      setloader('p-3')
  }
  return (
    <div className='tag-container'>
      <h1>What's the topic that best fits your petition?</h1>
      <div className='tags-container'>
        {topics.map((topic,index)=>{
          return(
          <button className={`tag-btn ${active===topic && 'tag-active'}`} key={index} value={topic}>{topic}</button>
          )
        })}
      </div>
      <div className='tag-continue'>
        <button className='tag-btn-1' onClick={handleBack}>Back</button>
        <button className='tag-btn-2' onClick={handleContinue}>Continue</button>
      </div>
    </div>
  )
}

export default Tags