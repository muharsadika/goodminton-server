import { Request, Response } from "express"
import BuyerProfileService from "../../services/buyer/BuyerProfileService"


export default new class BuyerProfileController {

  getProfileBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerProfileService.getProfileBuyer(req, res)
  }
  updateProfileBuyer(req: Request, res: Response): Promise<Response> {
    return BuyerProfileService.updateProfileBuyer(req, res)
  }
}