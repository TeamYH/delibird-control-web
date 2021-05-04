import React, { Component } from 'react';
import '../css/mainblock.css';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';

class Mainblock extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  gotoControl = () => {
    
  }

  render() { 
    return ( 
      <div className="mainblock-size">
          <span className="button-position">
            <button onClick={() => {this.props.history.push('/robot')}} className="robot-button" >로 봇</button>
          </span>
        <span className="button-position">
          <button className="config-button">설 정</button>
        </span>
      </div>
    );
  }
}

export default withRouter(Mainblock);