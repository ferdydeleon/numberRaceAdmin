import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import EventDeal from './EventDeal';
import Toolbar from './Toolbar';
import Api from '../../../Api';
 
const useStyles = makeStyles((theme) => ({
  root: {
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
      title="Event Deal"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <EventDeal />
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
