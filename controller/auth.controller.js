
const AuthSchema = require("../schema/auth.schema")
const bcrypt = require("bcryptjs")
const sendMassage = require("../utils/send-eamils")
const { access_token, refresh_token } = require("../utils/jwt")
const CustomErrorhandler = require("../error/custom-error-handler")

const register = async (req, res, next) => {
    try {
        const { username, email, password,firstName,lastName,phoneNumber,imageUrl } = req.body

        const foundedUser = await AuthSchema.findOne({ email })
        if (foundedUser) {
            throw CustomErrorhandler.BadRequest("user already exist")
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const code = Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")
        await sendMassage(code, email)

        await AuthSchema.create({
            lastName,
            firstName,
            phoneNumber,
            imageUrl,
            username,
            email,
            password: hashPassword,
            otp: code,
            otpTime: Date.now() + 120000
        })



        res.status(200).json({ message: "registred" })

    } catch (error) {
        next(error)
    }
}
const verify = async (req, res, next) => {
    try {
        const { email, code } = req.body

        const foundedUser = await AuthSchema.findOne({ email })
        if (!foundedUser) {
            throw CustomErrorhandler.BadRequest("not found")
        }
        if (!foundedUser.otp) {
            throw CustomErrorhandler.UnAuthorizet("otp not found")
        }
        if (foundedUser.otp !== code) {
            throw CustomErrorhandler.UnAuthorizet("wrong otp")
        }
        if (foundedUser.otpTime < Date.now()) {
            throw CustomErrorhandler.UnAuthorizet("otp expiret")
        }

        await AuthSchema.findByIdAndUpdate(foundedUser._id, { otp: "", otpTime: 0 })

        const accessToken = access_token({ id: foundedUser._id, role: foundedUser.role, email: foundedUser.email })
        const refreshToken = refresh_token({ id: foundedUser._id, role: foundedUser.role, email: foundedUser.email })
        await AuthSchema.findByIdAndUpdate(foundedUser._id, { refreshToken })

        res.coockie("refresh_token",
            refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 15,

        })

        res.status(200).json({
            message: "succes",
            accessToken
        })

    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const foundedUser = await AuthSchema.findOne({ email })
        if (foundedUser) {
            throw CustomErrorhandler.BadRequest("user not found")
        }
        const check = await bcrypt.compare(password, foundedUser.password)
        if (check) {
            const code = Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")
            await sendMassage(code, email)

            await AuthSchema.findByIdAndUpdate(foundedUser._id, {
                otp: code,
                otpTime: Date.now() + 120000
            })
            res.status(200).json({ message: "please check your email" })
        } else {
            throw CustomErrorhandler.UnAuthorizet("Wrong otp")
        }

    } catch (error) {
        next(error)

    }
}
const logout = async (req, res, next) => {
    try {

        const foundedUser = await AuthSchema.findOne({ email: req["user"], email })
        if (!foundedUser) {
            throw CustomErrorhandler.BadRequest("user not found")
        }
        res.clearCookie("refresh_token")
        await AuthSchema.findByIdAndUpdate(foundedUser._id, {
            refreshToken: ""
        })
        res.status(200).json({ message: "logget out" })
    } catch (error) {
        next(error)

    }
}
const forgotPasswort = async (req, res, next) => {
    try {

        const { email } = req.body

        const foundedUser = await AuthSchema.findOne({ email })

        if (!foundedUser) {
            throw CustomErrorhandler.BadRequest("user not found")
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        await sendMassage(code, email)

        await AuthSchema.findByIdAndUpdate(foundedUser._id, {
            otp: code,
            otpTime: Date.now() + 5 * 60 * 1000
        })
        res.status(200).json({
            message: "please check your email"
        })


    } catch (error) {
        next(error)

    }
}
const changePassword = async (req, res, next) => {
    try {

        const { oldPassword, newPassword } = req.body

        const foundedUser = await AuthSchema.findById(req.user.id)

        if (!foundedUser) {
            throw CustomErrorhandler.BadRequest("user not found")
        }

        const checkPassword = await bcrypt.compare(oldPassword, foundedUser.password)

        if (!checkPassword) {
            throw CustomErrorhandler.UnAuthorizet("old password incorrect")
        }

        const hashPassword = await bcrypt.hash(newPassword, 12)

        await AuthSchema.findByIdAndUpdate(foundedUser._id, {
            password: hashPassword
        })

        res.status(200).json({
            message: "password changed successfully"
        })

    } catch (error) {
        next(error)
    }
}



module.exports = {
    register,
    verify,
    login,
    logout,
    forgotPasswort,
    changePassword
}