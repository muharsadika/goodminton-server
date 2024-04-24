import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Cart } from "./CartEntity"

@Entity({ name: "midtrans" })
export class MidtransEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  id_buyer: string

  @Column({ nullable: true })
  order_id: string

  @Column({ nullable: true })
  transaction_status: string

  @Column({ nullable: true })
  gross_amount: number

  @OneToMany(() => Cart, cart => cart.midtrans)
  carts: Cart[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}