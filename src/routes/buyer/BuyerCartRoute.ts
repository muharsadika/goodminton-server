import { Router } from "express"
import BuyerCartController from "../../controllers/buyer/BuyerCartController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const BuyerCartRoute = Router()

BuyerCartRoute.post("/auth/add-cart",
  // jwtAuth,
  BuyerCartController.addCartBuyer)
BuyerCartRoute.delete("/auth/delete-cart/:id",
  // jwtAuth,
  BuyerCartController.deleteCartBuyer)

export default BuyerCartRoute