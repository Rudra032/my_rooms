import dotenv from 'dotenv';
import express from "express";
import { db } from "./db.js";
import roomsRoute from "./routes/roomsRouter.js";
import userRouter from "./routes/userRouter.js";
import bookingsRouter from "./routes/bookingsRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
console.log(__dirname);

dotenv.config({ path: 'dotenv' })
app.use(express.json());
const port = process.env.PORT || 5000;
// console.log(process.env.PORT);


app.use("/api/mern_rooms", roomsRoute);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingsRouter);

app.use(express.static(path.join(__dirname, "my_rooms/build")))
app.use("*", (req, res)=>res.sendFile(path.join(__dirname, "my_rooms/build/index.html")))
app.listen(port, () => {
  console.log("Listening on port " + port);
});
