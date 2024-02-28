import { Request, Response } from "express"
import MidtransService from "../../services/midrans/MidtransService"


export default new class MidtransController {

  async MidtransTransaction(req: Request, res: Response): Promise<Response> {
    return MidtransService.MidtransTransaction(req, res)
  }

  async midtransNotification(req: Request, res: Response): Promise<Response> {
    return MidtransService.midtransNotification(req, res)
  }
}