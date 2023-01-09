import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Header = ({active,setActive,user,handleLogout}) => {
  const userId = user?.uid
  return (
    <nav className='container'>
      <div className='logo'>
      <Link style={{textDecoration:'none'}} to='/'>
        <h1 onClick={()=>{setActive('home')}}>BharatBadlo.<span className='org'>Org</span></h1>
      </Link>
      </div>
      <div className='links'>
        <ul>
          <Link style={{textDecoration:'none'}} to='/'>
          <li className={`${active==='home'?'active':''}`} onClick={()=>{setActive('home')}}>Home</li>
          </Link>
          <Link style={{textDecoration:'none'}} to='/start-petition'>
          <li className={`${active==='create' ? 'active':''}`} onClick={()=>{setActive('create')}}>Start a petition</li>
          </Link>
          <Link style={{textDecoration:'none'}} to='/browse'>
          <li className={`${active==='about' ? 'active':''}`} onClick={()=>{setActive('about')}}>Browse</li>
          </Link>       
        </ul>
      </div>
      <div className='link-container'>
        <ul>
          <li>{user==null ? (
            <Link style={{textDecoration:'none'}} to='/auth'>
            <button className={`login-btn ${active==='auth' ? 'active-btn':''}` } onClick={()=>{setActive('auth')}}>Login</button>
            </Link>
          ):(
            <div className='profile-navbar'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" alt="profile-img" style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'10px'}} />
              <p style={{fontWeight:'650',color:'white'}}>{user?.displayName}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header