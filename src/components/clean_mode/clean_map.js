import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROS2D from '../ros/ros2d.js';
/* global createjs */
/* global THREE */

class Clean_Map extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = null;

    this.state = {
      image: null,
    }
  }

  componentDidMount = () => {
    const script = document.createElement("script");

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js";
    script.async = true;

    document.body.appendChild(script);
    this.rosMapData();
  }

  rosMapData = () => {
    var ros = new ROSLIB.Ros({
      url: 'ws://15.165.36.17:9090'
    });

    var viewer = new ROS2D.Viewer({
      divID: 'map',
      width: 800,
      height: 750,
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
      console.log(gridClient.currentGrid.width, gridClient.currentGrid.height)
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      console.log(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y)
      viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });
    
    var cleanforPath = new ROSLIB.Topic({
        ros: ros,
        name: '/path_planning_node/cleaning_plan_nodehandle/cleaning_path',
        messageType: 'nav_msgs/Path'
    });

    cleanforPath.subscribe(function(message) {
        var path = new ROS2D.PathShape({
          ros: ros,
          strokeSize : 0.01,
          path: message
        });
        console.log(message.poses);
        gridClient.rootObject.addChild(path);
        cleanforPath.unsubscribe();
    });

    var cleanPastPath = new ROSLIB.Topic({
      ros: ros,
      name: '/clean_robot/passed_path',
      mesageType: 'nave_msgs/Path'
    });

    cleanPastPath.subscribe(function(message) {
      var path = new ROS2D.PathShape({
        ros: ros,
        strokeSize : 0.3,
        path: message,
        strokeColor: createjs.Graphics.getRGB(0, 0, 255, 0.65)
      });
      console.log(message.poses);
      gridClient.rootObject.addChild(path);
      cleanPastPath.unsubscribe();
    });

    // gridClient.rootObject.addChild(path);

    var costmapClient = new ROS2D.OccupancyGridClientCostmap({
      ros: ros,
      rootObject: viewer.scene,
      continuous: false
    });

    costmapClient.on(function(){
      console.log(costmapClient.currentGrid.width, costmapClient.currentGrid.height)
      viewer.scaleToDimensions(costmapClient.currentGrid.width, costmapClient.currentGrid.height);
      console.log(costmapClient.currentGrid.pose.position.x, costmapClient.currentGrid.pose.position.y)
      viewer.shift(costmapClient.currentGrid.pose.position.x, costmapClient.currentGrid.pose.position.y);
    })

    var robotMarker = new ROS2D.RobotPosition({
      size: 0.25,
      strokeSize: 0.1,
      pulse: false,
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
        )
        ).z * -180 / 3.14159;
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
export default Clean_Map;
