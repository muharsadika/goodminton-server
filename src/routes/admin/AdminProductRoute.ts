import AdminProductService from "../../services/admin/AdminProductService";
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"

const AdminProductRoute = Router()

AdminProductRoute.post("/admin/create-product", jwtAuth, AdminProductService.createProduct)
AdminProductRoute.get("/admin/get-products", jwtAuth, AdminProductService.getProducts)

export default AdminProductRoute;