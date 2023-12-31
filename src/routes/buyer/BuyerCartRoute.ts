import { Router } from "express"
import BuyerCartController from "../../controllers/buyer/BuyerCartController"


const BuyerCartRoute = Router()

BuyerCartRoute.post("/auth/buyer/cart", BuyerCartController.createCart)

export default BuyerCartRoute