import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import io from "socket.io-client";
import Message from "./messages/Message";
import Input from "./input/Input";
import "./Chat.css"
let socket;
const Chat = () => {

  const ENDPT = "http://localhost:5000";
  const { user} = useContext(UserContext);
  const [message, setmessage] = useState("");
  const [messages,setmessages]=useState([]);
//  console.log("user",user)
  let { room_id,room_name } = useParams();

 

  
  // useEffect(() => {
    // const verifyuser=async()=>{
    //   try{
    //     const res=await axios.get("http://localhost:5000/verifyuser",{withCredentials:true})
    //     console.log(res.data)
    //     setUser(res.data)
    //     console.log(user)
     
    //   }
    //   catch(err){
    //     console.log(err)
    //   }
    // }
  // }, [])
  useEffect(() => {
    socket = io(ENDPT, 
      { transports: ["websocket"] }
      );  
   if(user)
   socket.emit("join", { room_id, user_id: user._id,name:user.name });    
   else{
    //  window.history.go(-1);
    //  window.history.go(1)
   const id=sessionStorage.getItem("id");
   const name=sessionStorage.getItem("name");
   socket.emit("join", { room_id, user_id:id,name:name });    }

  },[]);  
 useEffect(() => {
     socket.on("message",message=>{
      //  console.log("message",message)
      //  console.log("messages",messages);
         setmessages([...messages,message])
     });
     socket.on("output-message",message=>{
      //  console.log("output message",message)
       setmessages(message)
      //  console.log("msgs",messages)
       
     })

 },[messages])

  const sendMessage = (event) => {
      event.preventDefault();
    // console.log(message);
    if (message) {
      socket.emit("sendmessage",message,room_id, () => {
        setmessage("");
      });
    }
  };


  return (
    <div>
      <div className="outerContainer">
        <div className="container" >

      <Message messages={messages} user={user} />
      <Input message={message} setmessage={setmessage} sendMessage={sendMessage} />
        </div>

      </div>
    </div>
  );
};

export default Chat;
