const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
    name:{
        type:String,
        required:[true,"category nomi kiritish shart"],
        minlength:[3,"kamida 3 hrf bo'lsin"],
        maxlength:[30,"ko'pi bilan 30 harf bo'lsin"],
        unique:true,
        trim:true
    },
    imageUrl:{
        type:String,
        required:[true,"imgUrl kiritilishi shart"]
    },
},{
    timestamps:true
})

module.exports = model("Category",categorySchema)