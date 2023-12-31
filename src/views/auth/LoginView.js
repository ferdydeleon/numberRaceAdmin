import React, { useEffect, useState } from "react";
import Api from "../../Api";
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import SimpleCrypto from "simple-crypto-js";
import Page from "src/components/Page";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import localStorageService from "./localStorageService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import { useAlert } from "react-alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#141b2d",
    backgroundImage: "url('/static/bgLogin.jpg')",
    '@media (max-width:600px)': {
      backgroundImage: "url('/static/bg_mobile.jpg')",
    },
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    //width: `calc(100vw + 48px)`,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    "& .MuiButton-contained:hover": {
      boxShadow: "0 0 1px 0 rgb(245 191 32), 0 2px 2px -2px rgb(245 191 32)",
      backgroundColor: "#bd191a",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "3px solid #3e4396",
    },
  },
  
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  button_login: {
    // backgroundColor: Api.login.button,
    // color: 'white',
    width: 20,
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    color: " #ff0",
    fontSize: "1.2em",
    minWidth: "110px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: " 10px",
    backgroundColor: "#4cceac",
    height: "45px",
  },
  TextFieldInput: {
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink .MuiOutlinedInput-input": {
      color: "#002452",
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(245 191 32)",
    },
    "& .MuiInputLabel-outlined": {
      color: "#e0e0e0",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "3px solid #3e4396",
    },
    "& .MuiOutlinedInput-input": {
      padding: "18.5px 14px",
      color: "#e0e0e0",
    },
  },
  "input:-internal-autofill-selected ": {
    backgroundColor: "#bd191a",
  },
  wrapper: {
    paddingTop: "30px",
    width: " 500px",
    margin: "auto",
  },
  pagcor: {
    fontWeight: "700",
    color: "#ffffff",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gridFap: "5px",
    gap: "5px",
    padding: "2px 0",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginView = () => {
  // const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const alert = useAlert();
  const [sueccesSBar, setSuccessSbar] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ipaddress, setIpaddress] = useState("");

  useEffect(() => {
    axios.get("http://api64.ipify.org?format=json").then((response) => {
      let _ipaddress = response.data?.ip || "0.0.0.0";
      sessionStorage.setItem("ip_address", _ipaddress);
      setIpaddress(_ipaddress);
    });
  }, []);
  // useEffect(() => {
  //   axios.get(`https://api64.ipify.org/?format=json`).then(res => {
  //     setIpaddress(res.data.ip);
  //   });
  // }, []);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loading, setLoading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(!loading);

    const UserInfo = {
      username: username,
      password: password,
      ip_address: ipaddress,
    };
    try {
      axios
        .post(`${Api.request.URL}/api/v2/Login/`, UserInfo) //   .post(`${Api.request.URL}/api/v2/Login/`, UserInfo)
        .then((res) => {
          const fetch_user = res.data.data.group;
          let UserInfo = {};
          fetch_user.map((row) => {
            return (UserInfo = row);
          });
          if (
            UserInfo.name === "STAFF" ||
            UserInfo.name === "SUPER_ADMIN" ||
            UserInfo.name === "ACCOUNTING" ||
            UserInfo.name === "ADMIN"
          ) {
            const secretKey = "some-unique-key";
            const simpleCrypto = new SimpleCrypto(secretKey);
            const userRole = simpleCrypto.encrypt(UserInfo.allow);
            const userId = simpleCrypto.encrypt(res.data.data.id);
            const username = simpleCrypto.encrypt(res.data.data.username);
            const groupname = simpleCrypto.encrypt(UserInfo.name);
            const passw0rd = simpleCrypto.encrypt(password);
            const token = res.data.token;
            const refreshToken = res.data.refreshToken;

            const user = {
              nropID: userRole,
              diresu: userId,
              emanresu: username,
              namegroup: groupname,
              drowssp: passw0rd,
              nekton: token,
              refreshToken: refreshToken,
            };
            localStorage.setItem("token", token);
            localStorage.setItem("refreshTokens", refreshToken);
            localStorageService.setItem("auth_user", user);
            switch (UserInfo.name) {
              case "SUPER_ADMIN":
                window.location.href = "/app/event/list/view";
                break;
              case "ACCOUNTING":
                window.location.href = "/app/reports/actual/income";

                // if (res.data.data.username === "accounting_aly") {
                //   window.location.href = "/app/dashboard";
                // } else {
                //   if (res.data.data.username === "jay_accounting") {
                //     window.location.href = "/app/dashboard";
                //   } else if (res.data.data.username === "adminview") {
                //     window.location.href = "/app/reports/income";
                //   } else if (res.data.data.username === "accounting") {
                //     window.location.href = "/app/dashboard";
                //   } else if (res.data.data.username === "acctng_louela") {
                //     window.location.href = "/app/gpt/check-deposit/";
                //   } else if (res.data.data.username === "acctng_aly") {
                //     window.location.href = "/app/gpt/check-deposit/";
                //   } else if (res.data.data.username === "valeenwong") {
                //     window.location.href = "/app/dashboard";
                //   } else if (res.data.data.username === "jackie_geronimo") {
                //     window.location.href = "/app/dashboard";
                //   } else if (res.data.data.username === "msk") {
                //     window.location.href = "/app/dashboard";
                //   } else {
                //     alert.error("ERROR:, No Access!");
                //   }
                // }

                break;
              case "STAFF":
                if (res.data.data.username === Api.request.payborit) {
                  window.location.href = "/app/payborit/view";
                } else {
                  window.location.href = "/app/account/players/";
                }
                break;
              default:
                alert.error("ERROR:, PLEASE TRY AGAIN!");
            }
          } else {
            //alert.error(res.data.message);
            setLoading(false);
            /*  console.log('error Login'); */
          }
        })
        .catch((error) => {
          alert.error(error.response.data.message);
          //  alert.error(error);
          setLoading(false);
        });
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box mb={3} style={{ textAlign: "center", marginBottom: "15px" }}>
              <img
                alt="Logo"
                src="/static/logo140.png"
                style={{ width: "45%" }}
              />
            </Box>

            <TextField
              style={{ marginBottom: "20px" }}
              fullWidth
              label="Username"
              className={classes.TextFieldInput}
              margin="normal"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              variant="outlined"
            />
            <FormControl
              fullWidth={true}
              className={clsx(classes.margin, classes.TextFieldInput)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.TextFieldInput}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <Visibility style={{ color: "#3e4396" }} />
                      ) : (
                        <VisibilityOff style={{ color: "#3e4396" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            {/* <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              className={classes.TextFieldInput}
              onChange={e => setPassword(e.target.value)}
              type="password"
              value={password}
              variant="outlined" 
            />*/}
            <Box my={2} textAlign="center">
              <Box textAlign="center" m={1}>
                <Button
                  className={classes.button_login}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Box>

              {/* <Typography style={{color: '#fff'}} variant="body1" >
           NOT YET REGISTERED? {' '}
              <Link to="/register" variant="h2" >
              SIGN UP NOW!!
              </Link>
            </Typography>  */}
            </Box>
          </form>

          <Snackbar
            open={sueccesSBar}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Username and password didn't match!
            </Alert>
          </Snackbar>

          <Backdrop
            className={classes.backdrop}
            open={loading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
