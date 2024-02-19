import { Router } from "express"
import { jwtAuth } from "../../middlewares/jwtAuth"
import buyerProfileController from "../../controllers/buyer/buyerProfileController"
import uploadImage from "../../middlewares/UploadImage"


const BuyerProfileRoute = Router()

BuyerProfileRoute.get("/buyer/auth/get-profile",
  jwtAuth,
  buyerProfileController.getProfileBuyer)

BuyerProfileRoute.patch("/buyer/auth/update-profile",
  jwtAuth,
  uploadImage.single("profile_picture"), buyerProfileController.updateProfileBuyer)

export default BuyerProfileRoute
