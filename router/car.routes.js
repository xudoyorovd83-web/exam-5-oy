const {Router}=require("express")
const { getAllCars, getOneCar, addCar, updateCar, deleteCar } = require("../controller/car.controller")


const carRouter=Router()
 carRouter.get("/get_all_cars",getAllCars)
 carRouter.get("/get_one_car/:id",getOneCar)
 carRouter.post("/add_car",addCar)
 carRouter.put("/update_car/:id",updateCar)
 carRouter.put("/delete_car/:id",deleteCar)

 module.exports=carRouter

