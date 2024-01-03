import { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client"
import "./Chat.css";

let socket;

const Chat = () => {
  const [name,setName] = useState("");
  const [room,setRoom] = useState("");
  const ENDPOINT = "http://localhost:5000"; 
  const location = useLocation();
  useEffect(()=>{
    const {name, room} = queryString.parse(location.search);
   
    socket = io(ENDPOINT);
   
    setName(name);
    setRoom(room);

    socket.emit('join', {name,room});

    return ()=>{
      socket.emit('disconnect');
      socket.off();
    }

 },[ENDPOINT, location.search])
  return (
    <div>Chat</div>
  )
}

export default Chat