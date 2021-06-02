import React, {Component} from 'react';
import MainButton  from '../components/mainbutton';
import MainButtonAdmin from '../components/mainbutton_admin';
import {withRouter} from 'react-router-dom';
import Frame from '../components/frame';
import { withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


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
    minWidth: '85%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount= () =>{
    console.log(this.props);
    if(this.props.location.state.isAdmin === undefined && this.props.isAdmin === undefined){
      this.props.history.push('/');
    }
  }

  render() { 
    var isAdmin = this.props.location.state.isAdmin;
    
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <Frame isAdmin={isAdmin} pagetitle="Delibird" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Box pt={4}>
              {isAdmin ? <MainButtonAdmin isAdmin={isAdmin} />  : <MainButton isAdmin={isAdmin} />}
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles)(withRouter(Home));