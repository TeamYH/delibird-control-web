import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../title';

class RobotConnectTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      rows:[],

    }
  }

  

  render() { 
    console.log(this.props.rows);
    var row = this.props.rows;
    return ( 
      <div>
        <React.Fragment>
      <Title>딜리버드 목록</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>메모</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <TableRow>
              <TableCell>{row.serial}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.memo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="seeMore">
        
      </div>
    </React.Fragment>
      </div>
    );
  }
}

export default RobotConnectTable;