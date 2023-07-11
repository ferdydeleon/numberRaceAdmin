import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  makeStyles
} from '@material-ui/core';
// import Api from '../../../Api';

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


  // function handleClick() {
  //   window.location.href = Api.history.page;
  // }
  
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

    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
