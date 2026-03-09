 const jwt=require("jsonwebtoken")

 const access_token=(payload)=>{
    return jwt.sign(payload,procces.env.SECRET_KEY,{expresIn:"15"})
 }
 const refresh_token=(payload)=>{
    return jwt.sign(payload,procces.env.REFRESH_SECRET_KEY,{expresIn:"60d"})
 }
 module.exports={
    access_token,
    refresh_token
 }