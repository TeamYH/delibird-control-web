import React, { Component } from 'react';


class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    if(this.props.data === null){
      return ( 
        <div>
          <p>테이블 정보가 없습니다.</p>
        </div>
      );
    }
    else{
      return(
        <div>
          good
        </div>
      )
    }
  }
}
export default TableData;