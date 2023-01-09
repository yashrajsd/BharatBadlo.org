import React, { useState } from 'react'
import './Auth.scss'
import { auth } from '../firebase'
import {useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { toast } from 'react-toastify'

const initialState={
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}

const Auth = ({setActive}) => {
  const [state,setState] = useState(initialState);
  const {firstName,lastName,email,password,confirmPassword} = state
  const [signIn,setSignIn]= useState(true)
  const navigate = useNavigate()

  const handleChange=(e)=>{
    setState({...state,[e.target.name]: e.target.value})
  }

  const authHandle=async (e)=>{
    e.preventDefault();
    if(signIn){
      if(!password & !email){
        return toast.error("Enter Email and Password")
      }else{
        const {user} = await signInWithEmailAndPassword(auth,email,password).catch((e)=>{
          toast.error("Login credentials didn't match")
        })
        setActive('home')
        navigate('/')
      }
    }else{
      if(password!==confirmPassword){
        return toast.error("Password didn't match");
      }if(password && firstName && lastName && email){
        const {user} = await createUserWithEmailAndPassword(auth,email,password)
        await updateProfile(user, {displayName:`${firstName} ${lastName}`})
        setActive('home');
      }else{
        return toast.error("All fields are mandatory to fill");
      }
      navigate('/')
    }
  }
  return (
    <div className='auth-container'>
        <form onSubmit={authHandle}>
        <h3>{!signIn?'Sign Up':'Sign In'}</h3>
        {!signIn&&(
          <div className='name-form-container'>
          <input placeholder='Firstname' type='text' name='firstName' onChange={handleChange}/>
          <input placeholder='Lastname' type='text' name='lastName' onChange={handleChange}/>
        </div>
        )}
          <input type='email' placeholder='Enter Email' name='email'onChange={handleChange}/>
          <input placeholder='Enter password' type='password' name='password' onChange={handleChange}/>
          {!signIn&&(
            <input placeholder='Confirm password' type='password' name='confirmPassword' onChange={handleChange}/>
          )}   
          <button className='auth-btn' type='submit'>{!signIn?'Sign UP':'Sign In'}</button>
          {!signIn?(<p>Already have an account? <a onClick={()=>{setSignIn(true)}} style={{cursor:'pointer',color:'#B007FF',fontWeight:'bold'}}>Sign In</a></p>):(<p>Don't have an account? <a onClick={()=>{setSignIn(false)}} style={{cursor:'pointer',color:'#B007FF',fontWeight:'bold'}}>Create new</a></p>)}
        </form>
    </div>
  )
}

export default Auth