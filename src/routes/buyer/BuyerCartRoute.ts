import { Router } from "express"
import BuyerCartController from "../../controllers/buyer/BuyerCartController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const BuyerCartRoute = Router()

BuyerCartRoute.post("/buyer/auth/cart", jwtAuth, BuyerCartController.createCart)
// BuyerCartRoute.get("/buyer/auth/get-cart", jwtAuth, BuyerCartController.getCartUser)

export default BuyerCartRoute