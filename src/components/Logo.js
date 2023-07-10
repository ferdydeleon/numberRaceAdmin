import React from 'react';
import {

  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  IMAGE: {
  width: "3%",
  ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      width: '20%',
    },
    
}}));

// width: "4%",
//  ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
//   width: "10%",
const Logo = (props) => {
  const classes = useStyles();

  return (
    <img
      alt="Logo"
      src="/static/logo140.png"
     className={classes.IMAGE}
      {...props}
    />

    
  );
};

export default Logo;
