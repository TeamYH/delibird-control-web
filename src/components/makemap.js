import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Keypress from './keypress';
import MapMaker from '../components/mapmaker';
import '../css/makemap.css';
import ROSLIB from 'roslib';
import Grid from '@material-ui/core/Grid';

class MakeMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        msg: '',
        isStart: false,
        isManual: false,
    }
  }
  
  onStart = () =>{
    this.setState({isStart: true, msg: 'makemap'});
    this.Rosdata();
  }

  onStartManual = () =>{
    this.setState({isStart: true, isManual: true, msg: 'makemap'})
    this.Rosdata();
  }

  onStop = () =>{
    this.setState({isStart: false, isManual: false, msg: 'mapsave'});
    this.Rosdata();
  }

  Rosdata = () => {

    var ros = new ROSLIB.Ros({
      url : 'ws://15.165.50.106:9090'
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
    console.log(_this.state.msg);
    var map_msg = new ROSLIB.Message({
      data : this.state.msg  
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
                    <Button onClick={this.onStop} className="button-pos" variant="contained" color="secondary">지도 생성 종료</Button>
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
                <div className="button-pos">
                  <Button onClick={this.onStartManual} className="button-pos" variant="contained" color="primary">지도 생성 시작 (수동)</Button>
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