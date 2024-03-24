import express from "express";
import bookingModel from "../zmodels/booking.js";
import roomModel from "../zmodels/room.js";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51OuJbcSEIkCEfZpFt5NviKIAqjLjm35CFRntURuXqZL28PwohHA7uH1F6GUGdm5qQuV4TargG8YpMWhR9xCrzAzx001kShIB4B"
);

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (paymentIntent) {
      try {
        const newBooking = new bookingModel({
          room: room.name,
          roomid: room._id,
          userid,
          fromDate,
          toDate,
          totalAmount,
          totalDays,
          transactionId: uuidv4(), // Store payment intent ID as transaction ID
        });

        const booking = await newBooking.save();

        const roomtemp = await roomModel.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromDate: fromDate,
          toDate: toDate,
          userid: userid,
          status: booking.status,
        });

        await roomtemp.save();
        res.send("Room Booked Successfully");
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }

    res.send("Payment Successful, Your room is booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await bookingModel.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await bookingModel.findOne({ _id: bookingid });
    booking.status = "cancelled";
    await booking.save();
    const room = await roomModel.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.currentbookings = temp;

    await room.save();

    res.send("Your Booking Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
export default router;
