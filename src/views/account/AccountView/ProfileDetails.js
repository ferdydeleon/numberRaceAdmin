import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import Api from '../../../Api'
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../../../axios';
import { useAlert } from 'react-alert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },  importButton: {
    marginRight: theme.spacing(1)
  },  dialog:{
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [Active, setActive] = useState('');

  useEffect(() => {
    setLoading(true); 
    api
       .get(`${Api.request.URL}/api/v2/Users/${Api.request.userID}`).then((res) => {
  
         let row = {};
          res.data.data.data.map((val) => {
            return (row===val)
        }) 
        setUsername(row.username);
        setEmail(row.email);
        setFirstName(row.first_name);
        setLastName(row.last_name);
        setAddress(row.address);
        setPhone(row.phone);
        setActive(row.active);
        setLoading(false)
      });
   }, []);


   const [sueccesBar, setSuccessbar] = React.useState(false);
   const [errorBar, setErrorbar] = useState(false);
   const [loading, setLoading] = useState(false);
   const [ResponseMessage, setResponseMessage] = useState('');
 
   const handleFormSubmit = e => {
     setLoading(true);
     e.preventDefault();
      const ArrayEditUsers= {
           id: Api.request.userID,
           username: Username,
           email: Email,
           firstname: FirstName,
           lastname: LastName,
           phone: Phone,
           address: Address,
           /* group_id: 3, */
           isActive: Active,
       };
 
    /*    console.log('ArrayAddPlatinum: ', ArrayEditUsers);
       setLoading(true); */
         axios
           .post(`${Api.request.URL}/users/update`, ArrayEditUsers)
           .then(res => {

             setResponseMessage(res.data.message);
             setSuccessbar(true);
             setLoading(false);
           })
           .catch(error => {
               /* error.response.data.message */
               setResponseMessage("require group id");
               setErrorbar(true);
               setLoading(false);
            
           }); 
       
       };
 

  

       const handleClose = (event, reason) => {
         if (reason === 'clickaway') {
           return;
         }
         setOpenChangePassword(false);
         setSuccessbar(false);
         setErrorbar(false);
       };

       const [changepassword, setOpenChangePassword] = React.useState(false);
       const handleClickPassword = (e) => {
        setOpenChangePassword(true);
      
       }

       const [confirmPassword, setConfirmPassword] = React.useState('');
       const [password, setPassword] = React.useState('');
       const [valid, setValid] = useState('');
       const [error, setError] = useState(false);

       const handleChange = event => {
        if (event.target.name === 'password') {
          setPassword(event.target.value);
        } else if (event.target.name === 'confirmPassword') {
          setConfirmPassword(event.target.value);
      
        } else {
         // setSearch(event.target.value);
        }
      };

      
       const handleFormChangePassword = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setValid("Password and Confirm don't match");
          setError(true);
        } else {
          setLoading(true);
          setValid('');
          setError(false);
          setOpenChangePassword(false);
  
          const passwordArray = {
            id: Api.request.userID,
            password: password
          };
  
          api
            .post(`${Api.request.URL}/api/v2/Users/password/`, passwordArray)
            .then(res => {
              alert.success(res.data.message);
              setLoading(false);
           
            })
            .catch(error => {
              alert.error(error.response.data.message);
              setLoading(false);
            });
        }
      };

  return (
    <div>

<Dialog
          open={changepassword}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CardHeader
          className={classes.dialog}
            title="Change Password"
          />

          <form onSubmit={handleFormChangePassword}>
            <DialogContent>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                defaultValue= {Api.request.username}
                type="text"
                InputProps={{
                  readOnly: true
                }}
                fullWidth
              />
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                error={error ? true : false}
                helperText={valid}
                onChange={handleChange}
                name="password"
                defaultValue={password}
                fullWidth
              />
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                defaultValue={confirmPassword}
                type="password"
                fullWidth
              />
              <Divider />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="primary">
                Cancel
              </Button>
              <Button color="primary" variant="outlined" type="submit">
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>

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


    <form  onSubmit={handleFormSubmit}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                required
                onChange={(e) =>setFirstName(e.target.value)}
                value={FirstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                onChange={(e) =>setLastName(e.target.value)}
                value={LastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                onChange={(e) =>setEmail(e.target.value)}
                value={Email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="text"
                onChange={(e) =>setPhone(e.target.value)}
                value={Phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                required
                onChange={(e) =>setAddress(e.target.value)}
                value={Address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
             {/*  <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField> */}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
           <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.importButton}
              startIcon={<VpnKeyIcon />}
               onClick={e => handleClickPassword(e)}
            >Change Password</Button>
          <Button
          className={classes.importButton}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
        
      </Card>
    </form>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
