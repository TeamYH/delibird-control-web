import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import '../../css/makemap.css';
import TableSetModal from './table_set_modal';


class TableSetButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: false,
    }
  }

  

  closeModal = () =>{
    this.setState({modalOpen: false});
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