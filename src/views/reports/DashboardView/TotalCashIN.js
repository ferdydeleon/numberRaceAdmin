import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Api from '../../../Api';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  //LinearProgress,
  Typography,
  makeStyles,
  Button,
  colors
} from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MoneyIcon from '@material-ui/icons/Money';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 36,
    width: 36
  } 
}));

const TotalPlayer = ({ className, ...rest }) => {
  const classes = useStyles();

  const [TotalCashIN, setTotalCashIn] = useState([]);
/* const [merchant, setMerchant] = useState(''); */

useEffect(() => { 
  axios.get(`${Api.request.URL}/api/v2/company/total/cashin`,{
    headers:{
        'Authorization': `Bearer ${Api.request.token}`
    }
  }).then(res => {
    console.log(res.data.data.data)
    // setTotalCashIn(res.data.data.data.totalCashin);
    // setTotalCashIn(res.data.data.data);
    res.data.data.data.map((row) => {
      setTotalCashIn(row.totalCashin.toLocaleString()); 
    })
});
}, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Current
          </Typography>

            <Typography
             color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL AUTO CASHIN POINTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Php <b style={{color: "red"}}>{TotalCashIN}</b>
            </Typography>

        
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href="/app/account/players/"
        >
          View all
        </Button>
         {/*  <LinearProgress
            value={75.5}
            variant="determinate"
          /> 
        </Box> */}
      </CardContent>
    </Card>
  );
};

TotalPlayer.propTypes = {
  className: PropTypes.string
};

export default TotalPlayer;
