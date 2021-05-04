import React, { Component, createRef } from 'react';
import Mapfile from '../data/map.png';


class Map extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = null;

    this.state = { 
    }
  }

  componentDidMount() {
    this.onLoadImage();
  }

  onLoadImage = () => {
    this.ctx = this.canvasRef.current.getContext('2d');

    var mapObj = new Image();
    mapObj.src = '../data/map.png';
    mapObj.onload = () => {
      this.ctx.drawImage(mapObj, 0, 0, 380, 380);
    }
  }

  render() { 
    return ( 
      <div>
        <div className="image-sample">
          {/* <img src={Mapfile}></img> */}
          <canvas ref={this.canvasRef} />
        </div>
      </div>
    );
  }
}
export default Map;