import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        const connected = await mongoose.connect(process.env.MONGO_URI);
        if(connected){
            console.log("connected successfully")
        }
    }
    catch(error){
        console.log("error occurred");
    }
}
export default connectDB;
// mongo db me koi issu enhu hai