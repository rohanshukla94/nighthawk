import EventEmitter from "events";
import ROSLIB from "roslib";
const EventEmitter2 = require("eventemitter2");

import { Connection } from "./connection";
import { constants } from "./constants";

export class Topic {

    constructor(public client: typeof EventEmitter2, public connection: Connection){}

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

    async publish(name:string, messageType: string, payload: any) {
        return this.connection.getInstance().then(function (ros) {
            let topic = new ROSLIB.Topic({
                ros: ros,
                name: name,
                messageType: messageType
            });
            let message = new ROSLIB.Message(payload);
            topic.publish(message);
        });
    }

    async subscribe(name:string, messageType: string, throttleRate: number, handler: any) {
        let signature = this.getSignature(name, messageType);
        if (signature in this.registeredTopics) {
            // Push to existing handlers
            this.registeredTopics[signature].handlers.push(handler);
        } else {
            // Create handler array and start topic subscription
            this.registeredTopics[signature] = {
                options: { name: name, messageType: messageType },
                listener: undefined,
                handlers: [handler]
            };
            this.connectAndListen(name, messageType, throttleRate, signature);
        }
        let index = this.registeredTopics[signature].handlers.indexOf(handler);
        if (index !== -1) {
            this.registeredTopics[signature].handlers.splice(index, 1);
            // Close the topic, because no handlers are left
            if (!this.registeredTopics[signature].handlers.length && this.registeredTopics[signature].listener) {
                this.registeredTopics[signature].listener.unsubscribe();
                this.registeredTopics[signature].listener = null;
            }
        }
        // return index;
        
    }
    
    this.client.on(constants.EVENT_DISCONNECTED, function () {
        // Dispose all topic listeners (not handlers!)
        for (this.signature in this.registeredTopics) {
            let topic = this.registeredTopics[this.signature];
            if (topic.listener) {
                topic.listener.unsubscribe();
                topic.listener = null;
            }
        }
    });

    this.client.on(constants.EVENT_CONNECTED, function (ros) {
        // Reconnect disconnected handlers
        for (this.signature in this.registeredTopics) {
            let topic = this.registeredTopics[this.signature];
            if (topic.listener === null && topic.handlers.length) {
                this.listen(ros, topic.options.name, topic.options.messageType, this.signature);
                topic.listener = null;
            }
        }
    });


}