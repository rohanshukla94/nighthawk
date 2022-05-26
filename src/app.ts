import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { ClientEvents, ServerEvents } from "./events";
import { FleetRepository } from "./modules/fleet-management/fleet.repository";
import createFleetHandlers from "./modules/fleet-management/fleet.handlers";

export interface Components {
  fleetRepository: FleetRepository;
}

export function createApplication(
  httpServer: HttpServer,
  components: Components,
  serverOptions: Partial<ServerOptions> = {}
): Server<ClientEvents, ServerEvents> {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions);

  const {
    createFleet,
    readFleet,
    updateFleet,
    deleteFleet,
    listFleets,
  } = createFleetHandlers(components);

  io.on("connection", (socket) => {
    socket.on("fleet:create", createFleet);
    socket.on("fleet:read", readFleet);
    socket.on("fleet:update", updateFleet);
    socket.on("fleet:delete", deleteFleet);
    socket.on("fleet:list", listFleets);
  });

  return io;
}
