import './App.scss';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import { useState } from 'react';
import Create from './pages/Create';
import Auth from './pages/Auth';
import Browse from './pages/Browse';
import {ToastContainer} from 'react-toastify'
import Notfound from './pages/Notfound';
import { signOut } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Detail from './pages/Detail';

function App() {
  const [user,setUser] = useState(null);
  const [active,setActive] = useState('home')
  const navigate = useNavigate();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(null)
      }
    })
  },[])
  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      setUser(null);
      setActive('auth');
      navigate('/auth');
    })
  }
  return (
    <div className='App'>
    <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout}/>
    <ToastContainer position='bottom-right'/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      {user!==null ? (<Route path='/start-petition' element={<Create user={user}/>}/>):(<Route path='/start-petition' element={<Auth/>}/>)}
      <Route path='/browse' element={<Browse/>}/>
      <Route path='/auth' element={<Auth setActive={setActive}/>}/>
      <Route path='*' element={<Notfound/>}/>
      {user ? (<Route path='/detail/:id' element={<Detail setActive={setActive} user={user}/>}/>):(<Route path='/detail/:id' element={<Auth setActive={setActive}/>}/>)}
    </Routes>
    </div>   
  );
}

export default App;
