import React, { Component } from 'react';


class Mainblock extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="mainblock-size">
        <button className="config"></button>
        <button className="robot"></button>
      </div>
    );
  }
}

export default Mainblock;