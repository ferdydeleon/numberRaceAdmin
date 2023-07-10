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
  Button,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";
import Color from "../../../utils/colors";
import { totalPoints } from "../../../accountingModel/dashboardData";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
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

const BankerFund = ({ className, ...rest }) => {
  const classes = useStyles();
  const [points, setTotalPoinst] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const pointsData = await totalPoints();
      setTotalPoinst(pointsData);
    }
    fetchData().catch(console.error);
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
              Total Points
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {points.map((row, i) => (
                <b key={i} style={{ color: Color.white }}>
                  Php{" "}
                  {row.totalPoints === null
                    ? 0
                    : row.totalPoints.toLocaleString()}
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
          <Button
            style={{ color: Color.green }}
            endIcon={<ArrowDownwardIcon />}
            size="small"
            variant="text"
            href="/app/details/totalPoints"
          >
            View all
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

BankerFund.propTypes = {
  className: PropTypes.string,
};

export default BankerFund;
