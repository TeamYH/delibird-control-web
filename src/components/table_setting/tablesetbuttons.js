import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import '../../css/makemap.css';


class TableSetButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isStart: false,
    }
  }
  render() {
    
    return ( 
      <div>
        <div className="btn-pose" ><Button className="btn-pose" variant="contained" color="primary" onClick={this.props.opentable}>시 작</Button></div>
        <Link to="/robot/settings">
          <div className="btn-pose" ><Button className="btn-pose" variant="contained" color="primary" onClick={this.props.closetable}>종 료</Button></div>
        </Link>
      </div>
    );
  }
}
export default TableSetButtons;