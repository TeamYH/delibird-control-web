import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROS2D from './ros/ros2d.js';
import NAV from './ros/NAV'
/* global createjs */
/* global THREE */

class MakeTableMap extends Component {
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
        url : 'ws://15.165.50.106:9090'
      });
  
      // Create the main viewer.
      var viewer = new ROS2D.Viewer({
        divID : 'map',
        width : 700,
        height : 600,
        // draw_opt : this.draw_opt,
      });
  
      var nav = NAV.OccupancyGridClientNav({
        ros : ros,
        rootObject : viewer.scene,
        viewer : viewer,
        continuous: true,
        serverName : '/move_base',
        withOrientation : true
      });
    
    var robotMarker = new ROS2D.NavigationArrow({
      // size : 0.25,
      size : 100,
      strokeSize : 0.05,
      pulse: true,
      fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
    });
    
    var robotCreateFunc = function (handlerToCall, discriminator, robotMarker) {
      return discriminator.subscribe(function(pose){
        robotMarker.x = pose.pose.pose.position.x;
        robotMarker.y = -pose.pose.pose.position.y;
        var quaZ = pose.pose.pose.orientation.z;
        var degreeZ = 0;
        if( quaZ >= 0 ) {
          degreeZ = quaZ / 1 * 180
        }
        else {
          degreeZ = (-quaZ) / 1 * 180 + 180
        };
        robotMarker.rotation = -degreeZ + 35;
        gridClient.rootObject.addChildAt(robotMarker);
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
export default MakeTableMap;