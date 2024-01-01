import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./OrderEntity";
import { Product } from "./ProductEntity";


@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string

  // ORDER HAS MANY ORDER ITEMS
  @ManyToOne(() => Order, (order) => order.order_items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order: Order

  // PRODUCT HAS MANY ORDER ITEMS
  @ManyToOne(() => Product, (product) => product.order_items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product
}
