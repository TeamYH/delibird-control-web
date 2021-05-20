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
        pos_x: 0,
        pos_y: 0,
        angle: 0,
    }
  }

  saveData = async(data) =>{
    var data = {
      pos_x: parseInt(this.state.pos_x),
      pos_y: parseInt(this.state.pos_y), 
      angle: parseInt(this.state.angle), 
    };
    console.log(qs.stringify(data));

    var res = await request('POST', '/delibird_db/table_list?'+ qs.stringify(data));
    console.log(res);
  }

  setXpos = (e) =>{
    this.setState({pos_x: e.target.value});
    console.log(this.state);
  }

  setYpos = (e) =>{
    this.setState({pos_y: e.target.value});
    console.log(this.state);
  }

  setAngle = (e) =>{
    this.setState({angle: e.target.value});
    console.log(this.state);
  }



  render() { 
    const {classes} = this.props;
  return (
      <div>
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
                <TextField id="outlined-basic" name="pos_x" value={this.state.pos_x} onChange={this.setXpos} label="x-pos" variant="outlined"/>
                <TextField id="outlined-basic" name="pos_y" value={this.state.pos_y} onChange={this.setYpos} label="y-pos" variant="outlined" />
                <TextField id="outlined-basic" name="angle" value={this.state.angle} onChange={this.setAngle} label="angle" variant="outlined" />
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