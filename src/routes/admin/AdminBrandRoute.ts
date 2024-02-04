import AdminBrandController from "../../controllers/admin/AdminBrandController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminBrandRoute = Router()

AdminBrandRoute.post("/admin/auth/create-brand",
  // jwtAuth,
  AdminBrandController.createBrand)
AdminBrandRoute.patch("/aadmin/uth/update-brand/:id",
  // jwtAuth,
  AdminBrandController.updateBrand)
AdminBrandRoute.delete("/admin/auth/delete-brand/:id",
  // jwtAuth,
  AdminBrandController.deleteBrand)
AdminBrandRoute.get("/admin/auth/get-brands",
  // jwtAuth,
  AdminBrandController.getBrands)
AdminBrandRoute.get("/admin/auth/get-brand/:id",
  // jwtAuth,
  AdminBrandController.getBrandById)

export default AdminBrandRoute;