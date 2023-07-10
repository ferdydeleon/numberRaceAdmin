import React, { useEffect, useState } from 'react';
import Api from '../../Api'
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles
} from '@material-ui/core';
import SimpleCrypto from "simple-crypto-js"
import Page from 'src/components/Page';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import localStorageService from './localStorageService';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import { useAlert } from 'react-alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//mport LOGO from '../../../public/static/baccarat_Dark_Green.jpeg';
//import Image from '../../../public/static/baccarat_Dark_Green/jpg';
//import IMAGE from '../../../public/static/baccarat_Dark_Green.jpeg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#171717",
    //backgroundImage: `url(${Image})`,
   // backgroundImage: "url('/static/baccarat_Dark_Green.jpeg')",
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    //width: `calc(100vw + 48px)`,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiButton-contained:hover': {
      boxShadow: '0 0 1px 0 rgb(245 191 32), 0 2px 2px -2px rgb(245 191 32)',
      backgroundColor: '#cd9115',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: "#ecdc87",
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  button_login: {
    backgroundColor: Api.login.button,
    color: 'white',
  },
  TextFieldInput: {
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink .MuiOutlinedInput-input': {
      color: '#f5bc03',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(245 191 32)',
    },
    '& .MuiInputLabel-outlined': {
      color: '#f5bc03',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d50000',
    },
    '& .MuiOutlinedInput-input': {
      padding: '18.5px 14px',
      color: '#f5bc03',
    },
  },
  pagcor: {
    fontWeight: '700',
    color: '#ffffff',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gridFap: '5px',
    gap: '5px',
    padding: '2px 0',
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginView = () => {
  const classes = useStyles();
  const alert = useAlert();
  const [sueccesSBar, setSuccessSbar] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ipaddress, setIpaddress] = useState('');

  useEffect(() => {
    axios.get(`https://api64.ipify.org/?format=json`).then(res => {
      setIpaddress(res.data.ip);
    });
  }, []);


  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // backdrop handle
  const [loading, setLoading] = useState(false);
  //  snackbar handle
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSbar(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(!loading);

    const UserInfo = {
      username: username,
      password: password,
      ip_address: ipaddress
    };
    try {
      axios
        .post(`${Api.request.URL}/api/v2/Login/`, UserInfo)
        .then(res => {
          const fetch_user = res.data.data.group;
          let UserInfo = {};
          fetch_user.map(row => {
            return (UserInfo = row);
          });
          if (UserInfo.name === 'STAFF' || UserInfo.name === 'SUPER_ADMIN' || UserInfo.name === 'ACCOUNTING' || UserInfo.name === 'ADMIN') {
            const secretKey = "some-unique-key";
            const simpleCrypto = new SimpleCrypto(secretKey);
            const userRole = simpleCrypto.encrypt(UserInfo.allow);
            //const merchant_id = simpleCrypto.encrypt(res.data.data.merchant_id);
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
              refreshToken: refreshToken
            }
            localStorage.setItem('token', token)
            localStorage.setItem('refreshTokens', refreshToken)
            localStorageService.setItem('auth_user', user);
            // console.log('Success Login'); 
            // window.location.href = '/app/dashboard';
            switch (UserInfo.name) {
              case "SUPER_ADMIN":
                // window.location.href = '/app/dashboard';
                window.location.href = '/app/event/list';
                break;
              case "ACCOUNTING":
                if (res.data.data.username === 'accounting_aly') {
                  window.location.href = '/app/dashboard';
                } else {
                  //  const USername = Api.ACCOUNTING_USER.ACCTG.filter(item => item.username === res.data.data.username);
                  //const access_level = USername.map(val => val.username);
                  //console.log('access_level',access_level[0])
                  //window.location.href = '/app/dashboard';
                  // const payborit_dashboard = access_level.map(val => val.payborit_dashboard) == 1;
                  if (res.data.data.username === 'jay_accounting') {
                    window.location.href = '/app/dashboard';
                  } else if (res.data.data.username === 'adminview') {
                    window.location.href = '/app/reports/income';
                    //console.log("yes")
                    //  console.log("yes nam",res.data.data.username == access_level)
                  } else if (res.data.data.username === 'accounting') {
                    window.location.href = '/app/dashboard';
                  // } else if (res.data.data.username === 'jay_accounting') {
                  //   window.location.href = '/app/dashboard';
                  // } else if (res.data.data.username === 'atty_accounting') {
                  //   window.location.href = '/app/dashboard';
                  // } else if (res.data.data.username === 'bailey_accounting') {
                  //   window.location.href = '/app/reports/event/';
      
                  } else {
                    alert.error('ERROR LOGIN:, PLEASE TRY AGAIN!');
                    // window.location.href = '/app/';
                  }
                }

                break;
              case "STAFF":
                if (res.data.data.username === Api.request.payborit) {
                  window.location.href = '/app/payborit/view';
                } else {
                  //const USername = Api.STAFF_USER.STAFF.filter(item => item.username === res.data.data.username);
                  //const access_level = USername.map(val => val.username);
                  window.location.href = '/app/account/players/';
                }
                break;
              default:
                alert.error('ERROR:, PLEASE TRY AGAIN!');
            }

          } else {
            //alert.error(res.data.message);
            setLoading(false);
            /*  console.log('error Login'); */
          }


        })
        .catch(error => {
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
            <Box mb={3} style={{ textAlign: "center" }}>
              <img alt="Logo" src="/static/logo140.png" style={{ width: "50%" }} />
            </Box>

            <input
            required
            id='username'
            name='username'
            placeholder='Username'
            type='text'

            autoComplete='username'

            minLength={2}
            maxLength={150}
          />

{/*           
            <TextField
              fullWidth
              label="Username"
              className={classes.TextFieldInput}
              margin="normal"
              name="username"
              onChange={e => setUsername(e.target.value)}
              type="text"
              value={username}
              variant="outlined"
            /> */}
            <FormControl fullWidth={true} className={clsx(classes.margin, classes.TextFieldInput)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.TextFieldInput}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility style={{ color: '#f5bc03' }} /> : <VisibilityOff style={{ color: '#f5bc03' }} />}
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
            <Box my={2}>
              <Button
                className={classes.button_login}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
            </Box>
            {/*  <Typography color="textSecondary" variant="body1">
              Don&apos;t have an account?{' '}
              <Link component={RouterLink} to="/register" variant="h6">
                Sign up
              </Link>
            </Typography> */}
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
