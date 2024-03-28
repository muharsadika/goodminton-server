import { Repository } from "typeorm"
import { Cart } from "../../../database/entities/CartEntity"
import { Product } from "../../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { Buyer } from "../../../database/entities/BuyerEntity"


export default new class BuyerCartService {
  private readonly buyerRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)
  private readonly cartRepository: Repository<Cart> = AppDataSource.getRepository(Cart)

  async getCartBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const buyerActive = res.locals.auth

      const carts = await this.cartRepository.find({
        where: { buyer: { id: buyerActive.id } },
        relations: ["product"]
      })

      if (!carts || carts.length === 0) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CARTS NOT FOUND"
          })
      }

      const cartsDetail = {
        items: carts.map((cart) => ({
          ...cart,
          subtotal_price: cart.product.product_price * cart.product_quantity
        })),
        cart_total_quantity: carts.reduce((acc, cart) => acc + cart.product_quantity, 0),
        cart_total_price: carts.reduce((acc, cart) => acc + (cart.product.product_price * cart.product_quantity), 0),
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "CART FOUND",
          data: cartsDetail
        })
    }
    catch (error) {
      return res
        .status(500)
        .json({
          code: 500,
          message: error
        })
    }
  }

  async addCartBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const buyerActive = res.locals.auth

      const {
        product_id,
        product_quantity
      } = req.body

      const buyerFind = await this.buyerRepository.findOne({
        where: {
          id: buyerActive.id
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

      // if product already exist in cart, just update the product quantity
      if (cartFind) {
        const cartUpdated = await this.cartRepository.save({
          ...cartFind,
          buyer: { id: buyerFind.id },
          product: { id: productFind.id },
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

      else {
        // if product not exist in cart, create a new cart
        const cartData = this.cartRepository.create({
          // buyer: buyerFind,
          // product: productFind,
          buyer: { id: buyerFind.id },
          product: { id: productFind.id },
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
      }

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

  async deleteCartBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const cartFind = await this.cartRepository.findOne({
        where: {
          id: id
        }
      })

      if (!cartFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CART ID NOT FOUND"
          })
      }

      const cartDeleted = await this.cartRepository.remove(cartFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "CART DELETED",
          data: cartDeleted
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


  async updatecartQuantity(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { product_quantity } = req.body

      const cartFind = await this.cartRepository.findOne({
        where: {
          id: id
        }
      })

      if (!cartFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "CART ID NOT FOUND"
          })
      }

      const cartUpdated = await this.cartRepository.save({
        ...cartFind,
        product_quantity: product_quantity
      })

      return res
        .status(200)
        .json({
          code: 200,
          message: "CART UPDATED",
          data: cartUpdated
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