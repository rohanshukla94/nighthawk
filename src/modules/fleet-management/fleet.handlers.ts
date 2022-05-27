import { Errors, mapErrorDetails, sanitizeErrorMessage } from "../../util";
import { v4 as uuid } from "uuid";
import { Components } from "../../app";
import Joi = require("joi");
import { IFleet, FleetID } from "./fleet.repository";
import { ClientEvents, Response, ServerEvents } from "../../events/";
import { Socket } from "socket.io";
import { Fleet } from "./fleet.entity";

const idSchema = Joi.string().guid({
  version: "uuidv4",
});

export default function (components: Components) {
  const { fleetRepository } = components;
  return {
    storeFleet: async function (
      payload: IFleet,
      callback: (res: Response<FleetID>) => void
    ) {
      // @ts-ignore
      const socket: Socket<ClientEvents, ServerEvents> = this;

      // validate the payload
    //   if (error) {
    //     return callback({
    //       error: Errors.INVALID_PAYLOAD,
    //       errorDetails: mapErrorDetails(error.details),
    //     });
    //   }

    //   value.id = uuid();

      // persist the entity
      try {
        await fleetRepository.store(payload);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      // acknowledge the creation
      callback({
        data: payload.id,
      });

      // notify the other users
      socket.broadcast.emit("fleet:created", payload);
    },

    showFleet: async function (
      id: FleetID,
      callback: (res: Response<IFleet | null>) => void
    ) {

      try {
        const fleet = await fleetRepository.show(id);
        callback({
          data: fleet,
        });
      } catch (e) {
        callback({
          error: sanitizeErrorMessage(e),
        });
      }
    },

    indexFleets: async function (callback: (res: Response<IFleet[]>) => void) {
      try {
        callback({
          data: await fleetRepository.index(),
        });
      } catch (e) {
        callback({
          error: sanitizeErrorMessage(e),
        });
      }
    },
  };
}
