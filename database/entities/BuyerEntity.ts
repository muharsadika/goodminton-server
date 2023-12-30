import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, PrimaryColumn } from "typeorm"
import { Cart } from "./CartEntity"
import { Order } from "./OrderEntity"


@Entity("buyers")
export class Buyer {

    @PrimaryColumn({ type: "uuid" })
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    fullname: string

    @Column({ unique: true })
    username: string

    @Column({ nullable: true, type: "text" })
    address: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    profile_picture: string

    @OneToMany(() => Cart, (cart) => cart.buyer)
    carts: Cart[]

    @OneToMany(() => Order, (order) => order.buyer)
    orders: Order[]

    @CreateDateColumn({ type: "timestamp with time zone" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at: Date
}