import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use --> to handle middlewares configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

app.use(express.json({limit: "16kb"}))   //kitna json aa skta h uska limit lgane k liye
app.use(express.urlencoded({extended: true, limit: "16kb"}))    //url ayega usko encode krne k liye
app.use(express.static("public"))   //files folder ayegenge usko handle krne k liye
app.use(cookieParser())     // server ke cookies read krn k liye


// routes import 
import userRouter  from './routes/user.routes.js'


// routes declaration 
app.use("/api/v1/users", userRouter)

export {app}