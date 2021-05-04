import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'roslib';
import Title from './title';
import '../css/orders.css';
import ROSLIB from 'roslib';
import { ThumbDownSharp } from '@material-ui/icons';

class Keypress extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            rows:[
            ],
            msg:"",
    }}
    // data = "";
    
    Rosdata = () => {

        var ros = new ROSLIB.Ros({
            url : 'ws://localhost:9090'
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
            name : '/key_press',
            messageType : 'key_press/msg'
          });
          var _this = this
          console.log(_this.state.msg)
          var pressing_key = new ROSLIB.Message({
            data : this.state.msg  
          });
          rostopic.publish(pressing_key);    

    }

    handleKeyUp= (event) =>{
        // console.log(event.key);
        var _this = this
        if(event.key == 'ArrowDown'){
            console.log('ArrowDown')
            _this.setState(() => {
                return {msg: "[[B"};
              });
            this.Rosdata();
        }else if(event.key == 'ArrowLeft'){
            console.log('ArrowLeft')
            _this.setState(() => {
                return {msg: "[[C"};
              });
            this.Rosdata();
        }else if(event.key == 'ArrowRight'){
            console.log('ArrowRight')
            _this.setState(() => {
                return {msg: "[[D"};
              });
            this.Rosdata();
        }else if(event.key == 'ArrowUp'){
            console.log('ArrowUp')
            _this.setState(() => {
                return {msg: "[[A"};
              });
            this.Rosdata();

        }
        
    };
    
    render(){
    return(
        <div>
            <input type="text" id="one" onKeyUp={this.handleKeyUp} />
        </div>
        );
    }
}
export default Keypress;