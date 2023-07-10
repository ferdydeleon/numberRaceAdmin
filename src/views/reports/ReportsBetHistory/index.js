import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Bet from './Bet';
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

const SettingsPlayers = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Bet History"
    >

      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Bet />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsPlayers;
