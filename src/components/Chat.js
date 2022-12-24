import React, { useEffect, useState } from 'react'
import { user } from './Join'
import socketIo from 'socket.io-client'
import "./chat.css"
import sendimg from './send.png'
import Message from './Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import { Link } from 'react-router-dom'

let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setid] = useState('');
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = '';


  }


  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket']});

    socket.on('connect', () => {
      setid(socket.id);

    })
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.mess age);
    })

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message)
    })

    return () => {
      socket.emit('disconnected');
      socket.off();
    }
  }, [])
  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    })
    return () => {
      socket.off();
    }
  }, [messages])

  return (
    <div className='chatPage'>
        
        <Link to='/' style={{ textDecoration: "none" }}>
          <h2 id='back'>Back To Login</h2>
        </Link>

      <div className="chatContainer">
        <div className="header"><h1>IUL-Chat</h1>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}

        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id='chatInput' placeholder='Type Your Message' />
          <button onClick={send} className="sendBtn"><img src={sendimg} alt="" /></button>
        </div>

      </div>
    </div>
  )
}

export default Chat
