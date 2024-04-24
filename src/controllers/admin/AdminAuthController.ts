import { Request, Response } from "express";
import AdminAuthService from "../../services/admin/AdminAuthService";

export default new class AdminAuthController {
  register(req: Request, res: Response): Promise<Response> {
    return AdminAuthService.registerAdmin(req, res)
  }

  login(req: Request, res: Response): Promise<Response> {
    return AdminAuthService.loginAdmin(req, res)
  }

  checkAuth(req: Request, res: Response): Promise<Response> {
    return AdminAuthService.checkAuthAdmin(req, res)
  }
}