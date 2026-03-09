const CustomErrorhandler = require("../error/custom-error-handler");
const CarSchema = require("../schema/car.schema");



const getAllCars = async (req, res, next) => {
try {

    const cars = await CarSchema.find();

    res.status(200).json({
        count: cars.length,
        data: cars
    });

} catch (error) {
    next(error);
}


};


const getOneCar = async (req, res, next) => {
try {


    const car = await CarSchema.findById(req.params.id);

    if (!car) {
        throw CustomErrorhandler.BadRequest("Car not found");
    }

    res.status(200).json({
        data: car
    });

} catch (error) {
    next(error);
}


};
const addCar = async (req, res, next) => {
    try {
        const {model,tanirovka,motor,year,color,price,dictance,GearBook,Desecription,imageUrl } = req.body
        await AuthorSchema.create({ model,tanirovka,motor,year,color,price,dictance,GearBook,Desecription,imageUrl  })

        res.status(201).json({
            massage: "added nev car"
        })
    } catch (error) {
        next(error)
    }
}

const updateCar = async (req, res, next) => {
try {


    const car = await CarSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!car) {
        throw CustomErrorhandler.BadRequest("Car not found");
    }

    res.status(200).json({
        message: "Car updated",
        data: car
    });

} catch (error) {
    next(error);
}


};

const deleteCar = async (req, res, next) => {
try {


    const car = await CarSchema.findByIdAndDelete(req.params.id);

    if (!car) {
        throw CustomErrorhandler.BadRequest("Car not found");
    }

    res.status(200).json({
        message: "Car deleted"
    });

} catch (error) {
    next(error);
}


};

module.exports = {
getAllCars,
getOneCar,
addCar,
updateCar,
deleteCar
};
