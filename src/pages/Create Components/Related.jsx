import React from 'react'
import { db } from '../../firebase'
import { getDocs } from 'firebase/firestore'
import { excerpt } from '../../utility'
import { Link } from 'react-router-dom'
import { where } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { query } from 'firebase/firestore'
import './Related.scss'
import { useEffect } from 'react'
const Related = ({category}) => {

 const [relatedPetition,setRelatedPetition] = useState([])
 
 useEffect(()=>{
    getRelatedPetition();
  },[relatedPetition])

  const getRelatedPetition = async ()=>{
    const petitionRef = collection(db,'petition')
    const nationalQuery = query(petitionRef, where('category','==',`${category}`));
    const querySnapshot = await getDocs(nationalQuery);
    let somePetition=[];
    querySnapshot.forEach((doc)=>{
      somePetition.push({id:doc.id,...doc.data()})
    });
    setRelatedPetition(somePetition)
  }

  return (
    <div className='related-content'>
        <div className='card-c'>
            <h1>Related Petitions</h1>
            <div className='card-slider'>
            {relatedPetition.map((card,index)=>{
                return(
                    <div className='card-c-c' key={index}>
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
    </div>
  )
}

export default Related