import React from 'react';
import Frame from '../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import Clean_Map from '../components/clean_mode/clean_map';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CleanOrders from '../components/clean_mode/cleanOrders';
import Paper from '@material-ui/core/Paper';

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

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Clean(props) {
  const classes = useStyles();
  console.log(props.location.state.isAdmin);

  return (
    <div className={classes.root}>
      <Frame isAdmin={props.location.state.isAdmin} pagetitle="청 소" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
            <Grid>
              <Clean_Map />
            </Grid>
             {/* Recent Orders */}
            <Grid item>
              <Paper className={classes.paper}>
                <CleanOrders mode="clean"/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
  );
}

