import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


class TableSetButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }
  render() {
    
    return ( 
      <div>
        <div><Button onClick={this.props.opentable}>시 작</Button></div>
        <Link to="/robot/settings">
          <div><Button onClick={this.props.closetable}>종 료</Button></div>
        </Link>
      </div>
    );
  }
}
export default TableSetButtons;