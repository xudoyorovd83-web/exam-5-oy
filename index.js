const express=require("express")
const cors=require("cors")
const connectDb = require("./config/db.config")
require("dotenv").config()
const cookieParser=require("cookie-parser")



const PORT=process.env.PORT || 3000
const app=express()
connectDb()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.listen(PORT,()=>{
    console.log("server is running at :"+PORT);
    
})