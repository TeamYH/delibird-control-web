import React, { Component } from 'react';
import '../css/orders.css';
import ROSLIB from 'roslib';

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
        if(event.key === 'ArrowDown'){
            console.log('ArrowDown')
            _this.setState(() => {
                return {msg: '2'};
              });
            this.Rosdata();
        }else if(event.key === 'ArrowLeft'){
            console.log('ArrowLeft')
            _this.setState(() => {
                return {msg: '3'};
              });
            this.Rosdata();
        }else if(event.key === 'ArrowRight'){
            console.log('ArrowRight')
            _this.setState(() => {
                return {msg: '4'};
              });
            this.Rosdata();
        }else if(event.key === 'ArrowUp'){
            console.log('ArrowUp')
            _this.setState(() => {
                return {msg:'1'};
              });
            this.Rosdata();

        }
        else if(event.key === 'Shift'){
          console.log('Shift')
          _this.setState(() => {
              return {msg: '5'};
            });
          this.Rosdata();

      }
        
    };
    
    render(){
      if(this.props.isManual === true)
        return(
            <div className="input-box">
                <input className="input-pos" type="text" id="one" onKeyUp={this.handleKeyUp} />
            </div>
            );
        else
        return(
          <div/>
        );
        }
      
}
export default Keypress;