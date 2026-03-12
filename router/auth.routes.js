const {Router}=require("express")
const { register, verify, login, logout, forgotPasswort, changePassword } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")


const authRouter=Router()

authRouter.post("/register",register)
authRouter.post("/verify",verify)
authRouter.post("/login",login)
authRouter.post("/logout",authorization,logout)
authRouter.post("/forgot_password",forgotPasswort)
authRouter.put("/change_password",authorization,changePassword)

module.exports=authRouter