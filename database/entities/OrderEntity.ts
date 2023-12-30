import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Product } from "./ProductEntity";
import { OrderItem } from "./OrderItemEntity";

@Entity("orders")
export class Order {
  @PrimaryColumn({type: "uuid"})
  order_id: number

  // ORDER HAS ONE BUYER
  @ManyToOne(() => Buyer, (buyer) => buyer.orders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn({ name: "buyer_id" })
  buyer: Buyer

  // ORDER HAS MANY ORDER ITEMS
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[]

  // // ORDER HAS MANY ORDER ITEMS
  // @ManyToOne(() => OrderItem, (orderItem) => orderItem.order, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE"
  // })
  // @JoinColumn({ name: "order_item_id" })
  // order_items: OrderItem

  // @OneToMany(() => Product, (product) => product.orders)
  // products: Product[]

  // @ManyToOne(() => Product, (product) => product.transactions, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE"
  // })
  // @JoinColumn({ name: "product_id" })
  // product: Product

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}