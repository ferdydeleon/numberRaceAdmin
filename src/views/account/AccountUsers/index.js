
import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Users from './Users';
import Toolbar from './Toolbar';
import Api from '../../../Api';
 
const useStyles = makeStyles((theme) => ({
  root: {
   // backgroundColor: theme.palette.background.dark,
    background: `${Api.background.theme}`,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ViewUsers = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Merchant Users"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Users/>
        </Box>
      </Container>
    </Page>
  );
};

export default ViewUsers;



