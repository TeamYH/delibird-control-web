import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CleanModal from './cleanmodal';
import 'roslib';
import Title from './title';
import '../css/orders.css';
import ROSLIB from 'roslib';


class CleanOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:[
      ],
      ros: {},
      modalOpen: false,
    }
  }

  Rosdata = (func_num) => {
    
    let status = {
      id: 0,
      name: '로봇',
      memo: '로봇1',
      battery: 0,
      stat: '대기중',
    }
    var temp = this

    var ros = new ROSLIB.Ros({
      url : 'ws://15.165.36.17:9090'
    });

    ros.on('connection', function() {
      console.log('Connected to websocket server.');
      status.battery = 0;
      status.stat = '정보 없음';
      temp.setState(() => {
        return {ros: ros, rows: [status]};
      })
    });
  
    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
      status.battery = 0;
      status.stat = '정보 없음';
      temp.setState(() => {
        return {ros: ros, rows: [status]};
      })
    });

    ros.on('close', function() {
      console.log('Connection to websocket server closed.');
    });

    switch(func_num){
      case 1: 
        var batteryClient = new ROSLIB.Topic({
          ros: ros,
          name: '/battery_state',
          messageType: 'sensor_msgs/BatteryState'
        });
    
        batteryClient.subscribe(function(msg) {
          status.battery = parseInt((1-((12.3-msg.voltage)/1.3))*100);
          status.stat = '대기중';
          console.log(status);
          batteryClient.unsubscribe();
          // this.setState({rows: this.state.rows.concat({id: status.id, name:status.name, memo:status.memo, battery:status.battery, status: status.stat})});
          temp.setState(() => {
            return {ros: ros, rows: [status]};
          })
        });
      break;
      case 2: break;
      
      case 3: 
        var rostopic = new ROSLIB.Topic({
          ros : ros,
          name : '/web_signal',
          messageType : 'std_msgs/String'
        });
        var map_msg = new ROSLIB.Message({
          data : 'cleanstart' 
        });
        console.log(map_msg);
        rostopic.publish(map_msg);
      break;
      
      case 4: 
        var rostopic = new ROSLIB.Topic({
          ros : ros,
          name : '/web_signal',
          messageType : 'std_msgs/String'
        });
        var map_msg = new ROSLIB.Message({
          data : 'cleanstop' 
        });
        console.log(map_msg);
        rostopic.publish(map_msg);
      break;
    }
  }


  componentDidMount = async() => {
    this.Rosdata(1);
  }
  
  // createData = (data) => {
  //   this.setState({rows: this.state.rows.concat({id: data.id, name:data.name, memo:data.memo, battery:data.battery, status: data.status})});
  // }

  cellClick = () => {
    this.setState({modalOpen: true});
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
  }
  
  render() {
    var row = this.state.rows;
    return ( 
      <React.Fragment>
        <CleanModal  cleanStart={() => this.Rosdata(3)} cleanStop={() => this.Rosdata(4)} open={ this.state.modalOpen } close={ this.closeModal } title="Create a chat room">
            
        </CleanModal>
      <Title>딜리버드 목록</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>메모</TableCell>
            <TableCell>배터리</TableCell>
            <TableCell align="right">상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <TableRow hover key={row.id} onClick={() => this.cellClick(row.id)}>
              <TableCell>{row.id+1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.memo}</TableCell>
              <TableCell>{row.battery}%</TableCell>
              <TableCell align="right">{row.stat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="seeMore">
        
      </div>
    </React.Fragment>
    );
  }
}
export default CleanOrders;