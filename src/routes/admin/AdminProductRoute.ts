import AdminProductController from "../../controllers/admin/AdminProductController"
import uploadImage from "../../middlewares/UploadImage"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminProductRoute = Router()

AdminProductRoute.post("/auth/create-product", jwtAuth, uploadImage.single("product_image_1"), AdminProductController.createProduct)
AdminProductRoute.patch("/auth/update-product/:id", jwtAuth, AdminProductController.updateProduct)
AdminProductRoute.delete("/auth/delete-product/:id", jwtAuth, AdminProductController.deleteProduct)
AdminProductRoute.get("/auth/get-products", jwtAuth, AdminProductController.getProducts)
AdminProductRoute.get("/auth/get-product/:id", jwtAuth, AdminProductController.getProductById)

export default AdminProductRoute;