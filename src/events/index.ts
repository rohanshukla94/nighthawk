import { Fleet, FleetID } from "./todo-management/todo.repository";
import { ValidationErrorItem } from "joi";

interface Error {
  error: string;
  errorDetails?: ValidationErrorItem[];
}

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export interface ServerEvents {
  "fleet:created": (fleet: Fleet) => void;
  "fleet:updated": (fleet: Fleet) => void;
  "fleet:deleted": (id: FleetID) => void;
}

export interface ClientEvents {
  "fleet:list": (callback: (res: Response<Fleet[]>) => void) => void;

  "fleet:create": (
    payload: Omit<Fleet, "id">,
    callback: (res: Response<FleetID>) => void
  ) => void;

  "fleet:read": (id: FleetID, callback: (res: Response<Fleet>) => void) => void;

  "fleet:update": (
    payload: Fleet,
    callback: (res?: Response<void>) => void
  ) => void;

  "fleet:delete": (id: FleetID, callback: (res?: Response<void>) => void) => void;
}
