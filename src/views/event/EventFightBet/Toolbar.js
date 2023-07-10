import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  Card,
  CardContent,
  makeStyles,
  Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useParams} from "react-router-dom";
import Api from '../../../Api';
import Color from '../../../utils/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-h4':{
      color: Color.green,
    },
  },
  importButton: {
    marginRight: theme.spacing(1)
  }, 
  exportButton: {
    marginRight: theme.spacing(1)
  },
  
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
 var {title,fightNo, win} = useParams();


 function handleClick() {
  window.location.href = Api.history.page;
}

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Box
        display="flex"
        justifyContent="flex-end"
      >

      </Box> */}
        
      <Button variant="contained"  style={Api.Back_button}
         startIcon={<ArrowBackIosIcon />} onClick={handleClick}>Back</Button>
      <Box mt={3}>
        <Card>
        <CardContent >
        <Typography variant="h4" > Event Title: {title}</Typography>
        <Typography variant="h5"> Declare Win: {win}</Typography>
        <Typography variant="h5"> Fight Number: {fightNo}</Typography>
        </CardContent>
        </Card>
      </Box> 

    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
