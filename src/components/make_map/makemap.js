import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Keypress from './keypress';
import MapMaker from './mapmaker';
import '../../css/makemap.css';
import ROSLIB from 'roslib';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';

class MakeMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isStart: false,
        isManual: false,
    }
  }
  
  onStart = () =>{
    var msg = 'mapstart';
    this.setState({isStart: true});
    this.Rosdata(msg);
  }

  onSave = () =>{
    var msg = 'mapsave';
    this.setState({isStart: true});
    this.Rosdata(msg);
  }

  onStartManual = () =>{
    var msg = 'mapmanual';
    this.setState({isStart: true, isManual: true});
    this.Rosdata(msg);
  }

  onStop = () =>{
    var msg = 'mapstop';
    this.setState({isStart: false, isManual: false});
    this.Rosdata(msg);
    

  }

  Rosdata = (msg) => {

    var ros = new ROSLIB.Ros({
      url : 'ws://15.165.36.17:9090'
    });
    ros.on('connection', function() {
      console.log('Connected to websocket server.');
    });
    
    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', function() {
      console.log('Connection to websocket server closed.');
    });
    
      // Publishing a Topic
      // ------------------
    var rostopic = new ROSLIB.Topic({
      ros : ros,
      name : '/web_signal',
      messageType : 'std_msgs/String'
    });
    var _this = this;
    console.log(msg);
    var map_msg = new ROSLIB.Message({
      data : msg 
    });
    rostopic.publish(map_msg);
  }

  render() {
    let isStart = this.state.isStart;

    if(isStart === true){
      return(
        <div>
          <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
            <Grid>
              <MapMaker />
            </Grid>
            {/* Recent Orders */}
            <Grid item >
                <Container className="button-container" maxWidth="sm">
                  <div className="button-pos">
                    <Link to={{pathname: "/robot/settings", state: {isAdmin: this.props.isAdmin}}}>
                      <Button onClick={this.onStop} className="button-pos" variant="contained" color="secondary">지도 생성 종료</Button>
                    </Link>
                  </div>
                  <div className="button-pos">
                    <Button onClick={this.onSave} className="button-pos" variant="contained" color="primary" startIcon={<SaveIcon/>}>지도 저장</Button>
                  </div>
                <Keypress isManual={this.state.isManual}/>
              </Container>
            </Grid>
          </Grid>
        </div>
        )
      }

    else{
      return (
        <div>
          <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
            <Grid>
              <div className="box" />
            </Grid>
            {/* Recent Orders */}
            <Grid item >
              <Container className="button-container" maxWidth="sm">
                <div className="button-pos">
                  <Button onClick={this.onStart} className="button-pos" variant="contained" color="primary">지도 생성 시작</Button>
                </div>
              </Container>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
export default MakeMap;