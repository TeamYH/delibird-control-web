import React, { Component } from 'react';
import 'latest-createjs';
import ROSLIB from 'roslib';
import ROS2D from '../ros/ros2d.js';
/* global createjs */
/* global THREE */



class MapMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }


  componentDidMount = () =>{
    const script = document.createElement("script");

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js";
    script.async = true;

    document.body.appendChild(script);
    this.rosMapData();
  }


  rosMapData = () => {
    var ros = new ROSLIB.Ros({
      url : 'ws://3.36.45.215:9090' //server 1
    });

    var viewer = new ROS2D.Viewer({
      divID : 'map',
      width : 800,
      height : 500,
    });
    
    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
      ros : ros,
      rootObject : viewer.scene,
      // Use this property in case of continuous updates
      continuous: true
    });
    //
    // Scale the canvas to fit to the map
    gridClient.on('change', function() {
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });
    
    var robotMarker = new ROS2D.RobotPosition({
        size : 0.25,
        strokeSize : 0.05,
        //pulse: true,
        //fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
    });
    
    // gridClient.rootObject.addChild(robotMarker);
    var robotCreateFunc = function (handlerToCall, discriminator, robotMarker) {
      return discriminator.subscribe(function (pose) {

        robotMarker.x = pose.pose.pose.position.x;
        robotMarker.y = -pose.pose.pose.position.y;
        robotMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
          pose.pose.pose.orientation.x,
          pose.pose.pose.orientation.y,
          pose.pose.pose.orientation.z,
          pose.pose.pose.orientation.w
        )
        ).z * -180 / 3.14159;
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

  render() { 
    return ( 
      <div id="map">

      </div>
    );
  }
}
export default MapMaker;

// // Connect to ROS.
