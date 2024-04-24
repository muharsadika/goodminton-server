import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Repository } from 'typeorm'
import { Buyer } from '../../../database/entities/BuyerEntity'
import { MidtransEntity } from '../../../database/entities/Midtrans'
import Midtrans = require('midtrans-client');
import { v4 as uuidv4 } from 'uuid'
import { Product } from '../../../database/entities/ProductEntity'
import { Cart } from '../../../database/entities/CartEntity'

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

      console.log("INI REQ BODY MIDTRANS", req.body);

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
          billing_address: {
            address: req.body.address
          }
        },
      }
      const transaction = await snap.createTransaction(parameter)

      await this.midtransRepository.save({
        id_buyer: req.body.id,
        order_id: parameter.transaction_details.order_id,
        transaction_status: "pending",
        gross_amount: parameter.transaction_details.gross_amount,
        cart_details: req.body.cart_details,
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
      const body = req.body;
      const order_id = body.order_id;
      console.log("INI REQ BODY WEBHOOK", body);

      if (body.status_code === '200') {
        const transaction = await this.midtransRepository.findOne({
          where: { order_id }
        })
        transaction.transaction_status = body.transaction_status
        await this.midtransRepository.save(transaction)

        //// USE THIS
        // const transaksiId = req.body.transaction_id
        // const cart = await this.cartRepository.findOne({
        //   where: { midtrans: transaksiId }
        // })

        // await cart.map(async (cart: any) => {
        //   const productId = cart.items.product.id; // Ambil ID produk
        // })
        //// USE THIS


        // const carts = transaction.carts;
        // for (const cartItem of carts) {
        //   const productId = cartItem.product.id; // Ambil ID produk
        //   const product = await this.productRepository.findOne({
        //     where: { id: productId }
        //   });
        //   if (product) {
        //     product.product_quantity -= cartItem.product_quantity; // Kurangi stok produk
        //     await this.productRepository.save(product); // Simpan perubahan ke database
        //   }
        // }



        // await this.updateStockProduct(req, res)

        // const product = await this.productRepository.findOne({
        //   where: { id: body.cart_details[0].product_id }
        // })

        // // Update product_quantity based on cart_quantity
        // for (const cartDetail of body.cart_details) {
        //   const cart = await this.cartRepository.findOne(cartDetail.cart_id);
        //   if (!cart) {
        //     continue;
        //   }

        //   const product = await this.productRepository.findOne({ where: { id: cart.product.id } });
        //   if (!product) {
        //     continue;
        //   }

        //   product.product_quantity -= cartDetail.cart_quantity;

        //   await this.productRepository.save(product);
        // }
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

  async updateStockProduct(req: Request, res: Response): Promise<Response> {
    try {
      const cart: any[] = req.body.cart;

      await cart.map(async (cart: any) => {
        const productId = cart.items.product.id;

        const product = await this.productRepository.findOne({
          where: { id: productId }
        });

        if (product) {
          product.product_quantity -= cart.items.product.product_quantity;
          await this.productRepository.save(product);
        }
      })

      return res
        .status(200)
        .json({
          code: 200,
          message: "UPDATE STOCK PRODUCT SUCCESS"
        })
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "UPDATE STOCK PRODUCT FAILED",
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