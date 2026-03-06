const { Schema, model } = require("mongoose");

const Car = new Schema(
{
model: {
    type: String,
    required: [true, "Mashina modeli berilishi shart"],
    minlength: [1, " juda qisqa"],
    maxlength: [40, " juda uzun"],
    trim: true
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

year: {
    type: Number,
    required: [true, "Ishlab chiqarilgan yil berilishi shart"],
    min: [1900, " yili eski"],
    max: [2100, " bunday sana qabul qilinmaydi"]
},

color: {
    type: String,
    required: [true, "Mashina rangi berilishi shart"],
    trim: true
},

price: {
    type: Number,
    required: [true, "Narx berilishi shart"],
    min: [0, "Narx manfiy bo'lishi mumkin emas"]
},

Distance: {
    type: Number,
    default: 0
},


GearBook: {
    type: String,
    enum: ["manual", "automatic"],
    required: true
},

Desecription:{
    type:String,
    required:[true,"tavsif kiritilishi shart"],
    minlength:[5,"tavsif kamida 5ta so'z bo'lsin"],
    maxlength:[100,"tavsif ko'pi bilan 100 ta so'z bo'lsin"]
},

imageUrl: {
    type: String,
    required: [true, "Mashina rasmi berilishi shart"]
}

},
{
versionKey: false,
timestamps: true
}
);

Car.statics.findByBrand = function (value) {
return this.find({ brand: value });
};

const CarSchema = model("car", Car);

module.exports = CarSchema;

