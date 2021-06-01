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
import TableAddButton from './table_add_button'
import {request} from '../../utils/axios';
import qs from 'qs';
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
    marginTop: 20,
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class MakeTableMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isStart: false,
      msgtype: 0,
      modalOpen: false,
      pose: {
        id: 0,
        pos_x:0,
        pos_y:0,
        angle_W:0,
        angle_z:0,
      },
      pose_id_before : 0
      ,
      rootObject : null,
      table_list : [],
      table_object_list : [],
      text_object_list : [],
    }
  }


  componentDidMount = () =>{
    // this.rosMapData();
    const script = document.createElement("script");

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js";
    script.async = true;

    document.body.appendChild(script);

    // this.getTabledata();
  }

  // getTabledata = async() =>{
  //   var res = await request('GET', '/delibird_db/table_list');
  //   this.setState({table_list: res});
  //   console.log(res);
  // }

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
      var rootObject = viewer.scene || new createjs.Contianer();
      var stage;
      if (rootObject instanceof createjs.Stage) {
        stage = rootObject;
      } else {
        stage = rootObject.getStage();
      }
      this.setState({rootObject:rootObject})
    
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
    save_goal.subscribe(function(goal) {
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
        }
    });
  }

  deleteTableMarker = (data) =>{
    console.log(data)
    const aLoop = this.state.table_object_list.map((unit, idx) => {
      if(idx == data){
        this.state.rootObject.removeChild(unit);
        this.setState({table_object_list: this.state.table_object_list.filter(item => item !== unit)});
      }
    });
    const bLoop = this.state.text_object_list.map((unit, idx) => {
      if(idx == data){
        this.state.rootObject.removeChild(unit);
        this.setState({text_object_list: this.state.text_object_list.filter(item => item !== unit)});
      }
    });
  }

  dataUpdate = (data) =>{
    console.log(data)
    this.setState({table_list : this.state.table_list.concat(data)});
    var tableMarker = new ROS2D.TablePosition({
      size : 0.25,
      strokeSize : 0.1,
      pulse: false,
      fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65),
    });

    var tableText = new createjs.Text("Table" + data.id, "bold 0.25px Verdana");
    tableText.x = data.pos_x - 0.8;
    tableText.y = -data.pos_y - 0.6;
    this.state.rootObject.addChild(tableText);
    this.setState({text_object_list:this.state.text_object_list.concat(tableText)})

    tableMarker.x = data.pos_x;
    tableMarker.y = -data.pos_y;
    tableMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
      data.angle_x,
      data.angle_y,
      data.angle_z,
      data.angle_w
    )).z * -180 / 3.14159;

    this.state.rootObject.addChild(tableMarker);
    this.setState({table_object_list:this.state.table_object_list.concat(tableMarker)})
    console.log(this.setState.table_object_list)
  }

  opentable = () =>{
    this.rosMapData(1);
    this.setState({isStart: true});
  }

  closetable = () =>{
    this.rosMapData(2);
    this.setState({isStart: false});
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

  tableDelete = (id) =>{
    console.log('실행됨');
    this.setState({table_list: this.state.table_list.filter(item => item.id !== id)});
  }

  saveData = async(data) =>{
    
    // data.map( async(item) => {
    //   var request_data ={
    //     id : item.id,
    //     pos_x : item.pos_x,
    //     pos_y : item.pos_y,
    //     angle_x : item.angle_x,
    //     angle_y : item.angle_y,
    //     angle_w : item.angle_w,
    //     angle_z : item.angle_z,
    //   }
    //   var res = await request('POST', '/delibird_db/table_list?'+ qs.stringify(request_data));
    //   console.log(res);
    // });
    var res = await request('POST', '/delibird_db/table_list', data);
    console.log(res);
  }

  render() { 
    const {classes} = this.props;
    return (
      <div>
        <TableSetModal 
          open={ this.state.modalOpen } 
          close={ this.closeModal } 
          pose={this.state.pose} 
          dataUpdate = {this.dataUpdate} 
        />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
            <Grid>
              <div id="map" />
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <TableSetButtons 
                  isStart={this.state.isStart} 
                  opentable={this.opentable} 
                  closetable={this.closetable} 
                  openmodal={this.openModal}
                />
              </Paper>
              <TableAddButton 
                isStart={this.state.isStart} 
                deleteTableMarker={this.deleteTableMarker} 
                tableDelete={this.tableDelete} 
                saveData={this.saveData} 
                table_list = {this.state.table_list} 
              />
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