import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./UserEntity";
import { Product } from "./ProductEntity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  transaction_status: string

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}