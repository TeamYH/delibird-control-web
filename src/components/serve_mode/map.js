import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROS2D from '../ros/ros2d.js';
import {request} from '../../utils/axios';
import { ThumbDownSharp } from '@material-ui/icons';
/* global createjs */
/* global THREE */

class Map extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = null;

    this.state = {
      width:0,
      height:0,
      //image: null,
      pose: [{}],
    }
  }

  getTableData = async() => {
    var res = await request('GET', '/delibird_db/table_list');
    this.setState({
      pose: res
    });
    console.log(this.state.pose)
  }

  rosMapData = () => {
    var ros = new ROSLIB.Ros({
      url: 'ws://3.36.45.215:9090'
    });

    var mapTopic = new ROSLIB.Topic({
      ros : ros,
      name : '/map',
      messageType : 'nav_msgs/MapMetaData'
    });
    var _this = this;
    
    mapTopic.subscribe(function(message) {
      _this.setState(()=>{
        return {height: message.info.height};
      })
      _this.setState(()=>{
        return {width: message.info.width};
      })
      console.log("sssssssssssssssssssss")
      console.log(message.info.width)
      console.log(message.info.height)
      mapTopic.unsubscribe();
    });
    var viewer = new ROS2D.Viewer({
      divID: 'map',
      width: this.state.width*2.5,
      height: this.state.height*2.5,
    });

    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      // Use this property in case of continuous updates
      continuous: false
    });
    // Scale the canvas to fit to the map
    gridClient.on(function () {
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });

    var costmapClient = new ROS2D.OccupancyGridClientCostmap({
      ros: ros,
      rootObject: viewer.scene,
      continuous: false
    });

    costmapClient.on(function(){
      viewer.scaleToDimensions(costmapClient.currentGrid.width, costmapClient.currentGrid.height);
      viewer.shift(costmapClient.currentGrid.pose.position.x, costmapClient.currentGrid.pose.position.y);
    })
    console.log(this.state.pose)
    if(this.state.pose){
      const aLoop = this.state.pose.map((unit, idx) => {
          
        var tableMarker = new ROS2D.TablePosition({
          size : 0.25,
          strokeSize : 0.1,
          pulse: false,
          fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65),
        });

        var tableText = new createjs.Text("Table" + idx, "bold 0.3px Verdana");
        tableText.x = unit.pos_x - 0.8;
        tableText.y = -unit.pos_y - 0.6;
        gridClient.rootObject.addChild(tableText);

        tableMarker.x = unit.pos_x;
        tableMarker.y = -unit.pos_y;
        tableMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
          unit.angle_x,
          unit.angle_y,
          unit.angle_z,
          unit.angle_w
        )).z * -180 / 3.14159;

        gridClient.rootObject.addChild(tableMarker);
      });
    }


    var robotMarker = new ROS2D.RobotPosition({
      size: 0.25,
      strokeSize: 0.1,
      pulse: true,
      fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
    });
    var robotCreateFunc = function (handlerToCall, discriminator, robotMarker) {
      return discriminator.subscribe(function (pose) {

        robotMarker.x = pose.pose.pose.position.x;
        robotMarker.y = -pose.pose.pose.position.y;
        robotMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
          pose.pose.pose.orientation.x,
          pose.pose.pose.orientation.y,
          pose.pose.pose.orientation.z,
          pose.pose.pose.orientation.w
        )).z * -180 / 3.14159;
        gridClient.rootObject.addChild(robotMarker);
      })
    }
    var robotLocationListener = new ROSLIB.Topic({
      ros: ros,
      name: '/odom',
      messageType: 'nav_msgs/Odometry'
    });
    gridClient.rootObject.addChild(robotMarker);
    robotCreateFunc('subscribe', robotLocationListener, robotMarker);


  }
  componentDidUpdate = () =>{
    var ros = new ROSLIB.Ros({
      url: 'ws://15.165.36.17:9090'
    });
    console.log(this.state.height)
    var viewer = new ROS2D.Viewer({
      divID: 'map',
      width: this.state.width*3,
      height: this.state.height*3,
    });

    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      // Use this property in case of continuous updates
      continuous: false
    });
    // Scale the canvas to fit to the map
    gridClient.on(function () {
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });

    var costmapClient = new ROS2D.OccupancyGridClientCostmap({
      ros: ros,
      rootObject: viewer.scene,
      continuous: false
    });

    costmapClient.on(function(){
      viewer.scaleToDimensions(costmapClient.currentGrid.width, costmapClient.currentGrid.height);
      viewer.shift(costmapClient.currentGrid.pose.position.x, costmapClient.currentGrid.pose.position.y);
    })
    console.log(this.state.pose)
    if(this.state.pose){
      const aLoop = this.state.pose.map((unit, idx) => {
          
        var tableMarker = new ROS2D.TablePosition({
          size : 0.25,
          strokeSize : 0.1,
          pulse: false,
          fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65),
        });

        var tableText = new createjs.Text("Table" + idx, "bold 0.3px Verdana");
        tableText.x = unit.pos_x - 0.8;
        tableText.y = -unit.pos_y - 0.6;
        gridClient.rootObject.addChild(tableText);

        tableMarker.x = unit.pos_x;
        tableMarker.y = -unit.pos_y;
        tableMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
          unit.angle_x,
          unit.angle_y,
          unit.angle_z,
          unit.angle_w
        )).z * -180 / 3.14159;

        gridClient.rootObject.addChild(tableMarker);
      });
    }


    var robotMarker = new ROS2D.RobotPosition({
      size: 0.25,
      strokeSize: 0.1,
      pulse: true,
      fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
    });
    var robotCreateFunc = function (handlerToCall, discriminator, robotMarker) {
      return discriminator.subscribe(function (pose) {

        robotMarker.x = pose.pose.pose.position.x;
        robotMarker.y = -pose.pose.pose.position.y;
        robotMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
          pose.pose.pose.orientation.x,
          pose.pose.pose.orientation.y,
          pose.pose.pose.orientation.z,
          pose.pose.pose.orientation.w
        )).z * -180 / 3.14159;
        gridClient.rootObject.addChild(robotMarker);
      })
    }
    var robotLocationListener = new ROSLIB.Topic({
      ros: ros,
      name: '/amcl_pose',
      messageType: 'geometry_msgs/PoseWithCovarianceStamped'
    });
    gridClient.rootObject.addChild(robotMarker);
    robotCreateFunc('subscribe', robotLocationListener, robotMarker);
  }

  componentDidMount = async() => {
    const script = document.createElement("script");

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js";
    script.async = true;

    document.body.appendChild(script);
    //setTimeout(()=> 500);

    await this.getTableData();
    
    this.rosMapData();
    
  }

  render() {
    return (
      <div id="map">

      </div>
    );
  }
}
export default Map;