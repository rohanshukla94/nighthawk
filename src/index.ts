import { createServer } from "http";
import { createApplication } from "./app";
import { FleetRepository } from "./modules/fleet-management/fleet.repository";
import express from 'express';


const app: express.Express = express();
const httpServer = createServer(app);

createApplication(
  httpServer,
  {
    fleetRepository: new FleetRepository(),
  },
  {
    cors: {
      origin: "*",
    },
  }
);

httpServer.listen(3000, () => {
    console.log('connected on 3000');
});
