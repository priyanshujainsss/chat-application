import React from 'react'
import "./Message.css"
const SingleMessage = ({message,name,text,currentUserId}) => {
    let isCurrentUser=false;
    console.log("mesage",message.name,message.user_id,currentUserId)
     if(message.user_id && currentUserId === message.user_id){
         isCurrentUser=true;
     }
    //  if(currentUserId === localStorage.getItem("chatuserid")){
    //     isCurrentUser=true;
    //  }
    // console.log(message)
    return (
        isCurrentUser ? (<div className="row right-align">
        <div className="col s12 m8 16 right">
            <p className="sentbyme"> {name}: {text}</p>
        </div>
    </div>) : (<div className="row left-align">
        <div className="col s12 m8 16 left">
            <p className="opponent"> {name}: {text}</p>
        </div>

    </div>)
    )
}

export default SingleMessage
