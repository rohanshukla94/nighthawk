import { constants } from "./constants";
import { EventEmitter } from "events";
import { IConnect } from "../interfaces/connect-options";
import ROSLIB from "roslib";

class Connection {

    public rosInstance: ROSLIB.Ros | undefined;
    public connected = false;
    public connectSchedule = false;
    constructor(public client: EventEmitter, public options: IConnect) {

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

    getInstance() {
        if (this.connected) {
            return Promise.resolve(this.rosInstance);
        }
        return new Promise(function (resolve) {
            this.client.once(constants.EVENT_CONNECTED, resolve);
        });
    }


}