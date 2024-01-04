import AdminAuthController from "../../controllers/admin/AdminAuthController"
import { jwtAuth } from "../../middlewares/jwtAuth"
import { Router } from "express"


const AdminAuthRoute = Router()

AdminAuthRoute.post("/register", AdminAuthController.register)
AdminAuthRoute.post("/login", AdminAuthController.login)
AdminAuthRoute.get("/auth/check-auth", jwtAuth, AdminAuthController.checkAuth)

export default AdminAuthRoute;