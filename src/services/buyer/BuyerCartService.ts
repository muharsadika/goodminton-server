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
      const {
        // buyer_id,
        product_id,
        product_quantity
      } = req.body

      const buyerActive = String(res.locals.auth.id)

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

      const cartFind = await this.cartRepository.findOne({
        where: {
          buyer: { id: buyerFind.id },
          product: { id: productFind.id }
        }
      })

      if (cartFind) {
        cartFind.buyer = buyerFind
        cartFind.product = productFind
        // cartFind.product_quantity = product_quantity
        cartFind.product_quantity = cartFind.product_quantity + product_quantity
        const cartUpdated = await this.cartRepository.save(cartFind)
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


      // let cartEntry = await this.cartRepository.findOne({
      //   where: {
      //     buyer: buyerFind,
      //     product: productFind
      //   }
      // })

      // if (cartEntry) {
      //   cartEntry.product_quantity = cartEntry.product_quantity + product_quantity
      // } else {
      //   cartEntry = this.cartRepository.create({
      //     id: uuidv4(),
      //     buyer: buyerFind,
      //     product: productFind,
      //     product_quantity: product_quantity
      //   })
      // }

      // const cartCreated = await this.cartRepository.save(cartEntry)

      // return res
      //   .status(201)
      //   .json({
      //     code: 201,
      //     message: "CART CREATED",
      //     data: cartCreated
      //   })

      // const existingCartEntry = await this.cartRepository.findOne({
      //   where: {
      //     buyer: buyerFind,
      //     product: productFind
      //   }
      // })

      // if (existingCartEntry) {
      //   existingCartEntry.product_quantity = existingCartEntry.product_quantity + product_quantity
      //   await this.cartRepository.save(existingCartEntry)

      //   return res
      //     .status(200)
      //     .json({
      //       code: 200,
      //       message: "CART UPDATED",
      //       data: existingCartEntry
      //     })
      // } else {
      //   const cartData = this.cartRepository.create({
      //     id: uuidv4(),
      //     buyer: buyerFind,
      //     product: productFind,
      //     product_quantity: product_quantity
      //   })

      //   const cartCreated = await this.cartRepository.save(cartData)

      //   return res
      //     .status(201)
      //     .json({
      //       code: 201,
      //       message: "CART CREATED",
      //       data: cartCreated
      //     })
      // }

      // const existingCart = await this.cartRepository.findOne({
      //   where: { buyer: buyer_id, product: product_id }
      // })

      // if (existingCart) {
      //   return res
      //     .status(400)
      //     .json({
      //       code: 400,
      //       message: "PRODUCT ALREADY EXISTS"
      //     })
      // }

      // const cartData = this.cartRepository.create({
      //   id: uuidv4(),
      //   buyer: req.body.buyer_id,
      //   product: req.body.product_id,
      //   product_quantity: req.body.product_quantity
      // })

      // const cartCreated = await this.cartRepository.save(cartData)

      // return res
      //   .status(201)
      //   .json({
      //     code: 201,
      //     message: "CART CREATED",
      //     data: cartCreated
      //   })

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

  // async getCartUser(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const auth = String(res.locals.auth.id)

  //     const buyer = await this.buyerRepository.findOne({
  //       where: { id: auth },
  //     })
  //     console.log("buyer", buyer);

  //     if (!buyer) {
  //       return res
  //         .status(400)
  //         .json({
  //           code: 400,
  //           message: "BUYER NOT FOUND"
  //         })
  //     }


  //     const cartItems = await this.cartRepository.find({
  //       where: { buyer: buyer },
  //       relations: {
  //         product: true
  //       }
  //     })
  //     console.log("cartItems", cartItems);


  //     if (!cartItems || cartItems.length === 0) {
  //       return res
  //         .status(400)
  //         .json({
  //           code: 400,
  //           message: "CART NOT FOUND"
  //         })
  //     }

  //     return res
  //       .status(200)
  //       .json({
  //         code: 200,
  //         message: "CART RETRIEVED",
  //         data: cartItems
  //       })

  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .json({
  //         code: 500,
  //         message: "INTERNAL SERVER ERROR"
  //       })
  //   }
  // }
}