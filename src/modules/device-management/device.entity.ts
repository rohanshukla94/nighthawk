import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fleet } from "../fleet-management/fleet.entity";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    uuid!: string

    @Column()
    deviceName!: string

    @Column()
    status!: string

    @Column()
    is_online!: boolean

    @Column()
    last_connectivity_event!: string

    @Column()
    is_connected_to_vpn!: boolean

    @Column()
    last_vpn_event!: string

    @Column()
    ip_address!: string


    @Column()
    mac_address!: string

    @Column()
    public_address!: string

    @Column()
    os_version!: string

    @Column()
    os_variant!: string

    @Column()
    supervisor_version!: string

    @Column()
    is_web_accessible!: boolean

    @Column()
    longitude!: string

    @Column()
    latitude!: string

    @Column()
    location!: string

    @Column()
    created_at!: string

    @Column()
    modified_at!: string

    @Column()
    is_active!: boolean

    @Column()
    api_heartbeat_state!: string

    @Column()
    memory_usage!: number

    @Column()
    memory_total!: number

    @Column()
    storage_block_device!: string

    @Column()
    storage_usage!: number

    @Column()
    storage_total!: number

    @Column()
    cpu_temp!: number

    @Column()
    cpu_usage!: number

    @Column()
    cpu_id!: string

    @ManyToOne(() => Fleet, fleet => fleet.devices)
    fleet: Fleet | undefined

}