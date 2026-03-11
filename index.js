const express=require("express")
const cors=require("cors")
const connectDb = require("./config/db.config")
require("dotenv").config()
const cookieParser=require("cookie-parser")
const carRouter = require("./router/car.routes")
const authRouter = require("./router/auth.routes")
const errorMidlleware = require("./middleware/error.midlleware")
const categoryRouter = require("./router/category.routes")



const PORT=process.env.PORT || 3000
const app=express()
connectDb()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
//router
app.use(carRouter)
app.use(authRouter)
app.use(errorMidlleware)
app.use(categoryRouter)


app.listen(PORT,()=>{
    console.log("server is running at :"+PORT);
    
})