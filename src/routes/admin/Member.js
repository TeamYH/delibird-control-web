import React from 'react';
import Frame from '../../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import RegisterForm from '../../components/register_form';
import UserTable from '../../components/user_table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


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

}));

export default function Member(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Frame pagetitle="고객 관리" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing = {0} direction="row" justify="center" alignItems="stretch">
            <Grid item xs={6}>
              <div className={classes.buttongroup}>
                <Button className={classes.button} variant="contained" color="default">수정</Button>
                <Button className={classes.button} variant="contained" color="default" onClick={props.createAccount}>생성</Button>
                <Button className={classes.button} variant="contained" color="default" >삭제</Button>
              </div>
              <UserTable />
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <RegisterForm />
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

