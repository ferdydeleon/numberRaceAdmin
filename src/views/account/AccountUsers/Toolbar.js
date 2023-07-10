import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  Card,
  CardContent,
/*   TextField,
  InputAdornment,
  SvgIcon, */
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
      
        {/* <Button
          color="primary"
          variant="contained"
        >
          Generate Report
        </Button> */}
      </Box>
      <Box mt={3}>
        <Card >
          <CardContent  >
          <Typography variant="h4">
          Users
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
