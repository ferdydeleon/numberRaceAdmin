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
        {/* <Button className={classes.exportButton}>
          Generate Reportdd
        </Button> */}
       {/*  <Button
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
          <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h5"
                // style={{color: "red"}}
                >Event Income </Typography>
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
