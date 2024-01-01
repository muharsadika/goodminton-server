import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../../database/entities/CategoryEntity"
import { Request, Response } from "express"
import { Product } from "../../../database/entities/ProductEntity"
import { v4 as uuidv4 } from "uuid"


export default new class AdminCategoryService {
  private readonly categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

  async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { category_name } = req.body

      const isCheckNameCategory = await this.categoryRepository.findOne({
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


  async updateCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { category_name } = req.body

      const categoryIdFind = await this.categoryRepository.findOne({
        where: { id: id }
      })
      const categoryNameFind = await this.categoryRepository.findOne({
        where: { category_name: category_name }
      })

      if (!categoryIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CATEGORY ID NOT FOUND"
          })
      }

      if (categoryNameFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CATEGORY ALREADY EXISTS"
          })
      }

      if (category_name) categoryIdFind.category_name = category_name

      const categoryUpdated = await this.categoryRepository.save(categoryIdFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "CATEGORY SUCCESSFULLY",
          data: categoryUpdated
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


  async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const categoryIdFind = await this.categoryRepository.findOne({
        where: { id: id }
      })

      if (!categoryIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CATEGORY ID NOT FOUND"
          })
      }

      const categoryDeleted = await this.categoryRepository.remove(categoryIdFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "CATEGORY DELETED",
          data: categoryDeleted
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


  async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await this.categoryRepository.find({
        order: {
          category_name: "ASC"
        },
        relations: [
          "products"
        ],
        select: {
          products: {
            product_name: true
          }
        }
      })

      // categories.forEach((category) => {
      //   category.products.sort((a, b) => a.id - b.id)
      // })

      const sortedCategories = categories.map((category) => ({
        ...category,
        products: category.products.sort((a, b) => a.id.localeCompare(b.id)),
      }));

      return res
        .status(200)
        .json({
          code: 200,
          message: "CATEGORY SUCCESSFULLY",
          data: sortedCategories
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


  async getCategoryById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const categoryIdFind = await this.categoryRepository.findOne({
        where: { id: id }
      })

      if (!categoryIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CATEGORY ID NOT FOUND"
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "CATEGORY SUCCESSFULLY",
          data: categoryIdFind
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