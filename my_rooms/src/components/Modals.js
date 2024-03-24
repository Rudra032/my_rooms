import React from "react";
import "./Modals.css";
import { Carousel } from "react-bootstrap";
import BookingPage from "../pages/BookingPage";

const Modals = ({ room, closeModal }) => {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <div className="roomName">
          <h4>{room.name}</h4>
        </div>
        <div className="roomImages">
          <Carousel>
            {room.imageurls.map((url, index) => {
              return (
                <Carousel.Item key={index}>
                  <img className="big_imgModal" src={url} alt="modal_img" />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="roomDescription">
          <p>{room.description}</p>
        </div>
        <div>
          <button className="bookButton" onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
