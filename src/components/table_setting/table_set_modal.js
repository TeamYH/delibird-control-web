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
import Grid from '@material-ui/core/Grid';
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
        angle_x : 0,
        angle_y : 0,
        angle_z: 0,
        angle_w: 0,
    }
  }

  saveData = async(data) =>{
    var data = {
      id : this.state.tableid,
      pos_x : this.props.pose.pos_x,
      pos_y : this.props.pose.pos_y,
      angle_x : this.props.pose.angle_x,
      angle_y : this.props.pose.angle_y,
      angle_w : this.props.pose.angle_w,
      angle_z : this.props.pose.angle_z,
    };
    this.props.dataUpdate(data);
    //console.log(qs.stringify(data));
    //var res = await request('POST', '/delibird_db/table_list?', JSON.stringify(data));
    //console.log(res);
    this.setState({modalOpen: true});
    
  }

  // setXpos = (e) =>{
  //   this.setState({pos_x: e.target.value});
  //   // console.log(this.state);
  // }

  // setYpos = (e) =>{
  //   this.setState({pos_y: e.target.value});
  //   // console.log(this.state);
  // }

  // setXAngle = (e) =>{
  //   this.setState({angle_x: e.target.value});
  //   // console.log(this.state);
  // }

  // setYAngle = (e) =>{
  //   this.setState({angle_y: e.target.value});
  //   // console.log(this.state);
  // }

  // setWAngle = (e) =>{
  //   this.setState({angle_w: e.target.value});
  //   // console.log(this.state);
  // }

  // setZAngle = (e) =>{
  //   this.setState({angle_z: e.target.value});
  //   // console.log(this.state);
  // }

  setID = (e) =>{
    this.setState({tableid: e.target.value});
    // console.log(this.state);
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
    this.props.close();
  }


  render() { 
    const {classes} = this.props;
    // console.log(this.props.pose);

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
                {/* <TextField id="outlined-basic" name="pos_x" value={this.props.pose.pos_x} onChange={this.setXpos} label="pos_x" variant="outlined"/>
                <TextField id="outlined-basic" name="pos_y" value={this.props.pose.pos_y} onChange={this.setYpos} label="pos_y" variant="outlined" />
                <TextField id="outlined-basic" name="angle_x" value={this.props.pose.angle_x} onChange={this.setWangle} label="angle_x" variant="outlined" />
                <TextField id="outlined-basic" name="angle_y" value={this.props.pose.angle_y} onChange={this.setWangle} label="angle_y" variant="outlined" />
                <TextField id="outlined-basic" name="angle_z" value={this.props.pose.angle_z} onChange={this.setWangle} label="angle_z" variant="outlined" />
                <TextField id="outlined-basic" name="angle_w" value={this.props.pose.angle_w} onChange={this.setZangle} label="angle_w" variant="outlined"/> */}
                <TextField id="outlined-basic" name="TableNum" value={this.state.tableid} onChange={this.setID} label="테이블 번호" variant="outlined"/>
              </form>
              <div className="confirm-btn-pose">
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item xs={5} justify="center">
                    <Button variant="contained" color="primary" onClick={this.saveData}>확 인</Button>
                  </Grid>
                  <Grid item xs={4} justify="center">
                    <Button variant="contained" color="primary" onClick={this.props.close}>취 소</Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
export default withStyles(useStyles)(TableSetModal);