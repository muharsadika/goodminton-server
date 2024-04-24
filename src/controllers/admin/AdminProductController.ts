import { Request, Response } from "express"
import AdminProductService from "../../services/admin/AdminProductService"

export default new class AdminProductController {
  createProduct(req: Request, res: Response): Promise<Response> {
    return AdminProductService.createProduct(req, res)
  }

  updateProduct(req: Request, res: Response): Promise<Response> {
    return AdminProductService.updateProduct(req, res)
  }

  deleteProduct(req: Request, res: Response): Promise<Response> {
    return AdminProductService.deleteProduct(req, res)
  }

  getProducts(req: Request, res: Response): Promise<Response> {
    return AdminProductService.getProducts(req, res)
  }

  getProductById(req: Request, res: Response): Promise<Response> {
    return AdminProductService.getProductById(req, res)
  }

  getProductsByCategory(req: Request, res: Response): Promise<Response> {
    return AdminProductService.getProductsByCategory(req, res)
  }
}