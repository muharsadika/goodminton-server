import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"
import { Product } from "./ProductEntity"

@Entity("categories")
export class Category {
  // sort(arg0: (a: any, b: any) => any) {
  //   throw new Error("Method not implemented.")
  // }

  @PrimaryGeneratedColumn("uuid")
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