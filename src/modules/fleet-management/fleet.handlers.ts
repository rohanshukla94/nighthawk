import { Errors, mapErrorDetails, sanitizeErrorMessage } from "../../util";
import { v4 as uuid } from "uuid";
import { Components } from "../../app";
import Joi = require("joi");
import { IFleet, FleetID } from "./fleet.repository";
import { ClientEvents, Response, ServerEvents } from "../../events/";
import { Socket } from "socket.io";

const idSchema = Joi.string().guid({
  version: "uuidv4",
});

// const todoSchema = Joi.object({
//   id: idSchema.alter({
//     create: (schema) => schema.forbidden(),
//     update: (schema) => schema.required(),
//   }),
//   title: Joi.string().max(256).required(),
//   completed: Joi.boolean().required(),
// });

export default function (components: Components) {
  const { fleetRepository } = components;
  return {
    createFleet: async function (
      payload: Omit<IFleet, "id">,
      callback: (res: Response<FleetID>) => void
    ) {
      // @ts-ignore
      const socket: Socket<ClientEvents, ServerEvents> = this;

      // validate the payload
    //   const { error, value } = todoSchema.tailor("create").validate(payload, {
    //     abortEarly: false,
    //     stripUnknown: true,
    //   });

    //   if (error) {
    //     return callback({
    //       error: Errors.INVALID_PAYLOAD,
    //       errorDetails: mapErrorDetails(error.details),
    //     });
    //   }

    //   value.id = uuid();

      // persist the entity
      try {
        await fleetRepository.save(payload);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      // acknowledge the creation
      callback({
        data: payload,
      });

      // notify the other users
      socket.broadcast.emit("fleet:created", payload);
    },

    readFleet: async function (
      id: FleetID,
      callback: (res: Response<IFleet>) => void
    ) {
    //   const { error } = idSchema.validate(id);

    //   if (error) {
    //     return callback({
    //       error: Errors.ENTITY_NOT_FOUND,
    //     });
    //   }

      try {
        const fleet = await fleetRepository.findById(id);
        callback({
          data: fleet,
        });
      } catch (e) {
        callback({
          error: sanitizeErrorMessage(e),
        });
      }
    },

    updateFleet: async function (
      payload: IFleet,
      callback: (res?: Response<void>) => void
    ) {
      // @ts-ignore
      const socket: Socket<ClientEvents, ServerEvents> = this;

    //   const { error, value } = todoSchema.tailor("update").validate(payload, {
    //     abortEarly: false,
    //     stripUnknown: true,
    //   });

    //   if (error) {
    //     return callback({
    //       error: Errors.INVALID_PAYLOAD,
    //       errorDetails: mapErrorDetails(error.details),
    //     });
    //   }

      try {
        await fleetRepository.save(payload);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      callback();
      socket.broadcast.emit("fleet:updated", value);
    },

    deleteFleet: async function (
      id: FleetID,
      callback: (res?: Response<void>) => void
    ) {
      // @ts-ignore
      const socket: Socket<ClientEvents, ServerEvents> = this;

    //   const { error } = idSchema.validate(id);

    //   if (error) {
    //     return callback({
    //       error: Errors.ENTITY_NOT_FOUND,
    //     });
    //   }

      try {
        await fleetRepository.deleteById(id);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      callback();
      socket.broadcast.emit("fleet:deleted", id);
    },

    listFleets: async function (callback: (res: Response<IFleet[]>) => void) {
      try {
        callback({
          data: await fleetRepository.findAll(),
        });
      } catch (e) {
        callback({
          error: sanitizeErrorMessage(e),
        });
      }
    },
  };
}
