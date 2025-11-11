import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fleet } from './modules/fleets/fleet.entity'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "fms_api",
    synchronize: true,
    logging: true,
    entities: [Fleet],
    migrations: [],
    subscribers: [],
})
