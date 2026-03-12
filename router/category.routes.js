const {Router}=require("express")
const { getAllCategories, getOneCategory, addCategory, updateCategory, deleteCategory } = require("../controller/category.controller")
const authorization = require("../middleware/authorization")

const categoryRouter=Router()

categoryRouter.get("/get_all_categorys",getAllCategories)
categoryRouter.get("/get_one_category/:id",getOneCategory)
categoryRouter.post("/add_category",authorization,addCategory)
categoryRouter.put("/update_category/:id",authorization,updateCategory)
categoryRouter.delete("/delete_category/:id",authorization,deleteCategory)

module.exports=categoryRouter