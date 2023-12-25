import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { Transaction } from "./TransactionEntity"
import { Product } from "./ProductEntity"

@Entity("buyers")
export class Buyer {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: true })
    fullname: string

    @Column({ nullable: true, unique: true })
    username: string

    @Column({ nullable: true, type: "text" })
    address: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    profile_picture: string

    @ManyToMany(() => Product, (product) => product.users_who_saving)
    products_who_saved: Product[]

    @ManyToMany(() => Product, (product) => product.users_who_buying)
    products_who_buying: Product[]

    @OneToMany(() => Transaction, (transaction) => transaction.buyer)
    orders: Transaction[]

    @CreateDateColumn({ type: "timestamp with time zone" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at: Date
}
