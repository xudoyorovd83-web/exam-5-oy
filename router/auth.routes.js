const {Router}=require("express")
const { register, verify, login, logout, forgotPasswort, changePassword } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")


const authRouter=Router()

authRouter.post("/register",register)
authRouter.post("/verify",verify)
authRouter.post("/login",login)
authRouter.get("/logout",authorization,logout)
authRouter.put("/reset_passwort",authorization,)
authRouter.put("/forgot_passwort",forgotPasswort)
authRouter.put("/change_password",changePassword)

module.exports=authRouter