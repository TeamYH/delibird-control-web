import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';
import Paper from '@material-ui/core/Paper';
import '../css/orders.css';
import ROSLIB from 'roslib';
import { ThumbDownSharp } from '@material-ui/icons';

class Keypress extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            rows:[
            ],
            msg :'5',
    }}
    // data = "";
    
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
            name : '/key_press',
            messageType : 'std_msgs/String'
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
                return {msg: '2'};
              });
            this.Rosdata();
        }else if(event.key == 'ArrowLeft'){
            console.log('ArrowLeft')
            _this.setState(() => {
                return {msg: '3'};
              });
            this.Rosdata();
        }else if(event.key == 'ArrowRight'){
            console.log('ArrowRight')
            _this.setState(() => {
                return {msg: '4'};
              });
            this.Rosdata();
        }else if(event.key == 'ArrowUp'){
            console.log('ArrowUp')
            _this.setState(() => {
                return {msg:'1'};
              });
            this.Rosdata();

        }
        else if(event.key == 'Shift'){
          console.log('Shift')
          _this.setState(() => {
              return {msg: '5'};
            });
          this.Rosdata();

      }
        
    };
    
    render(){
      console.log(this.props.isManual);
      if(this.props.isManual == true)
        return(
            <div>
              <Paper>
                <input type="text" id="one" onKeyUp={this.handleKeyUp} />
              </Paper>
            </div>
            );
        else
        return(
          <div/>
        );
        }
      
}
export default Keypress;