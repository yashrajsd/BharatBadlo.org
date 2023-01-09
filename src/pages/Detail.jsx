import { async } from '@firebase/util';
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { arrayRemove,arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import './Detail.scss'
import Related from './Create Components/Related';

const Detail = ({setActive,user}) => {
    const {id} = useParams();
    const [petition,setPetition] =useState(null)
    const [signs,setSigns] =useState([])
    const [hasSigned,setHasSigned] = useState(false)
    useEffect(
        ()=>{
            id && getPetitionDetail();
        },[id]
    )
    useEffect(
      ()=>{
        setHasSigned(signs.findIndex((sign)=> sign.id===user.uid ) !== -1)
      },[signs]
    )

    useEffect(()=>{
      onSnapshot(collection(db,'petition',id,'signedUsers'),(snapshot)=>{setSigns(snapshot.docs)})
    },[db,id])

    const signPetition =async ()=>{
        await setDoc(doc(db,'petition',id,'signedUsers',user.uid),{
          username:user.displayName
        })
    }

    

    const getPetitionDetail= async()=>{
        const docRef = doc(db,'petition',id);
        const petitionDetail = await getDoc(docRef)
        setPetition(petitionDetail.data());
        setActive(null)
    }
    useEffect( ()=>{
      if(signs.length >= petition?.goal){
         updateGoal()
      }
    },[signs,petition,id])

    const updateGoal= async ()=>{
      await updateDoc(doc(db,'petition',id),{
        goal: petition.goal*10,
      })
    }

  return (
    <div>
      <div className='d-container'>
      <div className='c1-container'>
      <h1>{petition?.title}</h1>
      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
      <img src={petition?.imageUrl} alt="" />
      <h3><span className='startedBy'>This Petition was started by </span>{petition?.author}</h3>
      </div>
      <p>{petition?.description}</p>
      </div>
      <div className='c2-container'>
        <div className='sign-petition-card'>
          <p>The petition is Signed By {signs.length} Supporters</p>
          <div className='sign-tracker'>
                <div className='tracker' style={{width:`${(signs.length/petition?.goal)*100}%`}}>
                  <div className='tracker-c'>

                  </div>
                </div>
            </div>
            <div className='goal-container'>
              <p>Goal: {petition?.goal}</p>
            </div>
          {hasSigned ? (<div>
            <p style={{color:'#393939',fontSize:'13px'}}>You Have Already Signed The Petition</p>
            <div className='congo'>
              <h1>Every support towards a change Matters! Thankyou for signing
              </h1>
            </div>
          </div>)
          :
          (<button onClick={signPetition} className='signp-btn'>SIgn Petition</button>)} 
        </div>
      </div>
    </div>
    <Related category={petition?.category}/>
    </div>
  )
}

export default Detail