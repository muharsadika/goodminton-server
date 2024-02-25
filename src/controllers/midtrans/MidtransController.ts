import { Request, Response } from "express"
import MidtransService from "../../services/midrans/MidtransService"


export default new class MidtransController {

  async MidtransTransaction(req: Request, res: Response): Promise<Response> {
    return await MidtransService.MidtransTransaction(req, res)
  }
}