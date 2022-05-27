import { ValidationErrorItem } from "joi";
import { IFleet, FleetID } from "../modules/fleet-management/fleet.repository";

interface Error {
  error: string;
  errorDetails?: ValidationErrorItem[];
}

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export interface ServerEvents {
  "fleet:stored": (fleet: IFleet) => void;
//   "fleet:updated": (fleet: Fleet) => void;
//   "fleet:deleted": (id: FleetID) => void;
}

export interface ClientEvents {
  "fleet:index": (callback: (res: Response<IFleet[]>) => void) => void;

  "fleet:store": (
    payload: IFleet,
    callback: (res: Response<FleetID>) => void
  ) => void;

  "fleet:show": (id: FleetID, callback: (res: Response<IFleet | null>) => void) => void;

//   "fleet:update": (
//     payload: IFleet,
//     callback: (res?: Response<void>) => void
//   ) => void;

//   "fleet:delete": (id: FleetID, callback: (res?: Response<void>) => void) => void;
}
