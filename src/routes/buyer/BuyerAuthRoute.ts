import { Router } from "express"
import BuyerAuthController from "../../controllers/buyer/BuyerAuthController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const buyerAuthRoute = Router()

buyerAuthRoute.post("/register", BuyerAuthController.registerBuyer)
buyerAuthRoute.post("/login", BuyerAuthController.loginBuyer)
buyerAuthRoute.get("/auth/check-auth",
  // jwtAuth,
  BuyerAuthController.CheckAuthBuyer)

export default buyerAuthRoute