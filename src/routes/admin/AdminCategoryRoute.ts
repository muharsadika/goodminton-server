import AdminCategoryController from "../../controllers/admin/AdminCategoryController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"

const AdminCategoryRoute = Router()

AdminCategoryRoute.post("/admin/create-category", jwtAuth, AdminCategoryController.createCategory)
AdminCategoryRoute.get("/admin/get-categories", jwtAuth, AdminCategoryController.getCategories)

export default AdminCategoryRoute;