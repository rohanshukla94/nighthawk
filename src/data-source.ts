import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fleet } from './modules//fleet-management/fleet.entity'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Fleet],
    migrations: [],
    subscribers: [],
})
