import AdminProductController from "../../controllers/admin/AdminProductController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminProductRoute = Router()

AdminProductRoute.post("/admin/auth/create-product",
  // jwtAuth,
  AdminProductController.createProduct)
AdminProductRoute.patch("/admin/auth/update-product/:id",
  // jwtAuth,
  AdminProductController.updateProduct)
AdminProductRoute.delete("/admin/auth/delete-product/:id",
  // jwtAuth,
  AdminProductController.deleteProduct)
AdminProductRoute.get("/admin/auth/get-products",
  // jwtAuth,
  AdminProductController.getProducts)
AdminProductRoute.get("/admin/auth/get-product/:id",
  // jwtAuth,
  AdminProductController.getProductById)

export default AdminProductRoute;