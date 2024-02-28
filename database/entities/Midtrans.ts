import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "midtrans" })
export class MidtransEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  order_id: string

  @Column({ nullable: true })
  transaction_status: string

  @Column({ nullable: true })
  gross_amount: number

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  product_quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}