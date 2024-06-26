// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
});

const app = express();  //// Initialize Express app

connectDB()
.then(()=>{
  app.listen(process.env.PORT ||8000,()=>{
  console.log(`Serveer is running at port: ${process.env.PORT}`);
})
})
  
.catch((err)=>{
  console.log("mongo db connection faild !!!",err);
})




/*
import express from "express"
const app=express()

;( async ()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error",()=>{
        console.log("ERROR",error);
        throw error
      })

      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
      })
    } catch (error) {
        console.log("ERROR",error)
    }
}) ()

*/