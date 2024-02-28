import { Router } from "express"
import { jwtAuth } from "../../middlewares/jwtAuth"
import MidtransController from "../../controllers/midtrans/MidtransController"

const MidtransRoute = Router()

MidtransRoute.post("/midtrans/transaction",
  jwtAuth,
  MidtransController.MidtransTransaction)

MidtransRoute.post("/midtrans/notification",
  jwtAuth,
  MidtransController.midtransNotification)

export default MidtransRoute