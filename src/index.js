import dotenv from "dotenv"
import connnectDB from "./db/index.js";

dotenv.config({
  path: './env'
})

connnectDB()









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

