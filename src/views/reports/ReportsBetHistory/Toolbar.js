import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import Api from '../../../Api';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  var { user ,title} = useParams();

  function handleClick() {
    window.location.href = Api.history.page;
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
 
     <Button variant="contained" style={Api.Back_button}
         startIcon={<ArrowBackIosIcon />} onClick={handleClick}>Back</Button>
  
    <Box mt={3}>
        <Card>
          <CardContent>
          <Typography variant="h4">
            Event Name: {title}
            </Typography>
            {/* <Typography variant="h5">
               Declare Winner: {win}
            </Typography> */}
            <Typography variant="h5">
               Bet History: ({user})
            </Typography>
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
