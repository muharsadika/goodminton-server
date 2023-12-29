import { Collection, Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Product } from "./ProductEntity";


@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

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
  quantity: number
}