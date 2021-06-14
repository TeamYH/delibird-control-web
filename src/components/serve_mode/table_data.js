import React, { Component } from 'react';
import {request} from '../../utils/axios';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import '../../css/makemap.css';
import ROSLIB from 'roslib'

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    margin: 10,
    border: '1px solid white',
    backgroundColor: '#3f51b56b',
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    fontWeight: 600,
    fontSize: '35px',
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});


class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  componentDidMount = () =>{
  }

navigation = (pos) =>{
  // var coords = stage.globalToRos(pos.pos_x, pos.pos_y);
    var ros = new ROSLIB.Ros({
      url : 'ws://3.35.77.32:9090'

    });
      var goal = new ROSLIB.Topic({
        ros: ros,
        name : '/move_base_simple/goal',
        messageType : 'geometry_msgs/PoseStamped'
    });
    var orientation = new ROSLIB.Quaternion({x:0, y:0, z:pos.angle_z, w:pos.angle_w});
          var pose = new ROSLIB.Pose({
        position : new ROSLIB.Vector3({x:pos.pos_x, y:pos.pos_y,z:0}),
         orientation : orientation

      });   
      //console.log(pose)
    var goal_msg = new ROSLIB.Message({
          header : {
            frame_id : "map"
        },
                pose  
              });

      goal.publish(goal_msg); 
  
  if(pos.id === 0 ){
    this.props.statewait();
  }
  else{
    this.props.stateserve();
  }

  // console.log('ps' +pos.pos_x);
  
}

  render() {
    const {classes} = this.props;
    //console.log(this.props.data);
    const pose = this.props.data;
      return(
        <div>
          {/* {
          pose.map((pos) => (
            <ButtonBase
              focusRipple
              key={pos.id}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: pos.width,
              }}
            >
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {pos.id}
                  <span className={classes.imageMarked} />
                </Typography>
                </span>
              </ButtonBase>
          ))} */}
          {pose.map((pos)=>{
            if(pos.id === 0){return(
              <div className="btn-pose">
                <Button className="btn-pose" variant="contained" color="primary" onClick={() => this.navigation(pos)}>대기 위치</Button>
              </div>
            );}  
            else{return(
              <div className="btn-pose">
                <Button className="btn-pose" variant="contained" color="primary" onClick={() => this.navigation(pos)}>{pos.id}</Button>
              </div>
            );}
          })}
        </div>
      );
  }
}
export default withStyles(useStyles)(TableData);