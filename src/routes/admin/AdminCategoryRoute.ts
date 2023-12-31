import AdminCategoryController from "../../controllers/admin/AdminCategoryController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminCategoryRoute = Router()

AdminCategoryRoute.post("/admin/auth/create-category", jwtAuth, AdminCategoryController.createCategory)
AdminCategoryRoute.patch("/admin/auth/update-category/:id", jwtAuth, AdminCategoryController.updateCategory)
AdminCategoryRoute.delete("/admin/auth/delete-category/:id", jwtAuth, AdminCategoryController.deleteCategory)
AdminCategoryRoute.get("/admin/auth/get-categories", jwtAuth, AdminCategoryController.getCategories)
AdminCategoryRoute.get("/admin/auth/get-category/:id", jwtAuth, AdminCategoryController.getCategoryById)

export default AdminCategoryRoute;