import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
/* import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'; */
import MoneyIcon from "@material-ui/icons/Money";
import Color from "../../../utils/colors";
import {
  fund,
} from "../../../accountingModel/dashboardData";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.blue[600],
    height: 36,
    width: 36,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

const Fund = ({ className, ...rest }) => {
  const classes = useStyles();

  const [companyFund, setFund] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const fundData = await fund();
      setFund(fundData);
    }
    fetchData()
    .catch(console.error);
  }, []);


  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography style={{ color: Color.green }} variant="caption">
              Current
            </Typography>
            <Typography
              style={{ color: Color.green }}
              gutterBottom
              variant="h6"
            >
              COMPANY FUND
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {companyFund.map((row, i) => (
                <b key={i} style={{ color: Color.white }}>
                  Php {row._fund === null ? "0" : row._fund.toLocaleString()}
                </b>
              ))}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          {/* <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
};

Fund.propTypes = {
  className: PropTypes.string,
};

export default Fund;
