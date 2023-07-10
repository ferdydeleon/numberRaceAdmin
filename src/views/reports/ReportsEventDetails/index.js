import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DynamicGame from './DynamicGame';
import Sabong from './Sabong';
import Dropball from './Dropball';
import Colorgame from './Colorgame';
import Toolbar from './Toolbar';
import Api from '../../../Api';
import { useParams } from "react-router-dom";

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
  var { gameCode } = useParams();


  let GAME;
  switch(gameCode) {
    case 'SABONG':
      GAME =  <Sabong />
      break;
    case 'COLOR_GAME':
      GAME =  <Colorgame />
      break;
      case 'DROP_BALL':
        GAME =  <Dropball />
        break;
    default:
      GAME =  <DynamicGame />
  }

  return (
    
    <Page
      className={classes.root}
      title="Event Details"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
         {GAME}
        </Box>
      </Container>
    </Page>
  );
};

export default EventView;
