import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Request from './Request';
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
      title="Request Convert Commission"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Request />
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
