import express from "express";
import { db } from "./db.js";
import roomsRoute from "./routes/roomsRouter.js";
import userRouter from "./routes/userRouter.js";
import bookingsRouter from './routes/bookingsRouter.js';
import path from "path";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.get('/', (req,res)=>{
  app.use(express.static(path.resolve(__dirname, "my_rooms", "build")));
  res.sendFile(path.resolve(__dirname, "my_rooms", "build", "index.html"));
})
app.use("/api/mern_rooms", roomsRoute);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingsRouter);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
