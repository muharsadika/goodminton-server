import { Router } from "express"
import BuyerAuthController from "../../controllers/buyer/BuyerAuthController"


const buyerRoute = Router()

buyerRoute.post("/buyer/register", BuyerAuthController.registerBuyer)
buyerRoute.post("/buyer/login", BuyerAuthController.loginBuyer)

export default buyerRoute