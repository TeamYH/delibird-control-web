import React, {Component} from 'react';
import Frame from '../../components/frame';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Counsel from '../../components/admin/counsel/counsel_data';
import {request} from '../../utils/axios';



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
    textAlign: '-webkit-center',
    maxWidth: '85%',
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  counsel: {
    maxWidth: '85%',
  },
});

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [{}],
    }
  }

  componentDidMount = () =>{
    this.getData();
  }

  getData = async() =>{
    var res = await request('GET', '/superuser_db/counsel_list');
    console.log(res);
    this.setState({data: res});
  }

  render() { 
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <Frame isAdmin={this.props.location.state.isAdmin} pagetitle="상담 요청" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
              <Counsel className={classes.counsel} data={this.state.data}/>
            </Grid>
            <Box pt={4}>
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles)(Support);