import React, { Component, createRef } from 'react';
import Mapfile from '../data/map.png';
import {Stage, Layer, Image} from 'react-konva';
import useImage from 'use-image';




class Map extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = null;

    this.state = { 
      image: null,
    }
  }

  componentDidMount() {
    this.onLoadImage();
  }

  componentWillMount(){
    // this.image.removeEventListener('load', this.handleLoad);
  }

  onLoadImage = () => {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({image: this.image});
  }

  render() { 
    return ( 
      <div>
        <Image
          x={this.props.x}
          y={this.props.y}
          image={this.state.image}
          ref={node=> {this.imageNode = node;}}
        />
      </div>
    );
  }
}
export default Map;