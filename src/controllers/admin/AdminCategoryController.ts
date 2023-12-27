import { Request, Response } from "express"
import AdminCategoryService from "../../services/admin/AdminCategoryService"


export default new class AdminCategoryController {
  createCategory(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.createCategory(req, res)  
  }

  updateCategory(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.updateCategory(req, res)
  }

  deleteCategory(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.deleteCategory(req, res)
  }

  getCategories(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.getCategories(req, res)
  }

  getCategoryById(req: Request, res: Response): Promise<Response> {
    return AdminCategoryService.getCategoryById(req, res)
  }
}