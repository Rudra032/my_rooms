import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import './ProfilePage.css'

import Loading from "../components/Loading";
import Error from "../components/Error";

function MyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function fetchMyAPI() {
    // setError("");
    setLoading(true);
    try {
      const rooms = (
        await axios.post(`${window.location.origin}/api/bookings/getbookingbyuserid`, {
          userid: user._id,
        })
      ).data;
      console.log(rooms);
      setBookings(rooms);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  const cancelBooking =async(bookingid, roomid)=> {
    setError("");
    setLoading(true);
    try {
      await axios.post(`${window.location.origin}/api/bookings/cancelbooking`, {
        bookingid,
        roomid,
      });
      Swal.fire(
        "Congratulations",
        "Your Room Cancelled Successfully",
        "success"
      ).then((result) => {
        fetchMyAPI();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Opps", "Error:" + error.message, "error");
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="row">
          <div className="col-md-7  ml-5">
            {bookings &&
              bookings.map((booking) => {
                return (
                  <div className="bs">
                    <h1>{booking.room}</h1>
                    <p>
                      <b>BookingId:</b> {booking._id}
                    </p>
                    <p>
                      <b>CheckIn:</b> {booking.fromDate}
                    </p>
                    <p>
                      <b>CheckOut:</b> {booking.toDate}
                    </p>
                    <p>
                      <b>Amount:</b> {booking.totalAmount}
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      {booking.status === "booked" ? (
                        <Tag color="green">CONFIRMED</Tag>
                      ) : (
                        <Tag color="red">CANCELLED</Tag>
                      )}
                    </p>
                    {booking.status === "booked" && (
                      <div className="text-right">
                        <button
                          className="btn btn-danger cancelButton"
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomid);
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookingPage;
