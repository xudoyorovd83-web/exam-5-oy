const { Schema, model } = require("mongoose");

const Auth = new Schema({
    username: {
        type: String,
        required: [true, "Username berilishi shart"],
        minlength: [3, "kamida 3 harfdan iborat bo'lishi kerak"],
        maxlength: [40, "ko'pi bilan 40 ta  harfdan iborat bo'lishi kerak"],
        set: (valeu) => valeu.trim()
       

    },
      firstName:{
        type:String,
        required:false,
        trim:true
    },
    lastName:{
        type:String,
        required:false,  
        trim:true 
    },
    phoneNumber:{
        type:Number,
        required:false,
    },

    imageUrl:{
        type:String,
        required:false,

    },

    email: {
        type: String,
        required: [true, "email berilishi shart "],
        min: [3, "kamida 3 ta so'zdan iborat bo'lsin"],
        max: [7, "ko'pi bilan 7 ta so'z bo'lsin"]
    },
    password: {
        type: String,
        required: [true, "password berilishi shart "],
        min: [3, "kamida 3 ta sondan iborat bo'lsin"],
        max: [7, "ko'pi bilan 7 ta son bo'lsin"]
    },
    role: {
        type: String,
        default:"user" [true, "role berilishi shart"],
        minlength: [10, "kamida 10 ta so'zdan iborat bo'lsin"],
        maxlength: [100, "ko'pi bilan 100 ta so'zdan iborat bo'lsin"],
        trim: true,
       

    },
    otp: {
        type: String,
        required: [true, "otp berilishi shart"],
        minlength: [10, "kamida 10 ta so'zdan iborat bo'lsin"],
        maxlength: [100, "ko'pi bilan 100 ta so'zdan iborat bo'lsin"],
        trim: true,
       
    },
    otpTime: {
        type: Number,
        required: [true, "otpTime berilishi shart"],
        minlength: [10, "kamida 10 ta so'zdan iborat bo'lsin"],
        maxlength: [100, "ko'pi bilan 100 ta so'zdan iborat bo'lsin"],
        trim: true,
    },
    refreshToken:{
        type:String
    }

    
}, {
    versionKey: false,
    timestamps: true
})
Auth.statics.findByFullName = function (valeu) {
    return this.find({ fullName: valeu })
}
const AuthSchema = model("auth", Auth)
module.exports = AuthSchema