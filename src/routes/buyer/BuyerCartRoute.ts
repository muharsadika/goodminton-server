import { Router } from "express"
import BuyerCartController from "../../controllers/buyer/BuyerCartController"
import { jwtAuth } from "../../middlewares/jwtAuth"

const BuyerCartRoute = Router()

BuyerCartRoute.get("/buyer/auth/get-cart",
  jwtAuth,
  BuyerCartController.getCartBuyer
)

BuyerCartRoute.post("/buyer/auth/add-cart",
  jwtAuth,
  BuyerCartController.addCartBuyer
)

BuyerCartRoute.delete("/buyer/auth/delete-cart/:id",
  jwtAuth,
  BuyerCartController.deleteCartBuyer
)

BuyerCartRoute.patch("/buyer/auth/update-cart-quantity/:id",
  jwtAuth,
  BuyerCartController.updatecartQuantity
)

export default BuyerCartRoute