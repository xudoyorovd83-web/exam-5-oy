const { Schema, model } = require("mongoose")

const car = new Schema(
{
    model:{
        type:String,
        required:[true,"Mashina modeli berilishi shart"],
        minlength:[1,"juda qisqa"],
        maxlength:[40,"juda uzun"],
        trim:true
    },

    tanirovka:{
        type:String,
        required:[true,"tanirovka turi berilishi shart"],
        trim:true
    },

    motor:{
        type:String,
        required:[true,"motor turi berilishi shart"],
        trim:true
    },

    year:{
        type:Number,
        required:[true,"Ishlab chiqarilgan yil berilishi shart"],
        min:[1900,"yili eski"],
        max:[2100,"bunday sana qabul qilinmaydi"]
    },

    color:{
        type:String,
        required:[true,"Mashina rangi berilishi shart"],
        trim:true
    },

    price:{
        type:Number,
        required:[true,"Narx berilishi shart"],
        min:[0,"Narx manfiy bo'lishi mumkin emas"]
    },

    distance:{
        type:Number,
        default:0,
         min:[0,"Masofa manfiy bo'lishi mumkin emas"]
    },

    gearBox:{
        type:String,
        required:[true,"Gearbox turi kiritilishi shart"],
        enum:["manual","automatic"]
    },

    description:{
        type:String,
        required:[true,"tavsif kiritilishi shart"],
        minlength:[10,"tavsif juda qisqa"],
        maxlength:[200,"tavsif juda uzun"]
    },

    imageUrl:{
        type:String,
        required:[true,"Mashina rasmi berilishi shart"],
          match:[/^https?:\/\/.+/,"Rasm URL noto'g'ri"]
    },

    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }

},
{
    versionKey:false,
    timestamps:true
})

car.statics.findByModel = function(value){
    return this.find({model:value})
}

module.exports = model("car",car)