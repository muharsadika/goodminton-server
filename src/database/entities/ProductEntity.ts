import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Admin } from "./AdminEntity";
import { Transaction } from "./TransactionEntity";
import { Brand } from "./BrandEntity";
import { Category } from "./CategoryEntity";

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

  @ManyToOne(() => Brand, (brand) => brand.products, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "brand_id" })
  brand: Brand

  @ManyToOne(() => Category, (category) => category.products, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "category_id" })
  category: Category

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions: Transaction

  @ManyToOne(() => Admin, (admin) => admin.products, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "admin_id" })
  admin: Admin

  @ManyToMany(() => Buyer, (buyer) => buyer.products_who_saved, { cascade: true })
  @JoinTable({
    name: "cart",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users_who_saving: Buyer[]

  @ManyToMany(() => Buyer, (buyer) => buyer.products_who_buying, { cascade: true })
  @JoinTable({
    name: "collections",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users_who_buying: Buyer[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}