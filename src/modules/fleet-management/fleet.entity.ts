import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Client } from "../client-management/client.entity";
import { Device } from "../device-management/device.entity";

@Entity()
export class Fleet {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    slugOrUuid!: string

    @ManyToOne(() => Client, client => client.fleets)
    client: Client | undefined;

    @OneToMany(() => Device,  device => device.fleet)
    devices: Device[] | undefined;
}