import { Request, Response } from "express"
import AdminBrandService from "../../services/admin/AdminBrandService"


export default new class AdminBrandController {
  createBrand(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.createBrand(req, res)
  }

  getBrands(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.getBrands(req, res)
  }
}