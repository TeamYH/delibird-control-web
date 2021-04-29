import React, { Component } from 'react';
import Login from '../components/login';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="Home">
        <div class="banner">
          <a href="/">
            <span class="blind">Delibird</span>
          </a>
        </div>
        <Login></Login>
      </div>
    );
  }
}
export default LoginPage;