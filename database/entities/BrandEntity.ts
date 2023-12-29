import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./ProductEntity";


@Entity("brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  brand_name: string

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}