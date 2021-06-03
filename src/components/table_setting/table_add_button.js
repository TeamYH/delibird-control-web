import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import '../../css/makemap.css';
import TableSetModal from './table_set_modal';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ConfirmModal from '../common/confirm_modal';


const useStyles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    marginTop: 20,
    overflow: 'auto',
    flexDirection: 'column',
  },
});

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
    const {classes} = this.props;
    var list = this.props.table_list;
    console.log(list);
    if(list === undefined){
      return(<div></div>)
    }
    return ( 
      <div>
        <ConfirmModal 
          open={this.state.modalOpen}
          close={this.closeModal}
          msg={"저장되었습니다"}
        />
        {this.props.isStart === true ? 
          <div>
            <Paper className={classes.paper}>
              {list.map((item, idx) => {
              return(
                <div className="data-pose">
                  {item.id === 0 ? 
                    <span className="btn-pose" >대기 위치</span> :
                    <span className="btn-pose" >테이블 번호 : {item.id}</span>
                  }
                  <span className="remove-button" ><Button  variant="contained" color="primary" onClick={() => this.onRemove(item,idx)}>삭제</Button></span>
                </div>
              );
              })}
              <div className="btn-pose" ><Button className="btn-pose" variant="contained" color="primary" onClick={() => this.props.saveData(list)}>저장</Button></div>
            </Paper>
          </div> : 
          <div/>
        }
      </div>
    );
  }
}
export default withStyles(useStyles)(TableAddButton);