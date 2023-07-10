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
  root1: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  // const Updatepending = Api.STAFF_USER.STAFF.filter(item => item.username === Api.request.username);
  // const access_viewing_event_list = Updatepending.map(val => val.viewing_event_list) == 1;

  return (

  //  access_viewing_event_list == true ? 
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
              Event List
            </Typography>
          </CardContent>
        </Card>
      </Box> </div>
    
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
