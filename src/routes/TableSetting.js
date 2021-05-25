import React from 'react';
import Frame from '../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import MakeTableMap from '../components/table_setting/maketablemap';

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



export default function TableSetting(props) {
  const classes = useStyles();
  var isAdmin = props.location.state.isAdmin;
  return (
    <div className={classes.root}>
      <Frame isAdmin={isAdmin} pagetitle="테이블 지정" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MakeTableMap/>
      </main>
    </div>
  );
}

