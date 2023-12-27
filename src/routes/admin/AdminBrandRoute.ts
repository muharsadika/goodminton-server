import AdminBrandController from "../../controllers/admin/AdminBrandController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminBrandRoute = Router()

AdminBrandRoute.post("/admin/create-brand", jwtAuth, AdminBrandController.createBrand)
AdminBrandRoute.get("/admin/get-brands", jwtAuth, AdminBrandController.getBrands)

export default AdminBrandRoute;