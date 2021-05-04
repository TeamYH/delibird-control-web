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


function preventDefault(event) {
  event.preventDefault();
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms
  while (Date.now() < wakeUpTime) {}
}

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:[
      ],
    }
  }
  

  Rosdata = () => {
    
    let status = {
      id: 0,
      name: '로봇',
      memo: '로봇1',
      battery: 0,
      stat: '대기중',
    }

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
  
    var batteryClient = new ROSLIB.Topic({
      ros: ros,
      name: '/battery_state',
      messageType: 'sensor_msgs/BatteryState'
    });
    var temp = this
    batteryClient.subscribe(function(msg) {
      status.battery = parseInt((1-((12.3-msg.voltage)/1.3))*100);
      console.log(status);
      batteryClient.unsubscribe();
      // this.setState({rows: this.state.rows.concat({id: status.id, name:status.name, memo:status.memo, battery:status.battery, status: status.stat})});
      temp.setState(() => {
        return {rows: [status]};
      })
    });
  }


  componentDidMount = async() => {
    this.Rosdata();
  }
  
  createData = (data) => {
    this.setState({rows: this.state.rows.concat({id: data.id, name:data.name, memo:data.memo, battery:data.battery, status: data.status})});
  }
  
  render() {
    var row = this.state.rows;
    return ( 
      <React.Fragment>
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
            <TableRow key={row.id}>
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
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
    );
  }
}
export default Orders;