import { EventEmitter } from "events";

type EventsEmitted = Record<string | symbol, (...args: any) => any>;

export declare interface TypedEventEmitter<Events extends EventsEmitted> {

    on<E extends keyof Events>(
        event: E, listener: Events[E]
    ): this;

    emit<E extends keyof Events>(
        event: E, ...args: Parameters<Events[E]>
      ): boolean;
    } 
}

export class TypedEventEmitter<Events extends EventsEmitted> extends EventEmitter {}