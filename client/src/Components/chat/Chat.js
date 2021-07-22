import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import io from "socket.io-client";
import Message from "./messages/Message";
import Input from "./input/Input";
import "./Chat.css"
import { useCookies } from 'react-cookie';
let socket;
const Chat = () => {

  let ENDPT = "http://localhost:5000/";
  const [message, setmessage] = useState("");
  const [messages,setmessages]=useState([]);
  const { user, setUser } = useContext(UserContext);
//  console.log("user",user)
  let { room_id,user_id,user_name } = useParams();
  const [cookies, setCookie] = useCookies(['user']);
 

  
  // useEffect(() => {
  //   const verifyuser=async()=>{
  //     try{
  //       res=await axios.get("http://localhost:5000/verifyuser",{withCredentials:true})
  //       console.log(res.data)
  //       const data=res.data;
  //       setUser({data})
     
  //     }
  //     catch(err){
  //       console.log(err)
  //     }
  //   }
  //   verifyuser();
  // }, [])
  useEffect(() => {
    

    setUser(user)
    socket = io(ENDPT, { transports: ["websocket"] });
    if(!user){
      // const name=localStorage.getItem("chatusername");
      // const id=localStorage.getItem("chatuserid");
      const name=cookies.userName;
      const id=cookies.userId;
      console.log("id and name",id,name);
    socket.emit("join", {  room_id, user_id: id,name:name });

    }else
  {  console.log(user)
    socket.emit("join", {  room_id, user_id: user._id,name:user.name });
    console.log(user)}
    
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
