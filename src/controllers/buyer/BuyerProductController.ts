import { Request, Response } from "express"
import BuyerProductService from "../../services/buyer/BuyerProductService"

export default new class BuyerProductController {
  getProducts(req: Request, res: Response): Promise<Response> {
    return BuyerProductService.getProducts(req, res)
  }

  getProduct(req: Request, res: Response): Promise<Response> {
    return BuyerProductService.getProduct(req, res)
  }
}