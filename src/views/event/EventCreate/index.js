import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Create from './Create';
import Toolbar from './Toolbar';
import Api from '../../../Api';
 
const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.dark,
    background: `${Api.background.theme}`,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EventView = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Create Event"
    >
      <Container maxWidth="lg">
        <Toolbar />
        <Box mt={3}>
          <Create />
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
