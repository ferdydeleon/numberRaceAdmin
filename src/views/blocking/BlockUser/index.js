import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import View from './View';
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

const PlayerView = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Platinum Players"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <View />
        </Box>
      </Container>
    </Page>
  );
};

export default PlayerView;
