import { Router } from "express"
import { jwtAuth } from "../../middlewares/jwtAuth"
import buyerProfileController from "../../controllers/buyer/buyerProfileController"


const BuyerProfileRoute = Router()

BuyerProfileRoute.get("/auth/get-profile", jwtAuth, buyerProfileController.updateProfileBuyer)

export default BuyerProfileRoute
