import React, { useState } from "react";
import Modals from "./Modals";
import {Link} from "react-router-dom"

const Room = ({ room, fromDate, toDate }) => {
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  

  return (
    <>
      <div className="room_container" >
        <div className="room_img">
          <img src={room.imageurls[0]} alt="rooms" className="small_img" />
        </div>

        <div className="room_content">
          <div className="room_details">
            <h1>{room.name}</h1>
            <p>Max Count : {room.maxcount}</p>
            <p>Phone Number : {room.phonenumber}</p>
            <p>Type : {room.type}</p>
          </div>
          <div className="room_btn">
          {fromDate && toDate && (
          <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
            <button className="bookButton">Book Now</button> 
          </Link>
          )}
            <button className="bookButton" onClick={openModal}>
              View Details
            </button>
            {/* <button className='btn'>Book</button> */}
          </div>
        </div>
      </div>
      {showModal && <Modals room={room} closeModal={closeModal} />}
    </>
  );
};

export default Room;
