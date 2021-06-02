import React, { Component } from 'react';
import '../css/login.css';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
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
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const account = e.target.account.value;
    const password = e.target.pw.value;

    if(account === 'delibird' && password === '1234'){
      sleep(1500);
      this.props.history.push({
        pathname: '/home',
        state: {isAdmin: true},
      });
    }
    else if(account === 'user1' && password === '1234'){
      sleep(1500);
      this.props.history.push({
        pathname: '/home',
        state: {isAdmin: false},
      });
    }
    else{
      this.setState({isSuccess: false});
    }
  }

  render() {
    let alert = <Alert severity="error">
                  <AlertTitle><strong>로그인 에러</strong></AlertTitle>
                  <strong>아이디 혹은 비밀번호 오류 </strong>
                </Alert>;
    const {classes} = this.props; 
    return ( 
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Delibird 로그인
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
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
      </Container>
    );
  }
}
export default withStyles(useStyles)(withRouter(SignIn));
