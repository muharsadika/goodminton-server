import { Collection, Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Product } from "./ProductEntity";


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

  @Column()
  product_quantity: number
}