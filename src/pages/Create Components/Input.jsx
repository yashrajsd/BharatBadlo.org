import React from 'react'
import './Input.scss'
import { useState} from 'react'
import './input container/Tags.scss'
import './input container/Title.scss'
import './input container/Description.scss'
import thumbsMan from './publish.png'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { async } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
const initialState ={
  locality:'',
  category:'',
  title:'',
  description:'',
  state:'all',
  imageUrl:'',
  goal:10,
  vistory:false
}

const stateOption=[ 
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"
  ]


const Input = ({setloader,user}) => {
  const [form,setform] = useState(initialState);
  const {locality,category,title,description,state} = form
  const [render,setRender] = useState('locality')
  const [active,setActive] =useState(null)
  const [local,setLocal] = useState(null)
  const [file,setFile] = useState(null)
  const [progress,setProgress] =useState(null)
  const [tag,setTag] = useState(null)
  const navigate=useNavigate()

  useEffect(
    ()=>{
      const uploadFile =()=>{
        const storageRef = ref(storage,file.name)
        const uploadTask = uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',(snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log('upload is '+progress+'% done')
          setProgress(progress);
          switch(snapshot.state){
            case 'paused':
              console.log('Upload is paused')
              break;
            case 'running':
              console.log('Upload is running');
              break;
              default:break;
          }
        },(error)=>{
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setform((prev)=>({...prev,imageUrl:downloadUrl}))
          })
        })
        toast.success('Successfully Uploaded Image')
      }
      file && uploadFile();
    },[file]
  )

  const handleChanges=(e)=>{
    setform({...form,state: e.target.value})
    console.log(state)
  }

  {/* locality */}

  

const handleLocal=(e)=>{
    setLocal(true)
    setActive('local')
    setform({...form,locality:'state'})
}
const handleNational=()=>{
setLocal(false)
setActive('national')
setform({...form,locality:'national'})
}
const handleContinue=()=>{
setloader('p-2')
setRender('tags')
}
{/* Tags */}

const topics=[
  'Animals',
  'Civic',
  'Criminal Jusctice',
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
  'CHild Rights',
  'Womens Rights',
  'Other'
]


const handleBackTags=()=>{
  setRender('locality')
  setloader('p-1')
}
const handleContinueTags=()=>{
  setRender('title')
  setloader('p-3')
}

const handleCategory=(e)=>{
  e.preventDefault()
  setform({...form,category:e.target.value})
  setTag(e.target.value)
}
{/* Tags */}


{/* Title */}

const handleTitle=(e)=>{
  setform({...form,[e.target.name]: e.target.value})
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
{/* Title */}    

{/*Description */}

const handleTextArea=(e)=>{
  setform({...form,[e.target.name]:e.target.value})
  
}

const handleBackDetail=(e)=>{
  e.preventDefault()
  setRender('title')
  setloader('p-3')
}
const handleContinueDetail=()=>{
  setRender('image')
  setloader('p-5')
}
{/*Description */}

{/* image-upload */}


const handleBackImage=(e)=>{
  e.preventDefault()
  setRender('description')
  setloader('p-4')
}
const handleContinueImage=()=>{
  setRender('post')
  setloader('p-6')
}

const handleSubmit= async (e)=>{
  e.preventDefault();
  if(locality && title&& description &&state &&file){
    try{
      await addDoc(collection(db,'petition'),{
        ...form,
        timstamp:serverTimestamp(),
        author:user.displayName,
        userid: user.uid
      })
      toast.success('Successfully Posted')
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }else{
    return toast.error('All field are mandatory to fill')
  }
}

  return (
    <form className='input-container' onSubmit={handleSubmit}> 

      {render==='locality' && (<div className='scope-container'>
      <h1>Let’s take your first step toward change</h1>
      <p>Select the scope of your petition:</p>
      <div className='choose'>
        <div className={`local choose-btn ${active==='local'?'active':''}`} role='button' onClick={handleLocal}>
        <h1>STATE</h1>
        </div>
        <div className={`national choose-btn ${active==='national'?'active':''}`} role='button' onClick={handleNational}>
        <h1>NATIONAL</h1>
        </div>
      </div>
      {local?(<select onChange={handleChanges} value={state} name='state'>
        <option>Select Your State</option>
        {stateOption.map((state,index)=>{
            return (    
                <option key={index} value={state || ''}>
                    {state}
                </option> 
            )
        })}
      </select>):[]}
      <div className='scope-continue-button'>
        <div className='locality-selection'>
        </div>
        {local!==null && <button onClick={handleContinue}>Continue</button>}   
      </div>
      </div>)
      }
      {/* locality */}

      {/* Tags */}

      {render==='tags' && (<div className='tag-container'>
      <h1>What's the topic that best fits your petition?</h1>
      <div className='tags-container'>
        {topics.map((topic,index)=>{
          return(
          <button className={`tag-btn ${tag===topic && 'tag-active'}`} key={index} value={topic} name='category' onClick={handleCategory}>{topic}</button>
          )
        })}
      </div>
      <div className='tag-continue'>
        <button className='tag-btn-1' onClick={handleBackTags}>Back</button>
        <button className='tag-btn-2' onClick={handleContinueTags}>Continue</button>
      </div>
    </div>)
}
     {/* Tags */}


     {/* Title */}
      {render==='title' && (
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
    )}
    {/* Title */}


      {render==='description' && (
      <div className='detail-container'>
      <h1>Tell your story</h1>
      <p>Explain the problem and why you care about it. Showing how it will impact you, your family or your community will make people more likely to support it.</p>
      <textarea name="description" id="" cols="30" rows="10" onChange={handleTextArea} value={description}></textarea>
      <div className='detail-continue'>
      <button className='detail-btn-1' onClick={handleBackDetail}>Back</button>
      <button className='detail-btn-2' onClick={handleContinueDetail}>Continue</button>
      </div>
    </div>)
    }
      {render==='image' && (
      <div className='addImage-container'>
        <h1>Add Image</h1>
        <p>Petitions with a good photo get six times more signatures</p>
        <div className='upload-image'>
          <input type="file" name='imageFile' id='imageFile' style={{display:'none'}} onChange={(e)=>{setFile(e.target.files[0])}} />
          <label htmlFor="imageFile" className='upload'>Upload Your Image</label>
        </div>
      <div className='image-continue'>
      <button className='image-btn-1' onClick={handleBackImage}>Back</button>
      <button className='image-btn-2' onClick={handleContinueImage}>Continue</button>
      </div>
      </div>
      )}
      {render==='post'&&(
        <div className='post-submit'>
          <div  className='post-container'>
          <h1>Ready To Post</h1>
          <img src={thumbsMan} alt="" />
          </div>
          <div className='submit-form'>
            <button type='submit' >POST</button>
          </div>
        </div>
      )}
    </form>
  )
}

export default Input