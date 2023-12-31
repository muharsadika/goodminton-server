import { Request, Response } from "express"
import BuyerAuthService from "../../services/buyer/BuyerAuthService"


export default new class BuyerAuthController {
  registerBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerAuthService.registerBuyer(req, res)
  }

  loginBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerAuthService.loginBuyer(req, res)
  }

  CheckAuthBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerAuthService.CheckAuthBuyer(req, res)
  }
}