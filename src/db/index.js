import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n MonnoDB connected... DB Host: ${connectionInstance.connect.host}`);
    } catch (error) {
        console.log("MongoDB connection eroor");
        process.exit(1)
    }
}

export default connectDB