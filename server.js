import express from "express";
import { db } from "./db.js";
import roomsRoute from "./routes/roomsRouter.js";
import userRouter from "./routes/userRouter.js";
import bookingsRouter from "./routes/bookingsRouter.js";
import { fileURLToPath } from "url";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "./my_rooms/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./my_rooms/build/index.html"));
});

app.use("/api/mern_rooms", roomsRoute);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingsRouter);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
