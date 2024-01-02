import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Cart } from "./CartEntity";


@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Buyer, (buyer) => buyer.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn({ name: "buyer_id" })
  buyer: Buyer

  @ManyToOne(() => Cart, (cart) => cart.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn({ name: "cart_id" })
  cart: Cart

  @Column()
  total_quantity: number

  @Column()
  total_price: number

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}