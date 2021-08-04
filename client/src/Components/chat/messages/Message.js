import React from "react";
import { useParams } from "react-router-dom";
import SingleMessage from "../message/SingleMessage";
import STB from "react-scroll-to-bottom";
import "./Messages.css"
const Message = ({ messages, user }) => {
  const id=sessionStorage.getItem("id");

let { room_id } = useParams();
  return (
    <STB className="messages" >
      {messages.map((message) => (
          
          message.room_id === room_id ?
          <SingleMessage  key={message._id} message={message} name={message.name} text={message.text} currentUserId={user ? user._id : sessionStorage.getItem("id")}/>:
       
        null
      ))}
    </STB>
  );
};

export default Message;
