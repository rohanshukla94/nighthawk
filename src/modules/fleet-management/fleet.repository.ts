
import { AppDataSource } from "../../data-source";
import { Errors } from "../../util";
import { CrudRepository } from "../common";
import { Fleet } from "./fleet.entity";



export type FleetID = number;

export interface IFleet {
  id: FleetID;
  name: string;
  title: string;
}
export class FleetRepository extends CrudRepository<Fleet, FleetID> {
  private readonly fleet = AppDataSource.getRepository(Fleet)

  async index(): Promise<Fleet[]> {
    const entities = await this.fleet.find();
    return entities;
  }

  async store(entity: Fleet): Promise<Fleet> {
    const newFleet = await this.fleet.save(entity);
    return newFleet;
  }

  async show(id: FleetID): Promise<Fleet | null> {
    if (id) {
      const entity = await this.fleet.findOne({where: {
        id: id,
    }});
      return entity;
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }
}
