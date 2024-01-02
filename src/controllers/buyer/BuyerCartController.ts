import { Request, Response } from "express"
import BuyerCartService from "../../services/buyer/BuyerCartService"


export default new class BuyerAuthController {
  createCart(req: Request, res: Response): Promise<Response> {
    return BuyerCartService.addProduct(req, res)
  }

  deleteCart(req: Request, res: Response): Promise<Response> {
    return BuyerCartService.deleteProduct(req, res)
  }
}