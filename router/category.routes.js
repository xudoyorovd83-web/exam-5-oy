const {Router}=require("express")
const { getAllCategories, getOneCategory, addCategory, updateCategory, deleteCategory } = require("../controller/category.controller")

const categoryRouter=Router()

categoryRouter.get("/get_all_categories",getAllCategories)
categoryRouter.get("/get_one_categorie/:id",getOneCategory)
categoryRouter.post("/add_categorie",addCategory)
categoryRouter.put("/update_categorie/:id",updateCategory)
categoryRouter.put("/delete_categorie/:id",deleteCategory)

module.exports=categoryRouter