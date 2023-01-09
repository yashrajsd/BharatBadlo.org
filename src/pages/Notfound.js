import React from 'react'
import './Notfound.scss'
import LostMan from '.././images/lostman.png'

const Notfound = () => {
  return (
    <div className='notfound-container'>
      <div className='c1'>
        <img src={LostMan}/>
      </div>
      <div className='c2'>
        <h1>Page Not Found</h1>
        <p>The link you followed probabily broken or the page has been removed</p>
      </div>
    </div>
  )
}

export default Notfound