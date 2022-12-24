// import socketIO from "socket.io-client"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Join from "./components/Join"
import Chat from './components/Chat';




function App() {


  return (

    <div className="App">
      
      <BrowserRouter>
        
        <Routes>
          <Route exact path='/' element={<Join />}/>
          <Route exact path='/chat' element={<Chat/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>

  );
}

export default App;

