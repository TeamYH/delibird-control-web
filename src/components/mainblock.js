import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../css/mainblock.css';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';

class Mainblock extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  gotoControl = () =>{
    window.location.replace('/robot/');
  }

  render() { 
    return ( 
      <div className="mainblock-size">
        <span className="button-position">
          <button className="robot-button" onClick={() => this.gotoControl()}>로 봇</button>
        </span>
        <span className="button-position">
          <button className="config-button">설 정</button>
        </span>
      </div>
    );
  }
}

export default withRouter(Mainblock);