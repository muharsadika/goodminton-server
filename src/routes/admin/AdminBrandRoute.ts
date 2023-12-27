import AdminBrandController from "../../controllers/admin/AdminBrandController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminBrandRoute = Router()

AdminBrandRoute.post("/auth/admin/create-brand", jwtAuth, AdminBrandController.createBrand)
AdminBrandRoute.patch("/auth/admin/update-brand/id", jwtAuth, AdminBrandController.updateBrand)
AdminBrandRoute.delete("/auth/admin/delete-brand/:id", jwtAuth, AdminBrandController.deleteBrand)
AdminBrandRoute.get("/auth/admin/get-brands", jwtAuth, AdminBrandController.getBrands)
AdminBrandRoute.get("/auth/admin/get-brand/:id", jwtAuth, AdminBrandController.getBrandById)

export default AdminBrandRoute;