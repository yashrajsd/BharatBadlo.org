import React from 'react'
import './Browse.scss'
import { useState,useEffect } from 'react'
import { collection, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import PSlider from './Create Components/PSlider'
import All from './Create Components/All'
import National from './Create Components/Detail Components/National'
import State from './Create Components/Detail Components/State'
const tags=[
  'Animals',
  'Civic',
  'Criminal Justice',
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
  'Child Rights',
  'Women Rights',
  'Other'
]

const Browse = ({user}) => {
  const [loading,setLoading] = useState(true)
  const [petition,setPetition] = useState([]);
  const [nationalPetition,setNationalPetition] = useState([]);
  const [view,setView] = useState('all')
  const [statePetition,setStatePetition] = useState([])

  const getNationalPetition = async ()=>{
    const petitionRef = collection(db,'petition')
    const nationalQuery = query(petitionRef, where('locality','==','national'));
    const querySnapshot = await getDocs(nationalQuery);
    let nationalPetition=[];
    querySnapshot.forEach((doc)=>{
      nationalPetition.push({id:doc.id,...doc.data()})
    });
    setNationalPetition(nationalPetition)
  }
  const getStatePetition = async ()=>{
    const petitionRef = collection(db,'petition')
    const stateQuery = query(petitionRef, where('locality','==','state'));
    const querySnapshot = await getDocs(stateQuery);
    let statePetition=[];
    querySnapshot.forEach((doc)=>{
      statePetition.push({id:doc.id,...doc.data()})
    });
    setStatePetition(statePetition)
  }

  useEffect(()=>{
    getNationalPetition();
    getStatePetition();
    const unsub = onSnapshot(
      collection(db,'petition'),
      (snapshot)=>{
        let list = [];
        snapshot.docs.forEach((doc)=>{
          list.push({id: doc.id,...doc.data()})
        });
        setPetition(list);
      },(error)=>{
        console.log(error)
      }
    )
    return ()=>{
      unsub();
      getNationalPetition();
      getStatePetition();
    }
  },[])
  return (
    <div className='browse'>
      <div className='browse-navbar'>
        <div className='browse-link'>
          <ul>
            <li onClick={()=>setView('all')}>
              <p>All</p>
            </li>
            <li onClick={()=>setView('national')}>
              <p>National</p>
            </li>
            <li onClick={()=>setView('state')}>
              <p>State</p>
            </li>
            <li onClick={()=>setView('search')}>
              <p>Search</p>
            </li>
            <li>
              <select className='select-tags'>
                <option value={null}>Select Category</option>
                {tags.map((tag,index)=>{
                  return(
                    <option key={index} value={tag}>{tag}</option>
                  )
                })}
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div className='content'>
      {view==='all' && (
        <All petition={petition} nationalPetition={nationalPetition} statePetition={statePetition}/>
  )}
  {view==='national'&& <National nationalPetition={nationalPetition}/>}
  {view==='state' && <State statePetition={statePetition}/>}

      </div>
    </div>
  )
}

export default Browse