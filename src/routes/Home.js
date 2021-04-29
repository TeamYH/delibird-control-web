import React, { Component } from 'react';
import Nav from '../components/nav';
import Mainblock from '../components/mainblock';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="Home">
        <Nav></Nav>
        <Mainblock></Mainblock>
      </div>
    );
  }
}
export default Home;