import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Create from './Create';
import Color from '../../../utils/colors'
// import Api from '../../../Api';
const useStyles = makeStyles((theme) => ({
  root: {
     background: Color.MainBackground,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
})); 

const SettingsCreateUsers = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
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

export default SettingsCreateUsers;
