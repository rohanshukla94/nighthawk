import EventEmitter from "events";
import ROSLIB from "roslib";
import { Connection } from "./connection";

export class Topic {

    constructor(public client: EventEmitter, public connection: Connection){}

    public registeredTopics: any = {}

    getSignature(name: string, messageType: string){
        return messageType + '/' + name;
    }

    //TODO
    listen(ros: ROSLIB.Ros, name: string, messageType: string, throttleRate: number, signature: string){

        let listener = new ROSLIB.Topic({
            ros,
            name,
            messageType,
            throttle_rate: throttleRate
        });
        this.registeredTopics[signature].listener = listener;
        this.registeredTopics[signature].listener.subscribe( (message: any) => {
            let numHandlers: any = this.registeredTopics[signature].handlers.length;
            for (let i = 0; i < numHandlers; i++) {
                this.registeredTopics[signature].handlers[i](message);
            }
        });
    }

    async connectAndListen(name: string, messageType: string, throttleRate: number, signature: string){

        let ros: ROSLIB.Ros = await this.connection.getInstance();

        this.listen(ros, name, messageType, throttleRate, signature);

    }
}