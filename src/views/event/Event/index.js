import React from 'react';
import {
  Box, 
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import List from './List';
import Toolbar from './Toolbar';
import Api from '../../../Api';
// import { Typography } from '@material-ui/core';
 
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
  //const Updatepending = Api.STAFF_USER.STAFF.filter(item => item.username === Api.request.username);
  //const access_viewing_event_list = Updatepending.map(val => val.viewing_event_list) == 1;
  return (
    //access_viewing_event_list == true ? 
    <Page
      className={classes.root}
      title="Event"
    >
       <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <List />
        </Box>
      </Container>
    </Page>
    // : window.location.href = '/app/page/error'
    
  );
};

export default EventView;
