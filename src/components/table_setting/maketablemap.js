import React, { Component } from 'react';
import ROSLIB from 'roslib';
import ROS2D from '../ros/ros2d.js';
import NAV2D from '../ros/nav2d';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableSetButtons from './tablesetbuttons';
import TableSetModal from './table_set_modal';
import NAV from '../ros/NAV'

/* global createjs */
/* global THREE */

const useStyles = theme => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class MakeTableMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msgtype: 0,
      modalOpen: false,
      pose: {
        id: 0,
        pos_x:0,
        pos_y:0,
        angle_W:0,
        angle_z:0,
      }
    }
  }

  componentDidMount = () =>{
    // this.rosMapData();
  }

  rosMapData = (msgtype) => {

    var ros = new ROSLIB.Ros({
        url : 'ws://15.165.36.17:9090'
        //url : 'ws://15.165.50.106:9090'
      });
  
      // Create the main viewer.
      var viewer = new ROS2D.Viewer({
        divID : 'map',
        width : 700,
        height : 600,
      });
  
      var nav = NAV2D.OccupancyGridClientNav({
        ros : ros,
        rootObject : viewer.scene,
        viewer : viewer,
        continuous: true,
        serverName : '/move_base',
        withOrientation : true
      });
    
    if(msgtype === 1){
      var rostopic = new ROSLIB.Topic({
        ros : ros,
        name : '/web_signal',
        messageType : 'std_msgs/String'
      });
      var opentable = new ROSLIB.Message({
        data : 'opentable',
      }, console.log('opentable', nav));
      rostopic.publish(opentable);
    }

    if(msgtype === 2){
      var rostopic = new ROSLIB.Topic({
        ros : ros,
        name : '/web_signal',
        messageType : 'std_msgs/String'
      });
      var closetable = new ROSLIB.Message({
        data : 'closetable',
      }, console.log('closetable'));
      rostopic.publish(closetable);
    }
    var save_goal = new ROSLIB.Topic({
      ros: ros,
      name : '/goal_signal',
      messageType : 'geometry_msgs/PoseStamped'
    });

    var pose = this;
    let tmp_pose = {
      id: 0,
      pos_x:0,
      pos_y:0,
      angle_x:0,
      angle_y:0,
      angle_w:0,
      angle_z:0,
    }

    // var save_goal_to_back = function(handlerToCall, discriminator){
    //   return discriminator.subscribe(function(goal){
    //     console.log(goal);
    //     if(goal){
    //       tmp_pose.pos_x = goal.pose.position.x;
    //       tmp_pose.pos_y = goal.pose.position.y;
    //       tmp_pose.angle_w = goal.pose.orientation.w;
    //       tmp_pose.angle_z = goal.pose.orientation.z;
          
    //       pose.setState(() => {
    //         return { pos: [tmp_pose] };
    //         })
    //     }
    //     // discriminator.unsubscribe();
    //   })

    // }
    save_goal.subscribe(function(goal) {
              console.log(goal);
        if(goal){
          tmp_pose.pos_x = goal.pose.position.x;
          tmp_pose.pos_y = goal.pose.position.y;
          tmp_pose.angle_x = goal.pose.orientation.x;
          tmp_pose.angle_y = goal.pose.orientation.y;
          tmp_pose.angle_w = goal.pose.orientation.w;
          tmp_pose.angle_z = goal.pose.orientation.z;
          
          pose.setState(() => {
            return { modalOpen:true, pose: tmp_pose }; 
            });
          console.log(pose.state);
        }

    })
  }

  opentable = () =>{
    this.rosMapData(1);
  }

  closetable = () =>{
    this.rosMapData(2);
  }

  openmodal = () =>{
    this.setState({openModal: true});
  }

  openModal = () => {
    this.setState({modalOpen: true});
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
  }

  render() { 
    const {classes} = this.props;
    return (
      <div>
        <TableSetModal open={ this.state.modalOpen } close={ this.closeModal } pose={this.state.pose}></TableSetModal>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
            <Grid>
              <div id="map" />
              {/* <div id="nav" /> */}
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <TableSetButtons opentable={this.opentable} closetable={this.closetable} openmodal={this.openModal}/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </div>
    );
  }
}
export default withStyles(useStyles)(MakeTableMap);