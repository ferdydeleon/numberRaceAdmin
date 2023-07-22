import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import api from "../../../axios";
import Api from "../../../Api";
import getIP from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAlert } from "react-alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import {PlayerType} from "../../../adminModel/data";

const useStyles = makeStyles((theme) => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const [ip_address, setIpAddress] = useState("");
  //https://api.ipify.org?format=text`
  useEffect(() => {
    getIP.get(`https://api64.ipify.org/?format=json`).then((res) => {
      setIpAddress(res.data.ip);
    });
  }, []);

  const [values, setValues] = useState({
    roles: "",
    username: "",
    password: "",
    confirm: "",
    firstname: "",
    lastname: "",
    fb: "",
    phone: "",
  });

  const [errorMaximun, setErrorMaximum] = useState("");
  const [errorMax, setErrorMax] = useState(false);
  const [validUsername, setValidUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "username") {
      // console.log(event.target.value)
      const isValidPasswordRegex = /[a-zA-Z0-9]$/;
      if (!isValidPasswordRegex.test(event.target.value)) {
        //console.log("true")
        setErrorUsername(true);
        setValidUsername(
          "The username may only contain letters, numbers, dashes and underscores."
        );
      } else {
        // console.log("false")
        setValidUsername("");
        setErrorUsername(false);
      }
    } else if (event.target.name === "phone") {
      if (10 === event.target.value.length) {
        setErrorMax(false);
        // setDisAble(true)
        setErrorMaximum("");
      } else {
        setErrorMax(true);
        setErrorMaximum("Sample Format Number +63 9123456789");
        // setDisAble(false)
        //setErrorMaximum("Max Digit 11")
      }
    } else {
      console.log('else')
    }

  };

  // const [ResponseMessage, setResponseMessage] = useState('');
  const [valid, setValid] = useState("");
  const [error, setError] = useState(false);
  const handleFormSubmit = (e) => {
    // console.log('handleFormSubmit: ', values);
    e.preventDefault();
    if (errorMax === true) {
      alert.error("Wrong Phone Number Format");
    } else if (errorUsername === true) {
      alert.error(
        "he username may only contain letters, numbers, dashes and underscores."
      );
    } else {
      if (values.password !== values.confirm) {
        setValid("Password and confirm password does not match");
        setError(true);
      } else {
        setLoading(true);
        setValid("");
        setError(false);
        let GROUP;
        let TYPEGROUP;
        if (values.roles === "SUPER_ADMIN") {
          GROUP = 1;
          TYPEGROUP = "ADMIN";
        } else if (values.roles === "MERCHANT_ADMIN") {
          GROUP = 2;
          TYPEGROUP = "ADMIN";
        } else if (values.roles === "PLATINUM") {
          GROUP = 3;
          TYPEGROUP = "PLATINUM";
        } else if (values.roles === "AGENT") {
          GROUP = 4;
          TYPEGROUP = "AGENT";
        } else if (values.roles === "DIRECT_PLAYER") {
          GROUP = 5;
          TYPEGROUP = "DIRECT_PLAYER";
        } else if (values.roles === "DECLARATOR") {
          GROUP = 6;
          TYPEGROUP = "ADMIN";
        } else if (values.roles === "STAFF") {
          GROUP = 7;
          TYPEGROUP = "ADMIN";
        } else if (values.roles === "ACCOUNTING") {
          GROUP = 8;
          TYPEGROUP = "ADMIN";
        } else if (values.roles === "SUPER_PLATINUM") {
          GROUP = 9;
          TYPEGROUP = "SUPER_PLATINUM";
        } else {
          //GROUP = 2;
        }

        const ArrayAddUser = {
          type: TYPEGROUP,
          ip_address: ip_address,
          username: values.username,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
          phone: "+63" + values.phone,
          group_id: GROUP,
          fbAccount: values.fb,
        };
        setLoading(true);

        api
          .post(`${Api.request.URL}/api/v2/Users/create`, ArrayAddUser)
          .then((res) => {
            // console.log(res.data.message);
            alert.success(res.data.message);
            setLoading(false);
          })
          .catch((error) => {
            console.log("error: " + error);
            alert.error(error.response.data.message);
            setLoading(false);
          });
        setLoading(false);
      }
    } // end else if wrong input wrong number
  };


  const Updatepending = Api.STAFF_USER.STAFF.filter(
    (item) => item.username === Api.request.username
  );
  const access_create_user_platinum =
    parseInt(Updatepending.map((val) => val.create_user_platinum)) === 1;

  return (
    <form
      onSubmit={handleFormSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          /*  subheader="Data Entry" */
          title="Data Entry"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              {access_create_user_platinum === true ? (
                <TextField
                  required
                  id="outlined-select-currency-native"
                  select
                  margin="normal"
                  fullWidth
                  label="Select Role"
                  name="roles"
                  value={values.roles}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem></MenuItem>
                  <MenuItem value={"PLATINUM"}>{"PLATINUM"}</MenuItem>
                </TextField>
              ) : (
                <TextField
                  required
                  id="outlined-select-currency-native"
                  margin="normal"
                  fullWidth
                  select
                  label="Select Role"
                  name="roles"
                  value={values.roles}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {PlayerType.map((val) => (
                    <MenuItem value={val.value}>{val.type}</MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                error={errorUsername ? true : false}
                helperText={validUsername}
                // inputProps={{pattern:"[a-zA-Z0-9\-\_]$"}}
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                onChange={handleChange}
                type="text"
                value={values.username}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                error={error ? true : false}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                error={error ? true : false}
                helperText={valid}
                label="Confirm Password"
                margin="normal"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="First Name"
                margin="normal"
                name="firstname"
                onChange={handleChange}
                type="text"
                value={values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="Last Name"
                margin="normal"
                name="lastname"
                onChange={handleChange}
                type="text"
                value={values.lastname}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                error={errorMax ? true : false}
                helperText={errorMaximun}
                label="Phone Number"
                margin="normal"
                inputProps={{ minlength: "9", maxlength: "10" }}
                name="phone"
                onChange={handleChange}
                type="text"
                value={values.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{"+63"}</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="Facebook Account"
                margin="normal"
                name="fb"
                onChange={handleChange}
                type="text"
                value={values.fb}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button style={Api.Button_save} variant="contained" type="submit">
            Save Details
          </Button>
        </Box>
      </Card>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
