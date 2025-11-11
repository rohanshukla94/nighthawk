import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fleet } from './modules//fleet-management/fleet.entity'
import { Area } from "./modules/area-management/area.entity"
import { Device } from "./modules/device-management/device.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "fms_api",
    synchronize: true,
    logging: true,
    entities: [Fleet, Area, Device],
    migrations: [],
    subscribers: [],
})
