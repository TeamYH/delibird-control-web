import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import '../../css/makemap.css';
import TableSetModal from './table_set_modal';


class TableAddButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: false,
    }
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
  }

  onRemove = (item, idx) =>{
    this.props.tableDelete(item.id);
    this.props.deleteTableMarker(idx);
  }

  render() {
    var list = this.props.table_list;
    console.log(list);
    if(list === undefined){
      return(<div></div>)
    }
    return ( 
      <div>
        {list.map((item, idx) => {
          return(
            <div className="data-pose">
              <span className="btn-pose" >테이블 번호 : {item.id}</span>
              <span className="remove-button" ><Button  variant="contained" color="primary" onClick={() => this.onRemove(item,idx)}>삭제</Button></span>
            </div>
          );
        })}
        <div className="btn-pose" ><Button className="btn-pose" variant="contained" color="primary" onClick={this.props.opentable}>저장</Button></div>
      </div>
    );
  }
}
export default TableAddButton;