import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  CardContent,
  Card,
  makeStyles
} from '@material-ui/core';


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
  //   window.history.back();
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
      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">
              Event Fight
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
