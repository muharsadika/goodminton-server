import { Request, Response } from "express"
import AdminCategoryService from "../../services/admin/AdminCategoryService"


export default new class AdminCategoryController {
  createCategory(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.createCategory(req, res)  
  }

  getCategories(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.getCategories(req, res)
  }
}