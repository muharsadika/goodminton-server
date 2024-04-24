import { Collection, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Product } from "./ProductEntity";
import { MidtransEntity } from "./Midtrans";
// import { Transaction } from "./Tansaction";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Buyer, (buyer) => buyer.carts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "buyer_id" })
  buyer: Buyer

  @ManyToOne(() => Product, (product) => product.carts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "product_id" })
  product: Product

  // @OneToMany(() => Transaction, (transaction) => transaction.cart)
  // transactions: Transaction

  @Column()
  product_quantity: number

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date

  @ManyToOne(() => MidtransEntity, midtrans => midtrans.carts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "midtrans_id" })
  midtrans: MidtransEntity;
}