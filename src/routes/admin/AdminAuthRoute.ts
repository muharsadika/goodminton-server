import AdminAuthController from "../../controllers/admin/AdminAuthController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminAuthRoute = Router()

AdminAuthRoute.post("/admin/register", AdminAuthController.register)
AdminAuthRoute.post("/admin/login", AdminAuthController.login)
AdminAuthRoute.get("/admin/auth/check-auth", jwtAuth, AdminAuthController.checkAuth)

export default AdminAuthRoute;