import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Fleet {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    slug!: string
}