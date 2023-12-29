import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./ProductEntity"


@Entity("categories")
export class Category {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  category_name: string

  @OneToMany(() => Product, product => product.category)
  products: Product[]

  @CreateDateColumn({type: "timestamp with time zone"})
  created_at: Date

  @UpdateDateColumn({type: "timestamp with time zone"})
  updated_at: Date
}