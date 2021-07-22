import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import Roomlist from "./Roomlist";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
let socket;
const Home = () => {
  let ENDPT = "http://localhost:5000/"; 
  const { user, setUser } = useContext(UserContext);
  const [room, setroom] = useState("");
  const [rooms,setrooms]=useState([]);
  useEffect(() => {
    socket = io(ENDPT,{transports:['websocket']});
    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [ENDPT]);
  
  
  useEffect(() => {
    socket.on("output-rooms",rooms=>{
      console.log("rooms",rooms)
      setrooms(rooms)
      console.log(rooms)
    })
    
  }, [rooms])
  useEffect(() => {
    socket.on("room-created",saved=>{
      console.log("data from db",saved)
    })
   
    console.log(user)
    // localStorage.setItem("name",user.name);
    // localStorage.setItem("id",user._id);
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!room){
      alert("Enter room name")
      return true;
    }
    
  socket.emit("create-room", room);
    console.log(room);
    setroom("");
  };
  if(!user){
    return <Redirect to="/login" />
}
  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <form onSubmit={handleSubmit}>
              <div className="card-content white-text">
                <span className="card-title">
                  Welcome {user ? user.name : ""}
                </span>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={room}
                    placeholder="Enter Room Name"
                    id="room"
                    type="text"
                    className="validate"
                    onChange={(e) => setroom(e.target.value)}
                  />
                  <label className="active" htmlFor="room">
                    Room Name
                  </label>
                </div>
              </div>
              <button className="waves-effect waves-light btn">Create Room</button>
            </form>
              
          </div>
        </div>
        <Roomlist rooms={rooms} user={user}/>
      </div>
    </div>
  );
};

export default Home;
