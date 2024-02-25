import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "midtrans" })
export class Midtrans {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  order_id: string

  @Column()
  transaction_status: string

  @Column()
  gross_amount: number

  @Column()
  email: string

  @Column()
  product_quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}