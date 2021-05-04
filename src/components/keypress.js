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

class Keypress extends Component{
    constructor(props) {
        super(props);
        this.state = { 
        rows:[],
    }}

    Rosdata = () => {
        let status = {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
        }
    }

    handleKeyUp= (event) =>{
        console.log(event.key);
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