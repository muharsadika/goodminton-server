import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, PrimaryColumn } from "typeorm"

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  fullname: string

  @Column({ nullable: true, unique: true })
  username: string

  @Column({ nullable: true })
  profile_picture: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}
