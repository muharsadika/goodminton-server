import { Router } from "express"
import BuyerAuthController from "../../controllers/buyer/BuyerAuthController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const buyerAuthRoute = Router()

buyerAuthRoute.post("/buyer/register", BuyerAuthController.registerBuyer)
buyerAuthRoute.post("/buyer/login", BuyerAuthController.loginBuyer)
buyerAuthRoute.get("/buyer/auth/check-auth", jwtAuth, BuyerAuthController.CheckAuthBuyer)

export default buyerAuthRoute