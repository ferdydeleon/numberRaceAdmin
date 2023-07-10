import React, { useState, useEffect } from 'react';
import { /* Link as RouterLink, useNavigate*/ } from 'react-router-dom';
import {
  Box,
  CardHeader,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import api from '../../../axios';
import Api from '../../../Api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import S3 from 'react-aws-s3';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Edit = (props) => {
  const classes = useStyles();

  var url = window.location.pathname;
  var user_ID = url.substring(url.lastIndexOf('/') + 1);
  const [Username, setUsername] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Phone, setPhone] = useState('');
  const [GROUPID, setGroupId] = useState('');
  const [Fb, setFb] = useState('');
  

  useEffect(() => {
    setLoading(true)
    async function fetchUsers() {
      api.get(`${Api.request.URL}/api/v2/Users/${user_ID}`).then((res) => {
        let row = {};
        res.data.data.data.map((val) => {
            return (row = val);
        });
        setUsername(row.username);
        setFb(row.fbAccount)
        setFirstName(row.first_name);
        setLastName(row.last_name);
        setPhone(row.phone);
        setGroupId(row.group_name);
        setLoading(false)
      });
    }

    fetchUsers()
  }, [user_ID]);

  const [sueccesBar, setSuccessbar] = React.useState(false);
  const [errorBar, setErrorbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ResponseMessage, setResponseMessage] = useState('');


  const handleFormSubmit = e => {
    setLoading(true);
    e.preventDefault();

    let GROUP;
    if (GROUPID === 'ADMIN') {
      GROUP = 1;
    } else if (GROUPID === 'PLATINUM') {
      GROUP = 3;
    } else if (GROUPID === 'AGENT') {
      GROUP = 4;
    } else if (GROUPID === 'DIRECT_PLAYER') {
      GROUP = 5;
    } else if (GROUPID === 'DECLARATOR') {
      GROUP = 6;
    } else if (GROUPID === 'STAFF') {
      GROUP = 7;
    } else if (GROUPID === 'ACCOUNTING') {
      GROUP = 8;
    } else {
      //GROUP = 2;
    }
   
    const ArrayEditUsers = {
      id: user_ID,
      username: Username,
      fbAccount:Fb,
      firstname: FirstName,
      lastname: LastName,
      group_id: GROUP,
      phone: Phone,
    };
      api.post(`${Api.request.URL}/api/v2/Users/update/`, ArrayEditUsers)
        .then(res => {
         /*  console.log(res.data.message); */
          setResponseMessage(res.data.message);
          setSuccessbar(true);
          setLoading(false);
        })
        .catch(error => {
            /* error.response.data.message */
            setResponseMessage(error.response.data.message);
            setErrorbar(true);
            setLoading(false);
        }); 
      
    };   

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessbar(false);
    setErrorbar(false);
  };
  const Merchant = localStorage.getItem("merchantName")

  const handleClick = () => {
    window.location.href = Api.history.page;
  };

  return (
    <Card>

      <CardHeader subheader="User Update" title={Merchant} />
      <Divider />
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField

                required
                id="outlined-select-currency-native"
                select
                margin="normal"
                fullWidth
                label="Select Role"
                name="GROUPID"
                onChange={e => setGroupId(e.target.value)}
                value={GROUPID}
                // value={values.i_typeId}
                // onChange={handleChange}
                SelectProps={{
                  native: true
                }}
                variant="outlined"
              >
                
                <option value={GROUPID}>{GROUPID}</option>
                <option value={'DIRECT_PLAYER'}>{'DIRECT_PLAYER'}</option>
                <option value={'AGENT'}>{'AGENT'}</option>
                <option value={'PLATINUM'}>{'PLATINUM'}</option>
                <option value={'SUPER_ADMIN'}>{'SUPER_ADMIN'}</option>
                <option value={'DECLARATOR'}>{'DECLARATOR'}</option>
                <option value={'STAFF'}>{'STAFF'}</option>
                <option value={'ACCOUNTING'}>{'ACCOUNTING'}</option>
 
              </TextField>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                name="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="First Name"
                margin="normal"
                name="FirstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="Last Name"
                margin="normal"
                name="LastName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            {/* <Grid item md={6} xs={12}>
              <TextField
                id="standard-number"
                fullWidth
                required
                label="Date Of Birth"
                margin="normal"
                name="dateOfBirth"
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dateOfBirth === null ? '' : dateOfBirth.slice(0, 10)}

                variant="outlined"
              />
            </Grid> */}
            <Grid item md={6} xs={12}>
              <TextField
                id="standard-number"
                fullWidth
                required
                label="Phone"
                margin="normal"
                name="Phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={Phone}
                inputProps={{ minLength: "10", maxLength: "11" }}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                // helperText={touched.email && errors.email}
                label="Facebook Account"
                margin="normal"
                name="fb"
                type="text"
                onChange={(e) => setFb(e.target.value)}
                value={Fb}
                variant="outlined"

              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                // helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                variant="outlined"

              />
            </Grid> */}
          </Grid>

          {/* <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                id="standard-number"
                fullWidth
                required
                label="Phone"
                margin="normal"
                name="Phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={Phone}
                inputProps={{ minlength: "10", maxlength: "11" }}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="Address"
                margin="normal"
                name="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={Address}
                type="text"
                variant="outlined"

              />
            </Grid> 
          </Grid> */}


          {/* {GROUPID === 'PLATINUM' || GROUPID === 'DIRECT_PLAYER' || GROUPID === 'AGENT' ?
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  id="outlined-select-currency-native"
                  select
                  margin="normal"
                  fullWidth
                  label="Select Type ID"
                  name="typeId"
                  onChange={e => settypeId(e.target.value)}
                  // value={values.i_typeId}
                  // onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  variant="outlined"
                >
                  <option >{typeId}</option>
                  <option value={"Driver's license"}>{"Driver's license"}</option>
                  <option value={'SSS UMID Card'}>{'SSS UMID Card'}</option>
                  <option value={'PhilHealth ID'}>{'PhilHealth ID'}</option>
                  <option value={'Postal ID'}>{'Postal ID'}</option>
                  <option value={"Voter's ID"}>{"Voter's ID"}</option>
                  <option value={"Philippine passport ID"}>{"Philippine passport ID"}</option>
                  <option value={"Professional Regulation Commission ID"}>{"Professional Regulation Commission ID"}</option>
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ID NUMBER"
                  margin="normal"
                  name="idNumber"
                  onChange={(e) => setIdNumber(e.target.value)}
                  value={idNumber}
                  type="text"
                  variant="outlined"

                />
              </Grid>
            </Grid> : ''}



          {GROUPID === 'PLATINUM' || GROUPID === 'DIRECT_PLAYER' || GROUPID === 'AGENT' ?
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="UPLOAD ID PICTURE"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => setIDpicture(e.target.files)}
                  margin="normal"
                  name="idPicture"
                  type="file"
                  variant="outlined"

                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="SELFIE PICTURE"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => setSelfie(e.target.files)}
                  margin="normal"
                  name="selfie"
                  type="file"
                  variant="outlined"
                />
              </Grid>
            </Grid> : ''}

         

          {GROUPID === 'PLATINUM' || GROUPID === 'DIRECT_PLAYER' || GROUPID === 'AGENT' ?
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  id="standard-number"
                  fullWidth
                  required
                  label="Accupation"
                  margin="normal"
                  name="occupation"
                  type="text"
                  onChange={(e) => setOccupation(e.target.value)}
                  value={occupation}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Nationality"
                  margin="normal"
                  name="nationality"
                  onChange={(e) => setNationality(e.target.value)}
                  value={nationality}
                  type="text"
                  variant="outlined"

                />
              </Grid>
            </Grid> : ''} */}

          <Divider />
      
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              variant="contained"
              className={classes.importButton}
              margin={'dense'}
              style={Api.editBacktButton}
              startIcon={<ArrowBackIosIcon />}
              onClick={handleClick}>Back</Button>

            <Button
              style={Api.Button_save}
              variant="contained"
              type="submit"
              className={classes.importButton}
            >
              Update details
          </Button>
          </Box>
            
        </form>

      </CardContent>

      <Snackbar open={errorBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {ResponseMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={sueccesBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {ResponseMessage}
        </Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>


    </Card>
  );
};

export default Edit;
