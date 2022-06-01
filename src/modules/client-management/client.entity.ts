import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()


    
    name!: string

    @Column()
    fleetID!: string
}