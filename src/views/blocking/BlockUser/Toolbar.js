import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
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
 
   localStorage.getItem('name')
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
    {/*     <Button className={classes.importButton}>
          Import
        </Button> */}
 {/*        <Button className={classes.exportButton}>
          Generate Report
        </Button>
        <Button
          color="primary"
          variant="contained"
          href='/app/platinum/create'
          >
            Add Platinum
        </Button> */}
      </Box>
    <Box mt={3}>
        <Card>
          <CardContent>
          <Typography variant="h4">
          {localStorage.getItem('name')} 
            </Typography>
            <Typography variant="h4">
            Block Users
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
