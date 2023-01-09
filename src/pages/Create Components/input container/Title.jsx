import React from 'react'
import './Title.scss'

const Title = ({title,setRender,setloader,form,setform}) => {
  const handleTitle=(e)=>{
    setform({...form,[e.target.name]: e.target.value})
    console.log(title)
  }
  
  const handleBackTitle=(e)=>{
    e.preventDefault()
    setRender('tags')
    setloader('p-2')
  }
  const handleContinueTitle=()=>{
    setRender('description')
    setloader('p-4')
  }
  return (
    <div className='title-container'>
      <h1>Write your petition title</h1>
      <p>Tell people what you want to change.</p>
      <div className='title-area'>
        <input type="text" name='title' value={title} onChange={handleTitle}/>
      </div>
      <div className='title-continue'>
        <button className='title-btn-1' onClick={handleBackTitle}>Back</button>
        <button className='title-btn-2' onClick={handleContinueTitle}>Continue</button>
      </div>
      <div className='title-tips'>
        <h3 style={{marginBottom:'20px'}}>Tips</h3>
        <span>
        <h3>Keep it short and to the point</h3>
        <h3 className='example'>Example: “Buy organic, free-range eggs for your restaurants.”</h3>
        </span>
        <span>
        <h3>Focus on the solution</h3>
        <h3 className='example'>Example: "Raise the minimum wage in to ₹300 a day."</h3>
        </span>
        <span>
        <h3>Communicate urgency</h3>
        <h3 className='example'>Example: "Approve life-saving medication for my daughter's insurance before it’s too late."</h3>
        </span>
      </div>
    </div>
  )
}

export default Title