import React from "react";
import Room from "./Room";
import { Link } from "react-router-dom";
const Roomlist = ({ rooms,user }) => {
  return (
    <div>
      {rooms &&
        rooms.map(
          (room) => (     
            <a href={"/chat/"+room._id+"/"+room.name} key={room._id} >
              <Room name={room.name} />
            </a>  
          )
        )}
    </div>
  );
};

export default Roomlist;
