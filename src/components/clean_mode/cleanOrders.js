import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CleanModal from './cleanmodal';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import 'roslib';
import Title from '../title';
import '../../css/orders.css';
import ROSLIB from 'roslib';

class CleanOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
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
      url: 'ws://3.35.77.32:9090'

    });

    ros.on('connection', function () {
      console.log('Connected to websocket server.');
      status.battery = 0;
      status.stat = '정보 없음';
      temp.setState(() => {
        return { ros: ros, rows: [status] };
      })
    });

    ros.on('error', function (error) {
      console.log('Error connecting to websocket server: ', error);
      status.battery = 0;
      status.stat = '정보 없음';
      temp.setState(() => {
        return { ros: ros, rows: [status] };
      })
    });

    ros.on('close', function () {
      console.log('Connection to websocket server closed.');
    });

    switch (func_num) {
      case 1:
        var batteryClient = new ROSLIB.Topic({
          ros: ros,
          name: '/battery_state',
          messageType: 'sensor_msgs/BatteryState'
        });

        batteryClient.subscribe(function (msg) {
          status.battery = parseInt((1 - ((12.3 - msg.voltage) / 1.3)) * 100);
          status.stat = '대기중';
          console.log(status);
          batteryClient.unsubscribe();
          // this.setState({rows: this.state.rows.concat({id: status.id, name:status.name, memo:status.memo, battery:status.battery, status: status.stat})});
          temp.setState(() => {
            return { ros: ros, rows: [status] };
          })
        });

        var rostopic = new ROSLIB.Topic({
          ros: ros,
          name: '/web_signal',
          messageType: 'std_msgs/String'
        });
        var map_msg = new ROSLIB.Message({
          data: 'cleanmapload'
        });
        console.log(map_msg);
        rostopic.publish(map_msg);

        break;
      case 2:
        var rostopic = new ROSLIB.Topic({
          ros: ros,
          name: '/web_signal',
          messageType: 'std_msgs/String'
        });
        var map_msg = new ROSLIB.Message({
          data: 'cleanstart'
        });
        console.log(map_msg);
        status.stat = '청소중';
        status.battery = temp.state.rows[0].battery;
        temp.setState(() => {
          return { ros: ros, rows: [status] };
        })
        rostopic.publish(map_msg);

      case 3:
        var rostopic = new ROSLIB.Topic({
          ros: ros,
          name: '/web_signal',
          messageType: 'std_msgs/String'
        });
        var map_msg = new ROSLIB.Message({
          data: 'cleanclose'
        });
        console.log(map_msg);
        rostopic.publish(map_msg);

      case 4:
        var rostopic = new ROSLIB.Topic({
          ros: ros,
          name: '/web_signal',
          messageType: 'std_msgs/String'
        });
        var map_msg = new ROSLIB.Message({
          data: 'cleanstop'
        });
        status.stat = '대기중';
        status.battery = temp.state.rows[0].battery;
        temp.setState(() => {
          return { ros: ros, rows: [status] };
        })
        rostopic.publish(map_msg);
        break;
    }
  }

  componentDidMount = async () => {
    this.Rosdata(1);
  }

  cellClick = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    var row = this.state.rows;
    return (
      <React.Fragment>
        <CleanModal cleanStart={() => this.Rosdata(2)} cleanStop={() => this.Rosdata(4)} open={this.state.modalOpen} close={this.closeModal} title="clean modal">
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
                <TableCell>{row.id + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.memo}</TableCell>
                <TableCell>{row.battery}%</TableCell>
                <TableCell align="right">{row.stat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="seeMore"></div>
        <Link to={{ pathname: "/home", state: { isAdmin: false } }}>
          <div className="btn-pose" ><Button className="btn-pose" variant="contained" color="primary" onClick={() => this.Rosdata(3)}>종 료</Button></div>
        </Link>
      </React.Fragment>
    );
  }
}
export default CleanOrders;


