const { Schema, model } = require("mongoose");

const Auth = new Schema({
    username: {
        type: String,
        required: [true, "Username berilishi shart"],
        minlength: [3, "kamida 3 harfdan iborat bo'lishi kerak"],
        maxlength: [40, "ko'pi bilan 40 ta  harfdan iborat bo'lishi kerak"],
        trim:true,
       

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
        type:String,
    required:[true,"email berilishi shart"],
    trim:true,
    unique:true,
    lowercase:true,
    match:[/^\S+@\S+\.\S+$/,"email noto'g'ri"]
        
    },
    password: {
        type: String,
        required: [true, "password berilishi shart "],
        minlength: [3, "kamida 3 ta sondan iborat bo'lsin"],
        maxlength: [7, "ko'pi bilan 7 ta son bo'lsin"],
        
    },
    role: {
        type: String,
        default:"user",
        enum:['user','admin']
       

    },
    otp: {
        type: String,
       
    },
    otpTime: {
        type: Number,
       
    },
    refreshToken:{
        type:String
    }

    
}, {
    versionKey: false,
    timestamps: true
})

const AuthSchema = model("auth", Auth)
module.exports = AuthSchema