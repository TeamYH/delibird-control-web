import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import '../../css/makemap.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {request} from '../../utils/axios';
import qs from 'qs';
import ConfirmModal from '../common/confirm_modal';

const useStyles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

class TableSetModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalOpen: false,
        tableid:0,
        pos_x: 0,
        pos_y: 0,
        angle_z: 0,
        angle_w: 0,
    }
  }

  saveData = async(data) =>{
    var data = {
      id : this.state.tableid,
      pos_x : this.props.pose.pos_x,
      pos_y : this.props.pose.pos_y,
      angle_w : this.props.pose.angle_w,
      angle_z : this.props.pose.angle_z,
    };
    console.log(qs.stringify(data));

    var res = await request('POST', '/delibird_db/table_list?'+ qs.stringify(data));
    console.log(res);
    this.setState({modalOpen: true});
  }

  setXpos = (e) =>{
    this.setState({pos_x: e.target.value});
    // console.log(this.state);
  }

  setYpos = (e) =>{
    this.setState({pos_y: e.target.value});
    // console.log(this.state);
  }

  setWAngle = (e) =>{
    this.setState({angle_w: e.target.value});
    // console.log(this.state);
  }

  setZAngle = (e) =>{
    this.setState({angle_z: e.target.value});
    // console.log(this.state);
  }

  setID = (e) =>{
    this.setState({tableid: e.target.value});
    // console.log(this.state);
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
  }


  render() { 
    const {classes} = this.props;
    console.log(this.props.pose);

  return (
      <div>
        <ConfirmModal open={this.state.modalOpen} close={this.closeModal} msg={'저장되었습니다.'}></ConfirmModal>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={this.props.open}
          onClose={this.props.close}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.props.open}>
            <div className={classes.paper}>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" name="pos_x" value={this.props.pose.pos_x} onChange={this.setXpos} label="pos_x" variant="outlined"/>
                <TextField id="outlined-basic" name="pos_y" value={this.props.pose.pos_y} onChange={this.setYpos} label="pos_y" variant="outlined" />
                <TextField id="outlined-basic" name="angle_z" value={this.props.pose.angle_z} onChange={this.setWangle} label="angle_z" variant="outlined" />
                <TextField id="outlined-basic" name="angle_w" value={this.props.pose.angle_w} onChange={this.setZangle} label="angle_w" variant="outlined"/>
                <TextField id="outlined-basic" name="TableNum" value={this.state.tableid} onChange={this.setID} label="테이블 번호" variant="outlined"/>
              </form>
              <div className="btn-pose" >
                <Button className="btn-pose" variant="contained" color="primary" onClick={this.saveData}>저장</Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
export default withStyles(useStyles)(TableSetModal);