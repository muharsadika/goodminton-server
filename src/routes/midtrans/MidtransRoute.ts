import { Router } from "express"
import { jwtAuth } from "../../middlewares/jwtAuth"
import MidtransController from "../../controllers/midtrans/MidtransController"

const MidtransRoute = Router()

MidtransRoute.post("/midtrans/transaction",
  jwtAuth,
  MidtransController.MidtransTransaction
)

MidtransRoute.post("/midtrans/notification",
  MidtransController.midtransNotification
)

MidtransRoute.get("/midtrans/get-midtrans",
  MidtransController.getMidtrans
)

export default MidtransRoute