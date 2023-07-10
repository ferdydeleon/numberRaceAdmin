import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import View from './View';
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

const FundView = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Request Fund"
    >
      <Container maxWidth={false}>
      {/*   <Toolbar /> */}
        <Box mt={3}>
          <View />
        </Box>
      </Container>
    </Page>
  );
};

export default FundView;
