import AdminProductController from "../../controllers/admin/AdminProductController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"

const AdminProductRoute = Router()

AdminProductRoute.post("/admin/create-product", jwtAuth, AdminProductController.createProduct)
AdminProductRoute.patch("/admin/update-product", jwtAuth, AdminProductController.updateProduct)
AdminProductRoute.delete("/admin/delete-product", jwtAuth, AdminProductController.deleteProduct)
AdminProductRoute.get("/admin/get-products", jwtAuth, AdminProductController.getProducts)
AdminProductRoute.get("/admin/get-product-by-id", jwtAuth, AdminProductController.getProductById)

export default AdminProductRoute;