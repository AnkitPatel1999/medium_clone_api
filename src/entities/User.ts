import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryColumn()
    email: string

    @Column({ unique: true, nullable: false })
    username: string

    @Column()
    password?: string

    @Column({ type: "text", nullable: true })
    bio?: string

    @Column({  nullable: true })
    image?: string

    token?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}