import AdminProductController from "../../controllers/admin/AdminProductController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"
import uploadImage from "../../middlewares/UploadImage"

const AdminProductRoute = Router()

AdminProductRoute.post("/admin/auth/create-product",
  jwtAuth,
  uploadImage.single("product_image_1"),
  AdminProductController.createProduct
)

AdminProductRoute.patch("/admin/auth/update-product/:id",
  // jwtAuth,
  uploadImage.single("product_image_1"),
  AdminProductController.updateProduct
)

AdminProductRoute.delete("/admin/auth/delete-product/:id",
  // jwtAuth,
  AdminProductController.deleteProduct
)

AdminProductRoute.get("/admin/auth/get-products",
  // jwtAuth,
  AdminProductController.getProducts
)

AdminProductRoute.get("/admin/auth/get-product/:id",
  // jwtAuth,
  AdminProductController.getProductById
)

AdminProductRoute.get("/admin/auth/get-product-category/:category",
  // jwtAuth,
  AdminProductController.getProductsByCategory
)

export default AdminProductRoute;