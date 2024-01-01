import { Repository } from "typeorm"
import { Cart } from "../../../database/entities/CartEntity"
import { Product } from "../../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { Buyer } from "../../../database/entities/BuyerEntity"


export default new class BuyerCartService {
  private readonly buyerRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)
  private readonly cartRepository: Repository<Cart> = AppDataSource.getRepository(Cart)

  async createCart(req: Request, res: Response): Promise<Response> {
    try {
      const buyerActive = String(res.locals.auth.id)
      const {
        product_id,
        product_quantity
      } = req.body

      const buyerFind = await this.buyerRepository.findOne({
        where: {
          id: buyerActive
        }
      })
      const productFind = await this.productRepository.findOne({
        where: {
          id: product_id
        }
      })

      if (!buyerFind || !productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BUYER ID OR PRODUCT ID NOT FOUND"
          })
      }

      // find buyer and product in cart
      const cartFind = await this.cartRepository.findOne({
        where: {
          buyer: { id: buyerFind.id },
          product: { id: productFind.id }
        }
      })

      if (cartFind) {
        const cartUpdated = await this.cartRepository.save({
          ...cartFind,
          product_quantity: cartFind.product_quantity + product_quantity
        })

        return res
          .status(201)
          .json({
            code: 201,
            message: "CART UPDATED",
            data: cartUpdated
          })
      }

      const cartData = this.cartRepository.create({
        id: uuidv4(),
        buyer: buyerFind,
        product: productFind,
        product_quantity: product_quantity
      })
      const cartAdded = await this.cartRepository.save(cartData)
      return res
        .status(201)
        .json({
          code: 201,
          message: "ADD TO CART",
          data: cartAdded
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR"
        })
    }
  }
}