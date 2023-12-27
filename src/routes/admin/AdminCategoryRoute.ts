import AdminCategoryController from "../../controllers/admin/AdminCategoryController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminCategoryRoute = Router()

AdminCategoryRoute.post("/auth/admin/create-category", jwtAuth, AdminCategoryController.createCategory)
AdminCategoryRoute.patch("/auth/admin/update-category/id", jwtAuth, AdminCategoryController.updateCategory)
AdminCategoryRoute.delete("/auth/admin/delete-category/id", jwtAuth, AdminCategoryController.deleteCategory)
AdminCategoryRoute.get("/auth/admin/get-categories", jwtAuth, AdminCategoryController.getCategories)
AdminCategoryRoute.get("/auth/admin/get-category/id", jwtAuth, AdminCategoryController.getCategoryById)

export default AdminCategoryRoute;