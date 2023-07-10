import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
/* import { Search as SearchIcon } from 'react-feather'; */

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

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
       {/*  <Button className={classes.importButton}>
          Import
        </Button> */}
      {/*   <Button className={classes.exportButton}>
          Generate Report
        </Button> */}
       {/*  <Button
          color="secondary"
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
            List of users attempts to withdraw more than their limit per day
            {/* From Players Withdrawal Logs to List of User trying to withdraw greater than their limits per day */}
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
