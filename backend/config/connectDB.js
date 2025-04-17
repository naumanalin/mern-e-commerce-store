import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"mern-ecommerce-store",
            serverSelectionTimeoutMS: 5000
            // useNewUrlParser: true, // deprecated options
            // useUnifiedTopology: true,
        })
        console.log(`🚀 MongoDB is connected at host: ${connect.connection.host}`)
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); 
    }
}