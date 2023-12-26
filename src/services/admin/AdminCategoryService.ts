import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../database/entities/CategoryEntity"
import { Request, Response } from "express"


export default class AdminCategoryService {
  private readonly categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

  async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { category_name } = req.body

      const isCheckNameCategory = this.categoryRepository.findOne({
        where: { category_name: category_name }
      })
      if (isCheckNameCategory) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CATEGORY ALREADY EXISTS"
          })
      }

      const categoryData = this.categoryRepository.create({
        category_name: category_name
      })
      const categoryCreated = await this.categoryRepository.save(categoryData)
      return res
        .status(201)
        .json({
          code: 201,
          message: "CATEGORY CREATED",
          data: categoryCreated
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
          error: error
        })
    }
  }

  async getCategory(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await this.categoryRepository.find()
      return res
        .status(200)
        .json({
          code: 200,
          message: "CATEGORY SUCCESSFULLY",
          data: categories
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
          error: error
        })
    }
  }
}