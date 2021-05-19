import React, { useState } from 'react';
import Frame from '../../components/frame';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import UserTable from '../../components/admin/member/user_table';
import NewAccountModal from '../../components/admin/member/new_account_modal';
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
  const [modal, setModal] = useState(false);

  return (
    <div className={classes.root}>
      <NewAccountModal open={ modal }  title="Create a chat room">
            
      </NewAccountModal>
      <Frame pagetitle="고객 관리" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing = {0} direction="row" justify="center" alignItems="stretch">
            <Grid item xs={12}>
              <div className={classes.buttongroup}>
                <Button className={classes.button} variant="contained" color="default" onClick={() => {setModal(true)}}>생성</Button>
              </div>
              <UserTable />
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
  );
}

