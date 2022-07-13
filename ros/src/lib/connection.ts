import { constants } from "./constants";
import { EventEmitter2 } from "eventemitter2";
import { IConnect } from "../interfaces/connect-options";
import ROSLIB from "roslib";

export class Connection {

    public rosInstance: ROSLIB.Ros | undefined;
    public connected = false;
    public connectSchedule = false;
    constructor(public client: EventEmitter2, public options: IConnect) {

    }

    connect() {

        this.connectSchedule = false;

        this.rosInstance = new ROSLIB.Ros({
            url: this.options.url
        });
        this.rosInstance.on("close", this.onFail);
        this.rosInstance.on("error", this.onFail);
        this.rosInstance.on("connection", this.onSuccess);

    }
    onFail() {
        if (this.connected) {
            this.client.emit(constants.EVENT_DISCONNECTED)
        }

        this.connected = false;


        if (!this.connectSchedule) {
            this.connectSchedule = true;
            setTimeout(this.connect, this.options.reconnectInterval);
        }
    }

    onSuccess() {
        if (this.connected) {
            // Already in connected state...
            return;
        }
        this.connected = true;
        this.client.emit(constants.EVENT_CONNECTED, this.rosInstance);

    }

    close() {
        if (this.rosInstance) {
            this.connectSchedule = true;
            this.rosInstance.close();
        }
    }

    //TODO Refactor

    async getInstance(): Promise<ROSLIB.Ros> {
        if (this.connected) {
            return this.rosInstance;
        }
        return new Promise(function (resolve: any) {
            this.client.once(constants.EVENT_CONNECTED, resolve);
        });
    }


}