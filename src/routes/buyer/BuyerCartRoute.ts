import { Router } from "express"
import BuyerCartController from "../../controllers/buyer/BuyerCartController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const BuyerCartRoute = Router()

BuyerCartRoute.post("/buyer/auth/add-cart",
  jwtAuth,
  BuyerCartController.addCartBuyer)
BuyerCartRoute.delete("/buyer/auth/delete-cart/:id",
  jwtAuth,
  BuyerCartController.deleteCartBuyer)

export default BuyerCartRoute