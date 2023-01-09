import React from 'react'
import { db } from '../../firebase'
import { excerpt } from '../../utility'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
const Slides = ({imageUrl,title,description,goal,id}) => {
    const [signs,setSigns]=useState([])
    useEffect(()=>{
        onSnapshot(collection(db,'petition',id,'signedUsers'),(snapshot)=>{setSigns(snapshot.docs)})
      },[db,id])
  return (
    <div className='slide'>
        <div className='slider-img'>
            <img src={imageUrl} alt="" style={{height:'100%'}} />
        </div>
        <div className='slider-detail'>
            <h1>{excerpt(title,30)}</h1>
            <p>{excerpt(description,200)}</p>
            <div className='sign-tracker'>
                <div className='tracker' style={{width:`${(signs.length/goal)*100}%`}}>
                  
                </div>
            </div>
            <Link to={`/detail/${id}`}>
            <button>Sign Petition</button>
            </Link>
        </div>
        </div>
  )
}

export default Slides