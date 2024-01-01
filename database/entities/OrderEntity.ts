import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Product } from "./ProductEntity";
import { OrderItem } from "./OrderItemEntity";


@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

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

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}