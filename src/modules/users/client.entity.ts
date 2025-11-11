import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Fleet } from "../fleets/fleet.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
    
    @Column()
    company!: string

    @OneToMany(() => Fleet, fleet => fleet.client)
    fleets: Fleet[] | undefined;
}