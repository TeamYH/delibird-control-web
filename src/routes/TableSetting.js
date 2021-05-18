import React from 'react';
import Frame from '../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import Map from '../components/map';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Orders from '../components/orders';
import Paper from '@material-ui/core/Paper';
import TableSetButtons from '../components/tablesetbuttons';

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

export default function TableSetting() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Frame pagetitle="테이블 지정" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing = {3} direction="row" justify="center" alignItems="stretch">
            <Grid>
              <Map />
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <TableSetButtons />
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

