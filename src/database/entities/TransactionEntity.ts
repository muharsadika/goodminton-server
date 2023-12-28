// import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Buyer } from "./BuyerEntity";
// import { Product } from "./ProductEntity";

// @Entity("transactions")
// export class Transaction {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column({ nullable: true })
//   product_id: string

//   @Column({ nullable: true })
//   transaction_status: string

//   @ManyToOne(() => Buyer, (buyer) => buyer.orders, {
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE"
//   })
//   @JoinColumn({ name: "buyer_id" })
//   buyer: Buyer

//   @ManyToOne(() => Product, (product) => product.transactions, {
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE"
//   })
//   @JoinColumn({ name: "product_id" })
//   product: Product

//   @CreateDateColumn({ type: "timestamp with time zone" })
//   created_at: Date

//   @UpdateDateColumn({ type: "timestamp with time zone" })
//   updated_at: Date
// }