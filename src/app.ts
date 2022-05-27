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
    storeFleet,
    showFleet,
    // updateFleet,
    // deleteFleet,
    indexFleets,
  } = createFleetHandlers(components);

  io.on("connection", (socket) => {
    socket.on("fleet:store", storeFleet);
    socket.on("fleet:show", showFleet);
    // socket.on("fleet:update", updateFleet);
    // socket.on("fleet:delete", deleteFleet);
    socket.on("fleet:index", indexFleets);
  });

  return io;
}
