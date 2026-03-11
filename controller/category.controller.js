const CustomErrorhandler = require("../error/custom-error-handler")
const categorySchema = require("../schema/category.schema")


const getAllCategories = async(req,res,next)=>{
    try {

        const categories = await categorySchema.find()

        res.status(200).json(categories)

    } catch (error) {
        next(error)
    }
}
const getOneCategory = async (req,res,next)=>{
    try {

        const {id} = req.params

        const category = await categorySchema.findById(id)

        if(!category){
            throw CustomErrorhandler.BadRequest("category not found")
        }

        res.status(200).json(category)

    } catch (error) {
        next(error)
    }
}


const addCategory = async (req, res, next) => {
    try {
        const {name,imageUrl } = req.body
        await categorySchema.create({ name, imageUrl })

        res.status(201).json({
            massage: "added new category"
        })
    } catch (error) {
        next(error)
    }
}



const updateCategory = async(req,res,next)=>{
    try {

        const {id} = req.params
        const {name} = req.body

        const category = await categorySchema.findByIdAndUpdate(
            id,
            {name},
            {new:true}
        )

        res.status(200).json(category)

    } catch (error) {
        next(error)
    }
}

const deleteCategory = async(req,res,next)=>{
    try {

        const {id} = req.params

        await categorySchema.findByIdAndDelete(id)

        res.status(200).json({message:"deleted"})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCategories,
    getOneCategory,
    addCategory,
    updateCategory,
    deleteCategory
}