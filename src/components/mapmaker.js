import React, { Component } from 'react';
import 'latest-createjs';
import ROSLIB from 'roslib';
import ROS2D from './ros/ros2d.js';
/* global createjs */
/* global THREE */



class MapMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }


  componentDidMount = () =>{
    this.rosMapData();
  }


  rosMapData = () => {
    var ros = new ROSLIB.Ros({
      url : 'ws://15.165.50.106:9090'
    });
    
    // // Create the main viewer.
    // var viewer = new ROS2D.Viewer({
    //   divID : 'map',
    //   width : 600,
    //   height : 500
    // });
    
    // // Setup the map client.
    // var gridClient = new ROS2D.OccupancyGridClient({
    //   ros : ros,
    //   rootObject : viewer.scene,
    //   continuous: true,
    // });
    // // Scale the canvas to fit to the map
    // gridClient.on('change', function(){
    //   viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    // });
    var viewer = new ROS2D.Viewer({
      divID : 'map',
      width : 800,
      height : 750,
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
    
    var robotMarker = new ROS2D.NavigationArrow({
        size : 0.25,
        strokeSize : 0.05,
        pulse: true,
        fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
    });
    
    gridClient.rootObject.addChild(robotMarker);
    
    var tfClient = new ROSLIB.TFClient({
      ros : ros,
      fixedFrame : 'map',
      angularThres : 0.01,
      transThres : 0.01
    });
    
    function tf_sub_func(tf) {
      console.log(tf);
      robotMarker.x = tf.translation.x;
      robotMarker.y = -tf.translation.y;
      robotMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
            tf.rotation.x,
            tf.rotation.y,
            tf.rotation.z,
            tf.rotation.w
            )
        ).z * -180 / 3.14159;
    }
    
    tfClient.subscribe('base_footprint', tf_sub_func);
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
