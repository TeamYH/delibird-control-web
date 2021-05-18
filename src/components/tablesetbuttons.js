import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class TableSetButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <div><Button>위치 지정</Button></div>
        <div><Button>저 장</Button></div>
      </div>
    );
  }
}
export default TableSetButtons;