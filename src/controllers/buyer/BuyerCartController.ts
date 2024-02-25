import { Request, Response } from "express"
import BuyerCartService from "../../services/buyer/BuyerCartService"


export default new class BuyerAuthController {
  addCartBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerCartService.addCartBuyer(req, res)
  }

  deleteCartBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerCartService.deleteCartBuyer(req, res)
  }

  updatecartQuantity(req: Request, res: Response): Promise<Response> {
    return BuyerCartService.updatecartQuantity(req, res)
  }
}