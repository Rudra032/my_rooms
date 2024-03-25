import React, { useEffect, useState } from "react";
import "../components/Modals.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const BookingPage = () => {
  const { roomid, fromDate, toDate } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const fromDateMoment = moment(fromDate, "DD-MM-YYYY");
  const toDateMoment = moment(toDate, "DD-MM-YYYY");
  const totalDays = toDateMoment.diff(fromDateMoment, "days") + 1;
  const [totalAmount, setTotalAmount] = useState();
console.log(fromDateMoment)
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("currentUser")) {
        window.location.href = "/login";
      }

      const currentDate = moment().format("DD-MM-YYYY");
      const fromDateMoment = moment(fromDate, "DD-MM-YYYY");
      const formattedDate = fromDateMoment.format('DD-MM-YYYY');
      console.log(formattedDate)
      console.log(currentDate)
      if (formattedDate >= currentDate) {
        try {
          setLoading(true);
          const response = await axios.post(`/api/mern_rooms/getroombyid`, {
            roomid,
          });
          setTotalAmount(response.data.rentperday * totalDays);
          setRoom(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          console.error(error);
          setLoading(false);
        }
      } else {
        alert("Enter Correct Date");
        window.location.href = "/home";
      }
    };

    fetchData();
  }, [roomid, fromDate, toDate]); // Add roomid as a dependency to useEffect

  const onToken = async (token) => {
    // console.log(token);
    if (!room || !room._id) {
      console.error("Room data is not available.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser ? currentUser._id : null;

    const bookingDetails = {
      room,
      userid: userId,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      setLoading(true);
      const result = await axios.post(`/api/bookings/bookroom`, bookingDetails);
      setLoading(false);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success");
    } catch (error) {
      setLoading(false);
      Swal.fire("Opps", "Error:" + error, "error");
      console.error("Error occurred while booking:", error);
    }
  };
  return (
    <div className="bookingContainer">
      {loading ? (
        <Loading />
      ) : room ? (
        <div className="bookingBox">
          <div className="imgSection">
            <h3>{room.name}</h3>
            <img src={room.imageurls[0]} alt="roomImg" className="bigImg" />
          </div>

          <div className="detailSection">
            <h3>Booking Details</h3>
            <hr />
            <div className="nameDetail">
              <b>
                {/* {match.params.toDate} */}
                {/* {match.params.fromDate} */}
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date : {fromDate}</p>
                <p>To Date : {toDate}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>
            <div className="amountDetail">
              <h3>Amount</h3>
              <hr />
              <b>
                <p>Total Days : {totalDays}</p>
                <p>Rent Per Day : {room.rentperday}</p>
                <p>Total Amount : {totalAmount}</p>
              </b>
            </div>

            <div className="payButtondiv">
              <StripeCheckout
                currency="INR"
                amount={totalAmount * 100}
                token={onToken}
                stripeKey="pk_test_51OuJbcSEIkCEfZpFSspgaswwmMKqHhTgxynqfq7WF0BUELDpMF4GaOdRFVl3mdUwoehSMlU2CyF9CWpa0jPKg4vx00JCCaeTeH"
              >
                <button className="payButton">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingPage;
