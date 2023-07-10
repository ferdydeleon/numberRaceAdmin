import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  makeStyles,
  Button
} from '@material-ui/core';
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

  function handleClick() {
    window.location.href = Api.history.page;
  }
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
      </Box>
     
      <Box mt={3}>
   
      <Button variant="contained" style={Api.Back_button}
         startIcon={<ArrowBackIosIcon />} onClick={handleClick}>Back</Button>
      </Box> 

    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
