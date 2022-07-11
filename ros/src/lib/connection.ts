import { EventEmitter } from "events";
import { IConnect } from "../interfaces/connect-options";

class Connection {

    public rosInstance: ROSLIB.Ros | undefined;
    public connected = false;
    public connectSchedule = false;
    constructor(public client: EventEmitter, public options: IConnect) {
        
    }

    onFail() {
        if(this.connected){
            this.client.emit()
        }
    }
}