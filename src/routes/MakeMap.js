import React from 'react';
import Frame from '../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MakeMap from '../components/make_map/makemap';
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

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function MakeMapPage() {
      const classes = useStyles();
      return (
        <div className={classes.root}>
          <Frame pagetitle="지도 생성" />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <MakeMap />
              <Box pt={10}>
              </Box>
            </Container>
          </main>
        </div>
      );
    }