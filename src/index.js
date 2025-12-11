// require("dotenv").config({path: './env'})
import dotenv from "dotenv";
dotenv.config({path: "./.env"});

import connectDB from "./db/index.js";
import { app } from "./app.js";



connectDB()
// DB async method me likha gya h isliye promise return krega usse tackle karne ke liye then-catch me app ko wrap kro
.then(()=>{
    app.on("error", (error)=>{
        console.log(`App connection error: ${error}`)
        throw error
    })
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(`MONGODB connection failed: `, err);
})



/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express"
const app = express()
( async() =>{       // always use async-await & try-catch to avoid error while connecting database
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("ERROR", error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on PORT ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR", error)
        throw err
    }
})() //use Immediate invoke function...taki database loading ke sth connect ho jaye
*/