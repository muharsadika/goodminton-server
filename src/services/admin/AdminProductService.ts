import { Repository } from "typeorm"
import { Product } from "../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { addProductSchema } from "../../utils/validator/ProductValidator"


export default new class AdminProductService {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)

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

      const brandFind = await this.productRepository.findOne({
        where: { brand: { id: value.brand_id } }
      })
      const categoryFind = await this.productRepository.findOne({
        where: { category: { id: value.category_id } }
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


  async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find()
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
}