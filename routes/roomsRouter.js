import express from "express";
import room from "../zmodels/room.js";
import roomModel from "../zmodels/room.js";

const router = express.Router();

// Route to get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    // Retrieve all rooms from the database
    const rooms = await room.find({});
    // Send a JSON response with the retrieved rooms
    return res.json(rooms);
  } catch (error) {
    // Handle errors and send an error response with status code 400
    return res.status(400).json({ message: error.message });
  }
});

// room route
// room route
router.post("/getroombyid", async (req, res) => {
  const roomId = req.body.roomid; // Renamed variable to roomId for clarity

  try {
    // Use the room model to find a room by its ID
    const foundRoom = await room.findOne({ _id: roomId }); // Renamed variable to foundRoom

    // Check if the room is found
    if (!foundRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Send the found room as a JSON response
    return res.json(foundRoom);
  } catch (error) {
    // Handle errors and send an error response with status code 400
    return res.status(400).json({ message: error.message });
  }
});



router.post("/getallrooms", async (req, res) => {
  try {
    const rooms = await roomModel.find();
    res.json(rooms);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.post("/addroom", async (req, res) => {
  try {
    const newRoom = req.body;
    console.log(req.body);
    const room = new roomModel();
    room.name = newRoom.name;
    room.maxcount = newRoom.maxcount;
    room.phonenumber = newRoom.phonenumber;
    room.rentperday = newRoom.rentperday;
    room.type = newRoom.type;
    room.description = newRoom.description;
    room.currentbookings = [];
    if (newRoom.imageurl1 && newRoom.imageurl1.length > 0) {
      room.imageurls.push(newRoom.imageurl1);
    }
    if (newRoom.imageurl2 && newRoom.imageurl2.length > 0) {
      room.imageurls.push(newRoom.imageurl2);
    }
    if (newRoom.imageurl3 && newRoom.imageurl3.length > 0) {
      room.imageurls.push(newRoom.imageurl3);
    }

    const result = await room.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});



export default router;
