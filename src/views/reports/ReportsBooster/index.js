import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Income from './view';
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

const ReportsIncome= () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Booster Income"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Income />
        </Box>
      </Container>
    </Page>
  );
};

export default ReportsIncome;
