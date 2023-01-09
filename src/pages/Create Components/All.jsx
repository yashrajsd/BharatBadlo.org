import React from 'react'
import PSlider from './PSlider'
import Pic from '../../images/home-img.png'
import { excerpt } from '../../utility'
import { Link } from 'react-router-dom'
import pic from '../.././images/petition.png'
import './ALl.scss'
const All = ({petition,nationalPetition,statePetition}) => {
  return (
    <div className='All-c'>
        <PSlider petition={petition}/>
        <div className='card-c'>
            <h1>National Petitions</h1>
            <div className='card-slider'>
            {nationalPetition.map((card)=>{
                return(
                    <div className='card-c-c'>
                <div className='card-c-c-img'>
                    <img src={card.imageUrl} alt="" />
                </div>
                <div className='card-c-c-info'>
                    <p className='card-c-c-info-title'>{excerpt(card.title,15)}</p>
                    <p>{excerpt(card.description,50)}</p>
                    <Link to={`/detail/${card.id}`}>
                    <button className='card-c-c-info-btn'>Sign Petition</button>
                    </Link>
                </div>
            </div>     
                )
            })}
            </div>
        </div>
        <div className='card-c'>
            <h1>State Petitions</h1>
            <div className='card-slider'>
            {statePetition.map((card)=>{
                return(
                    <div className='card-c-c'>
                <div className='card-c-c-img'>
                    <img src={card.imageUrl} alt="" />
                </div>
                <div className='card-c-c-info'>
                    <p className='card-c-c-info-title'>{excerpt(card.title,20)}</p>
                    <p>{excerpt(card.description,70)}</p>
                    <Link to={`/detail/${card.id}`}>
                    <button className='card-c-c-info-btn'>Sign Petition</button>
                    </Link>
                </div>
            </div>     
                )
            })}
            </div>
        </div>
        <div className='card-your-petition'>
            <div className='c1'>
                <div className='c1-img'>
                    <img src={pic} alt="" />
                </div>
                <div className='c1-text'>
                    <h1>Create Your Petition Now</h1>
                    <p>A petition is a request to do something, most commonly addressed to a government official or public entity.</p>
                    <button>Create My Petition</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default All
