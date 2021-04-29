import React, { Component } from 'react';
import '../css/mainblock.css';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';

class Mainblock extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }


  render() { 
    return ( 
      <div className="mainblock-size">
        <Link to="/robot">
          <span className="button-position">
            <button className="robot-button" >로 봇</button>
          </span>
        </Link>
        <span className="button-position">
          <button className="config-button">설 정</button>
        </span>
      </div>
    );
  }
}

export default withRouter(Mainblock);