const CustomErrorhandler = require("../error/custom-error-handler")
const categorySchema = require("../schema/category.schema")

const getAllCategories = async (req, res, next) => {
    try {

        const categories = await categorySchema.find()

        res.status(200).json(categories)

    } catch (error) {
        next(error)
    }
}

const getOneCategory = async (req, res, next) => {
    try {

        const { id } = req.params

        const category = await categorySchema.findById(id)

        if (!category) {
            throw CustomErrorhandler.BadRequest("category not found")
        }

        res.status(200).json(category)

    } catch (error) {
        next(error)
    }
}

const addCategory = async (req, res, next) => {
    try {

        const { role } = req.user

        if (role !== "admin") {
            throw CustomErrorhandler.Forbidden("you are not admin")
        }

        const { name, imageUrl } = req.body

        const category = await categorySchema.create({ name, imageUrl })

        res.status(201).json({
            message: "added new category",
            data: category
        })

    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { role } = req.user
        if (role !== "admin") throw CustomErrorhandler.Forbidden("you are not admin")

        const { id } = req.params
        const { name, imageUrl } = req.body

        const category = await categorySchema.findByIdAndUpdate(
            id,
            { name, imageUrl },
            { new: true }
        )

        if (!category) throw CustomErrorhandler.BadRequest("category not found")

        res.status(200).json({ message: "category updated", data: category })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { role } = req.user
        if (role !== "admin") throw CustomErrorhandler.Forbidden("you are not admin")

        const { id } = req.params
        const category = await categorySchema.findByIdAndDelete(id)

        if (!category) throw CustomErrorhandler.BadRequest("category not found")

        res.status(200).json({ message: "category deleted" })
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