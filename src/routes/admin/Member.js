import React, { Component } from 'react';
import Frame from '../../components/frame';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import UserTable from '../../components/admin/member/user_table';
import NewAccountModal from '../../components/admin/member/new_account_modal';
import Button from '@material-ui/core/Button';


const useStyles = theme => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    marginLeft: 15,
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  buttongroup: {
    marginBottom: 5,
  },

  button: {
    marginRight: 5,
  },

});

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: false,
      rows: [],
    }
  }

  openModal = () =>{
    this.setState({modalOpen: true});
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
  }

  dataReceive = (data) =>{
    this.setState({rows: this.state.rows.concat(data)});
  }

  render() { 
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <NewAccountModal open={ this.state.modalOpen } close={this.closeModal} dataReceive={this.dataReceive}  title="Create a new Account" />
        <Frame isAdmin={this.props.location.state.isAdmin} pagetitle="고객 관리" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <Grid container spacing = {0} direction="row" justify="center" alignItems="stretch">
              <Grid item xs={9}>
                <div className={classes.buttongroup}>
                  <Button className={classes.button} variant="contained" color="default"  onClick={this.openModal}>생성</Button>
                </div>
                <UserTable rows={this.state.rows}/>
              </Grid>
            </Grid>
            <Box pt={4}>
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles)(Member);


