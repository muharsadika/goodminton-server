import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"
import { Product } from "./ProductEntity"


@Entity("categories")
export class Category {

  @PrimaryColumn({ type: "uuid" })
  id: string

  @Column()
  category_name: string

  @OneToMany(() => Product, product => product.category)
  products: Product[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}