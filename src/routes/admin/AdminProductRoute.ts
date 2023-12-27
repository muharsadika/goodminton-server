import AdminProductController from "../../controllers/admin/AdminProductController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminProductRoute = Router()

AdminProductRoute.post("/auth/admin/create-product", jwtAuth, AdminProductController.createProduct)
AdminProductRoute.patch("/auth/admin/update-product", jwtAuth, AdminProductController.updateProduct)
AdminProductRoute.delete("/auth/admin/delete-product", jwtAuth, AdminProductController.deleteProduct)
AdminProductRoute.get("/auth/admin/get-products", jwtAuth, AdminProductController.getProducts)
AdminProductRoute.get("/auth/admin/get-product", jwtAuth, AdminProductController.getProductById)

export default AdminProductRoute;