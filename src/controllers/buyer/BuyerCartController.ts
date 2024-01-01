import { Request, Response } from "express"
import BuyerCartService from "../../services/buyer/BuyerCartService"


export default new class BuyerAuthController {
  createCart(req: Request, res: Response): Promise<Response> {
    return BuyerCartService.createCart(req, res)
  }

  // getCartUser(req: Request, res: Response): Promise<Response> {
  //   return BuyerCartService.getCartUser(req, res)
  // }
}