import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Edit from './Edit';
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
      title="Update Platinum"
    >
      <Container maxWidth="lg">
        <Toolbar />
        <Box mt={3}>
          <Edit />
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
