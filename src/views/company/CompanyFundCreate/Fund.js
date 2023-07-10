import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
  // Typography,
  Grid,
  // Avatar,
  colors,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createFund } from "../../../accountingModel/companyFundData";
import Color from "../../../utils/colors";
import Api from "../../../Api";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  dialog: {
    backgroundColor: Color.headColor,
    color: theme.palette.common.white,
  },
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    async function fetchData() {
      const ArrayFund = {
        type: values.type,
        fund: values.fund,
        userId: Api.request.userID,
        ref: values.ref,
        remarks: values.note,
      };
      const results = await createFund(ArrayFund);
      setLoading(false);
      alert.success(results);
    }
    fetchData().catch(console.error);
  };

  const [values, setValues] = useState({
    fund: "",
    type: "",
    ref: "",
    note: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card>
            <form
              onSubmit={handleFormSubmit}
              className={clsx(classes.root, className)}
              {...rest}
            >
              <CardHeader
                title="Create Request Fund"
                className={classes.dialog}
              />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth={true}
                  id="outlined-select-currency"
                  select
                  label="Select Load Fund"
                  type="number"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem key={1} value={"POINTS_FUND"}>
                    COMPANY FUND
                  </MenuItem>
                  <MenuItem key={2} value={"DRAW_FUND"}>
                    DRAW FUND
                  </MenuItem>
                  {/* <MenuItem key={3} value={"BANKER_FUND"}>BANKER FUND</MenuItem> */}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  id="outlined-basic"
                  label="Input Request Amount "
                  variant="outlined"
                  type="number"
                  name="fund"
                  onChange={handleChange}
                  value={values.fund}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  id="outlined-basic"
                  label="Reference Number"
                  variant="outlined"
                  type="text"
                  name="ref"
                  onChange={handleChange}
                  value={values.ref}
                />
                <TextField
                  id="standard-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  minRows={3}
                  autoFocus
                  label="Remarks"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  name="note"
                  value={values.note}
                  fullWidth
                />
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  style={Api.Button_save}
                  type="submit"
                  variant="contained"
                >
                  Save Details
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>

        <Grid item md={6} xs={12}>
          <Card className={clsx(classes.root, className)} {...rest}>
            {/* <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
             {merchantNAME} 
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Php {merchantFund.toLocaleString()} 
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
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
          </Typography>
        </Box>
      </CardContent> */}
          </Card>
        </Grid>
      </Grid>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
};

export default Notifications;
