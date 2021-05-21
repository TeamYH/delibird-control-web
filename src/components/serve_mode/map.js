import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROS2D from '../ros/ros2d.js';
/* global createjs */
/* global THREE */

class Map extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = null;

    this.state = { 
      image: null,
    }
  }

  componentDidMount = () =>{
    this.rosMapData();
  }

  rosMapData = () => {
    var ros = new ROSLIB.Ros({
      url : 'ws://15.165.36.17:9090'
    });

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
    // Scale the canvas to fit to the map
    gridClient.on(function() {
      console.log(gridClient.currentGrid.width, gridClient.currentGrid.height)
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      console.log(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y)
      viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });
    
    var robotMarker = new ROS2D.NavigationArrowMakeMap({
      size : 0.25,
      // size : 100,
      strokeSize : 0.05,
      pulse: true,
      fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
    });
    var robotCreateFunc = function (handlerToCall, discriminator, robotMarker) {
      return discriminator.subscribe(function(pose){

        robotMarker.x = pose.pose.pose.position.x;
        robotMarker.y = -pose.pose.pose.position.y;
        // console.log(robotMarker.x)
        // console.log(robotMarker.y)
        var quaZ = pose.pose.pose.orientation.z;
        var degreeZ = 0;
        if( quaZ >= 0 ) {
          degreeZ = quaZ / 1 * 180
        }
        else {
          degreeZ = (-quaZ) / 1 * 180 + 180
        };
        robotMarker.rotation = -degreeZ + 35;
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

  render() { 
    return ( 
      <div id="map">
        
      </div>
    );
  }
}
export default Map;