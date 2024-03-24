import mongoose from "mongoose";
const mongoUrl = "mongodb+srv://Rudra_123:Rathore_123@cluster0.n2ta6ci.mongodb.net/mern_rooms";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
    console.log("MongoDB connection Failed")
});
db.once("open", () => {
    console.log(
        "MongoDB connected successfully"
    )
});
export { db };