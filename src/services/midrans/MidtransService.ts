import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Repository } from 'typeorm'
import { Buyer } from '../../../database/entities/BuyerEntity'
import { MidtransEntity } from '../../../database/entities/Midtrans'
import Midtrans = require('midtrans-client');
import { v4 as uuidv4 } from 'uuid'

export default new class MidtransService {

  private readonly buyerRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  private readonly midtransRepository: Repository<MidtransEntity> = AppDataSource.getRepository(MidtransEntity)

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
        // item_details: {
        //   name: req.body.product_name,
        //   quantity: req.body.cart_total_quantity
        // },
        customer_details: {
          first_name: req.body.first_name,
          email: req.body.email,
          phone: req.body.phone,
          billing_address: {
            address: req.body.address
          }
        },
      }
      const transaction = await snap.createTransaction(parameter)

      await this.midtransRepository.save({
        order_id: parameter.transaction_details.order_id,
        transaction_status: "pending",
        gross_amount: parameter.transaction_details.gross_amount,
        // product_quantity: parameter.item_details.quantity,
        // email: parameter.customer_details.email,
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
      const body = req.body
      console.log(body);

      if (body.status_code === '200') {
        const transaction = await this.midtransRepository.findOne({
          where: {
            order_id: body.order_id
          }
        })
        if (!transaction) {
          return res
            .status(400)
            .json({
              code: 400,
              message: "TRANSACTION NOT FOUND"
            })
        }
        transaction.transaction_status = body.transaction_status
        await this.midtransRepository.save(transaction)

        return res
          .status(200)
          .json({
            code: 200,
            message: "TRANSACTION UPDATED",
            data: body
          })
      }

    } catch (error) {
      return res
        .status(500)
        .json({
          code: 500,
          message: "MIDRANS NOTIFICATION FAILED",
          error: error
        })
    }
  }
}