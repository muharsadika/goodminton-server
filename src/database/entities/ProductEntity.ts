import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./UserEntity";
import { Transaction } from "./TransactionEntity";

@Entity("products")
export class Product {

  @PrimaryColumn()
  id: number

  @Column()
  product_name: string

  @Column()
  product_quantity: number

  @Column()
  product_price: number

  @Column({
    type: "text"
  })
  product_description: string

  @Column({
    nullable: true
  })
  product_image_1: string

  @Column({
    nullable: true
  })
  product_image_2: string

  @Column({
    nullable: true
  })
  product_image_3: string

  @ManyToMany(() => User, (user) => user.products_who_saved, { cascade: true })
  @JoinTable({
    name: "cart",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users_who_saving: User[]

  @ManyToMany(() => User, (user) => user.products_who_buying, { cascade: true })
  @JoinTable({
    name: "collections",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users_who_buying: User[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}