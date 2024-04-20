import dotenv from "dotenv"
import connnectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
  path: './env'
})

connnectDB()
.then(()=>{
   app.on("error",(error) => {
    console.log("Error : ", error);
   
   })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT||8000}`)
    })
})
.catch((err)=>{
  console.log("MongoDB connection failed!!", err);
})








/*
import express from "express"

const app = express()

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    app.on("Error",(error) => {
      console.log("Error: ", error);
    })

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on the port ${process.env.PORT}`);
    })
  } catch (error) {
    console.log("ERROR: ",error);
    throw error;
  }
})() */

