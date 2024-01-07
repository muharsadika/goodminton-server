import AdminCategoryController from "../../controllers/admin/AdminCategoryController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminCategoryRoute = Router()

AdminCategoryRoute.post("/auth/create-category",
  // jwtAuth,
  AdminCategoryController.createCategory)
AdminCategoryRoute.patch("/auth/update-category/:id",
  // jwtAuth,
  AdminCategoryController.updateCategory)
AdminCategoryRoute.delete("/auth/delete-category/:id",
  // jwtAuth,
  AdminCategoryController.deleteCategory)
AdminCategoryRoute.get("/auth/get-categories",
  // jwtAuth,
  AdminCategoryController.getCategories)
AdminCategoryRoute.get("/auth/get-category/:id",
  // jwtAuth,
  AdminCategoryController.getCategoryById)

export default AdminCategoryRoute;