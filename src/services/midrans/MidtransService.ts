import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { v4 as uuidv4 } from 'uuid'
import Midtrans = require('midtrans-client');
import { Repository } from 'typeorm'
import { MidtransEntity } from '../../../database/entities/Midtrans'
import { Product } from '../../../database/entities/ProductEntity'
import { Cart } from '../../../database/entities/CartEntity'
import { Buyer } from '../../../database/entities/BuyerEntity'

export default new class MidtransService {
  private readonly buyerRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  private readonly midtransRepository: Repository<MidtransEntity> = AppDataSource.getRepository(MidtransEntity)
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)
  private readonly cartRepository: Repository<Cart> = AppDataSource.getRepository(Cart)

  async MidtransTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const snap = new Midtrans.Snap({
        isProduction: false,
        clientKey: process.env.EXPRESS_MIDTRANS_CLIENT_KEY,
        serverKey: process.env.EXPRESS_MIDTRANS_SERVER_KEY
      })

      const parameter = {
        transaction_details: {
          order_id: uuidv4(),
          gross_amount: req.body.gross_amount
        },
        item_details: [{
          id: "ITEM1",
          quantity: 1,
          price: req.body.gross_amount,
          name: "Midtrans Bear",
        }],
        // item_details: {
        //   id: req.body.id,
        //   // quantity: req.body.quantity
        // },
        customer_details: {
          first_name: req.body.first_name,
          email: req.body.email,
          phone: req.body.phone,
          billing_address: { address: req.body.address }
        },
      }

      const transaction = await snap.createTransaction(parameter)

      await this.midtransRepository.save({
        order_id: parameter.transaction_details.order_id,
        id_buyer: req.body.id,
        transaction_status: "pending",
        gross_amount: parameter.transaction_details.gross_amount,
      })

      return res
        .status(200)
        .json({
          code: 200,
          message: "SUCCESS",
          data: transaction,
          payment_url: transaction.redirect_url
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "MIDRANS TRANSACTION FAILED",
          error: error
        })
    }
  }


  async midtransNotification(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const order_id = body.order_id;

      if (body.status_code === "200") {
        const transaction = await this.midtransRepository.findOne({ where: { order_id } })

        transaction.transaction_status = body.transaction_status
        await this.midtransRepository.save(transaction)

        const cart = await this.cartRepository.find({
          where: { buyer: { id: transaction.id_buyer } },
          relations: ["product"]
        })

        for (const cartItem of cart) {
          const product = cartItem.product;
          product.product_quantity -= cartItem.product_quantity;
          await this.productRepository.save(product);
        }

        return res
          .status(200)
          .json({
            code: 200,
            message: "TRANSACTION UPDATED",
            data: body,
          })
      }

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "MIDRANS NOTIFICATION FAILED",
          error: error
        })
    }
  }


  async getMidtrans(req: Request, res: Response): Promise<Response> {
    try {
      const midtrans = await this.midtransRepository.find()

      return res
        .status(200)
        .json({
          code: 200,
          data: midtrans
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "GET MIDTRANS FAILED",
          error: error
        })
    }
  }
}