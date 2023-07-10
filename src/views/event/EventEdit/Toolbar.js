import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  CardContent,
  Card,
  // Button,
  makeStyles
} from '@material-ui/core';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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

//  const  handleClick = () => {
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
      {/* <Button variant="contained" style={Api.Back_button} 
       startIcon={<ArrowBackIosIcon />} onClick={handleClick}>Back</Button> */}

      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">
              Update Event
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
