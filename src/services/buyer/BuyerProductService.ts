import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Buyer } from "../../../database/entities/BuyerEntity"
import { Product } from "../../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"


export default new class BuyerProductService {
  private readonly buyerRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find()
      return res
        .status(200)
        .json({
          code: 200,
          data: products
        })
    } catch (error) {
      return res
        .status(500)
        .json({
          code: 500,
          message: "PRODUCTS FETCH FAILED",
          error: error
        })
    }
  }

  async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const product = await this.productRepository.findOneBy({ id })
      return res
        .status(200)
        .json({
          code: 200,
          data: product
        })
    } catch (error) {
      return res
        .status(500)
        .json({
          code: 500,
          message: "PRODUCT FETCH FAILED",
          error: error
        })
    }
  }
}