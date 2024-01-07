import { Router } from "express"
import { jwtAuth } from "../../middlewares/jwtAuth"
import buyerProfileController from "../../controllers/buyer/buyerProfileController"
import uploadImage from "../../middlewares/UploadImage"


const BuyerProfileRoute = Router()

BuyerProfileRoute.patch("/auth/update-profile",
  // jwtAuth,
  uploadImage.single("profile_picture"), buyerProfileController.updateProfileBuyer)

export default BuyerProfileRoute
