import React from "react";
import { useParams } from "react-router-dom";
const Room = ({ name }) => {
  
  return (
    <div className="col s12 m4">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <p>{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
