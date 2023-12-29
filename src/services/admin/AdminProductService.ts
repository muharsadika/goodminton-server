import { Repository } from "typeorm"
import { Product } from "../../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { addProductSchema } from "../../utils/validator/ProductValidator"
import { Brand } from "../../../database/entities/BrandEntity"
import { Category } from "../../../database/entities/CategoryEntity"


export default new class AdminProductService {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)
  private readonly brandRepository: Repository<Brand> = AppDataSource.getRepository(Brand)
  private readonly categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const {
        product_name,
        product_quantity,
        product_price,
        product_description,
        product_image_1,
        product_image_2,
        product_image_3,
        brand_id,
        category_id
      } = req.body

      const { error, value } = addProductSchema.validate(req.body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "REGISTER FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const brandFind = await this.brandRepository.findOne({
        where: {
          id: value.brand_id
        }
      })
      const categoryFind = await this.categoryRepository.findOne({
        where: {
          id: value.category_id
        }
      })
      const productFind = await this.productRepository.findOne({
        where: { product_name: value.product_name }
      })

      if (!brandFind || !categoryFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND OR CATEGORY NOT FOUND"
          })
      }
      if (productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT ALREADY EXISTS"
          })
      }

      const productData = this.productRepository.create({
        product_name: value.product_name,
        product_quantity: value.product_quantity,
        product_price: value.product_price,
        product_description: value.product_description,
        product_image_1: value.product_image_1,
        product_image_2: value.product_image_2,
        product_image_3: value.product_image_3,
        brand: value.brand_id,
        category: value.category_id
      })
      const productCreated = await this.productRepository.save(productData)
      return res
        .status(201)
        .json({
          code: 201,
          message: "PRODUCT CREATED",
          data: productCreated
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
        })
    }
  }


  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const productFind = await this.productRepository.findOne({
        where: { id: parseInt(id) }
      })

      if (!productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      const {
        product_name,
        product_quantity,
        product_price,
        product_description,
        product_image_1,
        product_image_2,
        product_image_3,
        brand_id,
        category_id
      } = req.body

      const { error, value } = addProductSchema.validate(req.body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "REGISTER FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      if (value.product_name) productFind.product_name = value.product_name
      if (value.product_quantity) productFind.product_quantity = value.product_quantity
      if (value.product_price) productFind.product_price = value.product_price
      if (value.product_description) productFind.product_description = value.product_description
      if (value.product_image_1) productFind.product_image_1 = value.product_image_1
      if (value.product_image_2) productFind.product_image_2 = value.product_image_2
      if (value.product_image_3) productFind.product_image_3 = value.product_image_3
      if (value.brand_id) productFind.brand = value.brand_id
      if (value.category_id) productFind.category = value.category_id

      const productUpdated = await this.productRepository.save(productFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT UPDATED",
          data: productUpdated
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
        })
    }
  }


  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const productIdFind = await this.productRepository.findOne({
        where: { id: parseInt(id) }
      })

      if (!productIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      const productDeleted = await this.productRepository.remove(productIdFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT DELETED",
          data: productDeleted
        })
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
        })
    }
  }


  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find({
        order: {
          product_name: "ASC"
        },
        relations: {
          brand: true,
          category: true,
          // transactions: true,
          // admin: true,
        },
        select: {
          brand: {
            brand_name: true
          },
          category: {
            category_name: true
          }
        }
      })

      if (!products) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT SUCCESSFULLY",
          data: products
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
        })
    }
  }


  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const productFind = await this.productRepository.findOne({
        where: { id: parseInt(id) },
        relations: [
          "brand",
          "category",
          "transactions",
          "admin",
        ],
        select: {
          brand: {
            brand_name: true
          },
          category: {
            category_name: true
          }
        }
      })

      if (!productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT SUCCESSFULLY",
          data: productFind
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
        })
    }
  }
}