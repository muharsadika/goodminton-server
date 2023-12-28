import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
// import { Transaction } from "./TransactionEntity"
import { Product } from "./ProductEntity"
import { Cart } from "./CartEntity"

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

    @OneToMany(() => Cart, (cart) => cart.buyer)
    carts: Cart[]

    // @OneToMany(() => Transaction, (transaction) => transaction.buyer)
    // orders: Transaction[]

    // @ManyToMany(() => Product, (product) => product.users_who_saving, { cascade: true })
    // @JoinTable({
    //     name: "cart",
    //     joinColumn: {
    //         name: "buyer_id",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "product_id",
    //         referencedColumnName: "id"
    //     }
    // })
    // products_who_saved: Product[]

    // @ManyToMany(() => Product, (product) => product.users_who_buying, { cascade: true })
    // @JoinTable({
    //     name: "collections",
    //     joinColumn: {
    //         name: "buyer_id",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "product_id",
    //         referencedColumnName: "id"
    //     }
    // })
    // products_who_buying: Product[]

    @CreateDateColumn({ type: "timestamp with time zone" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at: Date
}
