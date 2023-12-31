import { Router } from "express"
import BuyerAuthController from "../../controllers/buyer/BuyerAuthController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const buyerRoute = Router()

buyerRoute.post("/buyer/register", BuyerAuthController.registerBuyer)
buyerRoute.post("/buyer/login", BuyerAuthController.loginBuyer)
buyerRoute.get("/buyer/auth/check-auth", jwtAuth, BuyerAuthController.CheckAuthBuyer)

export default buyerRoute