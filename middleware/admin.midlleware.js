const CustomErrorhandler = require("../error/custom-error-handler")

const adminMiddleware = (req,res,next)=>{

    if(req.user.role !== "admin"){
        throw CustomErrorhandler.Forbidden("Only admin allowed")
    }

    next()
}

module.exports = adminMiddleware