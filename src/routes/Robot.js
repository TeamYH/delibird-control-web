import React, { Component } from 'react';
import Nav from '../components/nav';
import Map from '../components/map';


class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
          <Nav></Nav>
          <Map></Map>
      </div>
    );
  }
}
export default Robot;