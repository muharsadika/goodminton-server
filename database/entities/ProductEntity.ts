import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Admin } from "./AdminEntity";
// import { Transaction } from "./TransactionEntity";
import { Brand } from "./BrandEntity";
import { Category } from "./CategoryEntity";
import { Cart } from "./CartEntity";
import { OrderItem } from "./OrderItemEntity";

@Entity("products")
export class Product {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  product_name: string

  @Column()
  product_quantity: number

  @Column()
  product_price: number

  @Column({ type: "text", nullable: true })
  product_description: string

  @Column({ nullable: true })
  product_image_1: string

  @Column({ nullable: true })
  product_image_2: string

  @Column({ nullable: true })
  product_image_3: string

  // PRODUCT HAS MANY BRAND
  @ManyToOne(() => Brand, (brand) => brand.products, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "brand_id" })
  brand: Brand

  // PRODUCT HAS MANY CATEGORIES
  @ManyToOne(() => Category, (category) => category.products, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "category_id" })
  category: Category

  // PRODUCT HAS MANY CART
  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[]

  // PRODUCT HAS MANY ORDER ITEMS
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items: OrderItem[]

  // @ManyToOne(() => OrderItem, (orderItem) => orderItem.product, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE"
  // })
  // @JoinColumn({ name: "order_item_id" })
  // order_item: OrderItem

  // @OneToMany(() => Transaction, (transaction) => transaction.product)
  // transactions: Transaction

  // @ManyToOne(() => Admin, (admin) => admin.products, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE"
  // })
  // @JoinColumn({ name: "admin_id" })
  // admin: Admin

  // @ManyToMany(() => Buyer, (buyer) => buyer.products_who_saved)
  // users_who_saving: Buyer[]

  // @ManyToMany(() => Buyer, (buyer) => buyer.products_who_buying)
  // users_who_buying: Buyer[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}