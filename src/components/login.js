import React, { Component } from 'react';
import '../css/login.css';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <form>
            <input
              className="inputbox"
              type="text"
              placeholder="ID"
              name="account"
              required
            ></input>
            
            <br></br>
            <input
              className="inputbox"
              type="password"
              placeholder="Password"
              name="password"
              required
            ></input>
            <br></br>
            <input type="submit" value="로그인" className="signbtn"></input>
          </form>
      </div>
    );
  }
}
export default Login;