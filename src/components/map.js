import React, { Component, createRef } from 'react';
import ROSLIB from 'roslib';
import ROS2D from './ros/ros2d.js';


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

  rosMapData = () =>{

    var ros = new ROSLIB.Ros({
      url : 'ws://15.165.50.106:9090'
    });

    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID : 'map',
      width : 600,
      height : 500,
    });

    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
      ros : ros,
      rootObject : viewer.scene
    });
    // Scale the canvas to fit to the map
    gridClient.on('change', function(){
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    });
  }

  render() { 
    return ( 
      <div id="map">
        
      </div>
    );
  }
}
export default Map;