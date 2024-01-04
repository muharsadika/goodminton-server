import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./ProductEntity";


@Entity("brands")
export class Brand {
  sort(arg0: (a: any, b: any) => any) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  brand_name: string

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}