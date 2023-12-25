import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Buyer } from "./BuyerEntity";
import { Product } from "./ProductEntity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  transaction_status: string

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  @JoinColumn({ name: "buyer_id" })
  buyer: Buyer

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}