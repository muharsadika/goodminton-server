import { Request, Response } from "express"
import AdminBrandService from "../../services/admin/AdminBrandService"

export default new class AdminBrandController {
  createBrand(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.createBrand(req, res)
  }

  updateBrand(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.updateBrand(req, res)
  }

  deleteBrand(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.deleteBrand(req, res)
  }

  getBrands(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.getBrands(req, res)
  }

  getBrandById(req: Request, res: Response): Promise<Response> {
    return AdminBrandService.getBrandById(req, res)
  }
}