import React, { useState } from 'react'
import Input from './Create Components/Input'
import Progress from './Create Components/Progress'
import './Create.scss'
const Create = ({user}) => {
  const [loader,setloader]= useState('p-1')
  return (
    <div className='create-container'>
      <Progress loader={loader}/>
      <Input setloader={setloader} loader={loader} user={user}/>
    </div>
  )
}

export default Create