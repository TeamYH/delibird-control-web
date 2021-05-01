import React, { Component } from 'react';
import Login from '../components/login';
import '../css/delibird.css';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="Home">
        <Login></Login>
      </div>
    );
  }
}
export default LoginPage;