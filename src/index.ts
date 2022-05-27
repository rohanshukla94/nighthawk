import { createServer } from "http";
import { createApplication } from "./app";
import { FleetRepository } from "./modules/fleet-management/fleet.repository";

const httpServer = createServer();

createApplication(
  httpServer,
  {
    fleetRepository: new FleetRepository(),
  },
  {
    cors: {
      origin: ["http://localhost:4200"],
    },
  }
);

httpServer.listen(3000);
