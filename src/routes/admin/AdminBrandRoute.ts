import AdminBrandController from "../../controllers/admin/AdminBrandController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminBrandRoute = Router()

AdminBrandRoute.post("/auth/create-brand", jwtAuth, AdminBrandController.createBrand)
AdminBrandRoute.patch("/auth/update-brand/:id", jwtAuth, AdminBrandController.updateBrand)
AdminBrandRoute.delete("/auth/delete-brand/:id", jwtAuth, AdminBrandController.deleteBrand)
AdminBrandRoute.get("/auth/get-brands", jwtAuth, AdminBrandController.getBrands)
AdminBrandRoute.get("/auth/get-brand/:id", jwtAuth, AdminBrandController.getBrandById)

export default AdminBrandRoute;