import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { Transaction } from "./TransactionEntity"
import { Product } from "./ProductEntity"

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  fullname: string

  @Column({ nullable: true, unique: true })
  username: string

  @Column({ nullable: true })
  profile_picture: string

  @OneToMany(() => Transaction, (transaction) => transaction.buyer)
  orders: Transaction[]

  @OneToMany(() => Product, (product) => product.admin)
  products: Product[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}
