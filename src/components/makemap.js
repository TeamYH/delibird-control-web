import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Keypress from './keypress';
import '../css/makemap.css';
import ROSLIB from 'roslib';

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
        this.setState({isStart: true});
    }

    onStartManual = () =>{
        this.setState({isStart: true, isManual: true})
    }

    onStop = () =>{
        this.setState({isStart: false, isManual: false});
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
        var _this = this
        console.log(_this.state.msg)
        var map_msg = new ROSLIB.Message({
            data : this.state.msg  
        });
        rostopic.publish(map_msg);
    }

    render() { 
        let isStart = this.state.isStart;

        if(isStart == true){
            return(
                <div>
                    <Container className="button-container" maxWidth="sm">
                        <Button onClick={this.onStop} className="button-pos" variant="contained" color="secondary">지도 생성 종료</Button>
                        <Keypress isManual={this.state.isManual}/>
                    </Container>
                </div>
            )
        }

        else
            return (
                <div>
                    <Container className="button-container" maxWidth="sm">
                        <Button onClick={this.onStart} className="button-pos" variant="contained" color="primary">지도 생성 시작</Button>
                        <Button onClick={this.onStartManual} className="button-pos" variant="contained" color="primary">지도 생성 시작 (수동)</Button>
                    </Container>
                </div>
            );
    }
}
export default MakeMap;