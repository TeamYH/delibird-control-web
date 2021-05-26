import React from 'react';
import MakeMapButton  from '../components/make_map/makemapbutton';
import Frame from '../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
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
}));

export default function RobotSet(props) {
  const classes = useStyles();
  var isAdmin;
  if(props.location.state.isAdmin === undefined){
    isAdmin = props.isAdmin;
  }
  else{
    isAdmin = props.location.state.isAdmin;
  }
  
  return (
    <div className={classes.root}>
      <Frame isAdmin={isAdmin} pagetitle="딜리버드 관리" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <MakeMapButton isAdmin={isAdmin}/>
          </Box>
        </Container>
      </main>
    </div>
  );
}