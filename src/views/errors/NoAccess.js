import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NoAccess = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="don't have access."
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            Sorry you don't have permission to view this page. Please contact the IT for your access. Thank you!
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
           ...
          </Typography>
          {/* <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box> */}
        </Container>
      </Box>
    </Page>
  );
};

export default NoAccess;
