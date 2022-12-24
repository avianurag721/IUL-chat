import React, { useState } from 'react';
import './Join.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
let user;
const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
}

const Join = () => {
  const [name, setname] = useState("")
  // console.log(name);
  

 
  return (
    <div className='joinPage'>

      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>IUL-Chat</h1>
        <div className='input'>
          <input  onChange={(e)=>setname(e.target.value)} id='joinInput' type="text" placeholder='       Enter your Name to Join' />
          <Link  onClick={(e)=>!name?e.preventDefault():null} to='/chat'> <button type="button" onClick={sendUser} className="joinbtn btn-dark">Go</button></Link>

        </div>
      </div>


    </div>
  )
}

export default Join
export { user };
