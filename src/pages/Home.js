import React from 'react'
import './Home.scss'
import Man from '.././images/illustration.png'
const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-c1'>
        <div className='c1'>
        <div>
        <h1>India’s platform for change</h1>
        <p>Take a step towards a Change, A change for better India</p>
        <button>Start a Petition</button>
        </div>
        </div>
        <div className='c2'>
          <img src={Man} alt='illustration png'/>
        </div>
      </div>
      <div className='home-image'>
        <div>
        <h1>Be The Change</h1>
        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>
      </div>
    </div>
  )
}

export default Home