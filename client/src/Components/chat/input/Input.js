import React from 'react'
import "./Input.css"
const Input = ({message,setmessage,sendMessage}) => {
    return (
        <div>
       <form onSubmit={sendMessage}>
        <input
          placeholder="Type a message"
          className="input"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage : null)}
        />
        <button className="sendButton " >Send message</button>
      </form>
        </div>
    )
}

export default Input
