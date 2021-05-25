import React, {Component} from 'react';
import Frame from '../../components/frame';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import UserTable from '../../components/admin/robot_connection/robot_table';
import RobotConnectionModal from '../../components/admin/robot_connection/delibird_connection_modal';


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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class AdminRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false, 
      rows: [
      { id: 'user1',
        password: '1234',
        phone: '01067478803',
        name: '안윤회',
        storename: '맛집',
      },],
      tables: [],
    }
  }

  openModal = () => {
    this.setState({modal: true});
  }

  closeModal = () =>{
    this.setState({modal: false});
  }

  getData = (data) => {
    this.setState({tables: this.state.tables.concat(data)});
  }

  render() { 
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <RobotConnectionModal open={this.state.modal} close={this.closeModal} getData={this.getData} tables={this.state.tables}></RobotConnectionModal>
        <Frame isAdmin={this.props.location.state.isAdmin} pagetitle="딜리버드 연동" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
              <Grid item xs={9}>
                <div className={classes.buttongroup}>
                </div>
                <UserTable openModal={this.openModal} rows={this.state.rows}  />
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
export default withStyles(useStyles)(AdminRobot);
