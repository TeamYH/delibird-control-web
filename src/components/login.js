import React, { Component } from 'react';
import '../css/login.css';
import {withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';


function sleep(ms) {
  const wakeUpTime = Date.now() + ms
  while (Date.now() < wakeUpTime) {}
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Delibird
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isSuccess : true,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const account = e.target.account.value;
    const password = e.target.pw.value;

    if(account === 'delibird' && password === '1234'){
      sleep(1500);
      this.props.history.push('/home')
    }
    else{
      this.setState({isSuccess: false});
      console.log(this.state.isSuccess);
    }
  }

  render() {
    
    let alert = <Alert severity="error">
                  <AlertTitle><strong>로그인 에러</strong></AlertTitle>
                  <strong>아이디 혹은 비밀번호 오류 </strong>
                </Alert>;
    
    return ( 
      <Grid container component="main" className="root">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="image" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Delibird
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="account"
              autoComplete="id"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="pw"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 유지"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              로그인
            </Button>
            <br/><br/>
            {this.state.isSuccess === false && alert}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          
        </div>
      </Grid>
    </Grid>
    );
  }
}
export default withRouter(Login);
