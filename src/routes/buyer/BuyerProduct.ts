import { Router } from "express"
import BuyerProductController from "../../controllers/buyer/BuyerProductController"
import { jwtAuth } from "../../middlewares/jwtAuth"


const BuyerProductRoute = Router()

BuyerProductRoute.get("/buyer/auth/get-products",
  // jwtAuth,
  BuyerProductController.getProducts)
BuyerProductRoute.get("/buyer/auth/get-product/:id",
  // jwtAuth,
  BuyerProductController.getProduct)

export default BuyerProductRoute