import React, { Component } from 'react';
import '../css/login.css';
import {Link} from "react-router-dom";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const account = e.target.account.value;
    const password = e.target.password.value;

    console.log(account, password);

    if(account === 'delibird' && password === '1234'){
      window.location.replace('/home/');
    }
    else{
      alert("아이디 혹은 패스워드 오류");
    }

  }

  render() { 
    return ( 
      <div>
        <form onSubmit={this.handleSubmit}>
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