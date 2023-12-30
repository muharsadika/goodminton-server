import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Order } from "./OrderEntity";
import { Product } from "./ProductEntity";


@Entity("order_items")
export class OrderItem {

  @Column({ type: "uuid" })
  order_item_id: string

  @ManyToOne(() => Order, (order) => order.order_items)
  order: Order

  @ManyToOne(() => Product, (product) => product.order_items)
  product: Product
}
