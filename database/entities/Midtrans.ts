import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Cart } from "./CartEntity"

@Entity({ name: "midtrans" })
export class MidtransEntity {
  @PrimaryColumn()
  order_id: string

  @Column({ nullable: true })
  id_buyer: string

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