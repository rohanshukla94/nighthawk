import ROSLIB from 'roslib';
import EventEmitter from 'events';

export class RosManager {



    //TODO fix this
    //     this.cmd_vel = new ROSLIB.Message();
    //     this.odom_pose = new ROSLIB.Message();
    //     this.amcl_pose = new ROSLIB.Message();
    //     this.costmap_tf_msg = new ROSLIB.Message(); 

    //     // Define OpenCV Output Matrix Var
    //     this.cv_helper = new cv_helper();
    //     this.local_map_mat  = new cv.Mat();
    //     this.static_map_mat = new cv.Mat();
    //     this.global_map_mat = new cv.Mat();

    //     // Define VirtualWall API Var and Output Messages
    //     this.wall_list = [];
    //     this.clearWallClient = new ROSLIB.Service();
    //     this.virtualWallClient = new ROSLIB.Service();
    //     this.deleteWallClient  = new ROSLIB.Service();

    constructor(public io: EventEmitter, public ros: ROSLIB.Ros, public odom: string, public amcl: string, public cmdVel: string, public staticCostmap: string, public globalCostmap: string, public localCostmap: string, public tf: string, public movebase: string){}
}