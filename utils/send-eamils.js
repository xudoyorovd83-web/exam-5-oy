const nodemailer = require("nodemailer")
const CustomErrorhandler = require("../error/custom-error-handler")


async function sendMassage(code, email) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
        auth: {
            user:"xudoyorovd83@gmail.com",
            pass:procces.env.GOOGLE_PASS

            }
        })
        await transporter.sendMail({
            subject:"exam",
            from:"xudoyorovd83@gmail.com",
            to:email,
            html: `
<h2>Welcome to Car Market </h2>

<p>Your verification code:</p>

<h1>${code}</h1>

<p>This code expires in 2 minutes.</p>
`
        })

    } catch (error) {
        throw CustomErrorhandler.InternalServerError(error.message)

    }
}

module.exports = sendMassage