import React from 'react';
import {
  Container,
  Grid,
  // Box,
  // Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Fund from './Fund';
import TotalCommission from './Total_commission';
import TotalPoints from './TotalPoints';
import Api from '../../../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `${Api.background.theme}`,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  root1: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },

}));


const Dashboard = () => {
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Fund />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPoints />
          </Grid> 

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCommission />
          </Grid>

          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <DrawFund />
          </Grid> */}
    
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Withdraw />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Commissionfund />
          </Grid> */}

        
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCashIN />
          </Grid> */}
{/* 
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>  */}
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>  */}
        </Grid>
      </Container>   
    </Page> 
  );
};

export default Dashboard;
