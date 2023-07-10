import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import api from '../../../axios';
import Api from '../../../Api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Search as SearchIcon } from 'react-feather';
import {
  Box,
  Card,
  Grid,
  CardContent,
  TextField,
  InputAdornment,
  CardHeader,
  SvgIcon
} from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing(1)
  },
  searcH: {
    float: 'right'
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export default function CustomizedTables() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [postsPerPage, setPostsPerPage] = React.useState(10);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const handleChangePage = (event, newPage) => { 
    setPage(newPage);
    let val = newPage + 1;
    return RequestUsers('', val);
  };

  const handleChangeRowsPerPage = event => {
    setPostsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClickSearch = () => {
    let Page = 1;
    return RequestUsers(search, Page);
  };
  const [totalPage, setTotalPage] = useState(0);
  const RequestUsers = async (search, page) => {
    if (search === undefined || page === undefined) {
      search = '';
      page = 1;
      //console.log('eto') Admin/User/?page=${page}&merchant=all&group=DIRECT_PLAYER&s=${search}
    } else {
      //console.log("else",search) Admin/User/find/player?page=${page}&merchant=2&s=
    }
    setLoading(true);
    //let userListByID = localStorage.getItem('merchantID');
    try {
      await api
        .get(
          `${Api.request.URL}/Admin/User/?page=${page}&merchant=all&s=${search}`)
        .then(res => {
          //console.log(res.data.data.total_query)
          setTotalPage(res.data.data.total_query);
          setPosts(res.data.data.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          alert(error.response.data.message);
          //console.log(error);
        });
    } catch (e) {
      alert('Could not send request Error: Network Error');
      setLoading(false);
     // console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    RequestUsers();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [UserName, setUsername] = React.useState(false);
  const [UserNameID, setUsernameID] = React.useState(false);
  const handleClickPassword = (e, id) => {
    setOpen(true);
    let users = {};
    posts.map(row => {
      if (row.id === id) return (users = row);
      // return (videoFeeder = arena);
    });
    setUsernameID(users.id);
    setUsername(users.username);
  };

  const [sueccesBar, setSuccessbar] = React.useState(false);
  const [errorBar, setErrorbar] = useState(false);
  const [valid, setValid] = useState('');
  const [error, setError] = useState(false);
  const [ResponseMessage, setResponseMessage] = useState('');
  const [values, setValues] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setValid("Password and Confirm don't match");
      setError(true);
    } else {
      setLoading(true);
      setValid('');
      setError(false);
      setOpen(false);
      const passwordArray = {
        id: UserNameID,
        password: values.password,
        cpassword: values.confirmPassword
      };
 
      api
        .post(`${Api.request.URL}/admin/user/password`, passwordArray)
        .then(res => {
          setSuccessbar(true);
          setResponseMessage(res.data.message);
          setLoading(false);
          setValues({
            password: '',
            confirmPassword: ''
          });
        })
        .catch(error => {
          setErrorbar(true);
          setResponseMessage(error.response.message);
          setLoading(false);
        });
    }
  };

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessbar(false);
    setErrorbar(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenActive(false);
  };

  const orange = createTheme ({
    palette: {
      secondary: {
        main: '#ff9800'
      }
    }
  });

/*   const handleActive = (e, id) => {
    console.log(id);
  }; */

  const active = createTheme ({
    palette: {
      secondary: {
        main: '#2e7d32'
      }
    }
  });

  const deactive = createTheme ({
    palette: {
      secondary: {
        main: '#d84315'
      }
    }
  });

  const [Username, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [user_ID, setuser_ID] = useState('');
  const [groupID, setGroupID] = useState('');
  const [openActive, setOpenActive] = React.useState(false);

  const handleClickActive = (e, id) => {
    //console.log('handleClickActive: ', id);
    setOpenActive(true);
    setuser_ID(id);
    api
      .get(`${Api.request.URL}/Admin/User/${id}`, {
        headers: {
          Authorization: `Bearer ${Api.request.token}`
        }
      })
      .then(res => {
        res.data.data.map(row => {
          setUserName(row.username);
          setEmail(row.email);
          setFirstName(row.first_name);
          setLastName(row.last_name);
          setAddress(row.address);
          setPhone(row.phone);
          setGroupID(row.group_id);
        });
        setLoading(false);
      });
  };

  const [value, setValue] = React.useState('');
  const handleRadioChange = event => {
    setValue(event.target.value);
  };

  const handleFormActiveSubmit = e => {
    setLoading(true);
    e.preventDefault();
    const ArrayEditUsers = {
      id: user_ID,
      username: Username,
      email: Email,
      firstname: FirstName,
      lastname: LastName,
      phone: Phone,
      address: Address,
      group_id: groupID,
      isActive: value
    };
    //console.log(ArrayEditUsers);

    const sample = posts.findIndex(item => item.id === user_ID);
    const newArena = posts;
    let VAL;
    if (value === '1') {
      VAL = 1;
    } else {
      VAL = 0;
    }
    newArena[sample].active = VAL;
    //console.log("ArrayEditUsers: ",ArrayEditUsers)
    api
      .post(`${Api.request.URL}/Admin/User/update`, ArrayEditUsers, {
        headers: {
          Authorization: `Bearer ${Api.request.token}`
        }
      })
      .then(res => {
        setLoading(false);
        setOpenActive(false);
        setSuccessbar(true);
        setResponseMessage(res.data.message);
        /* return PlatinumList() */
        setPosts(newArena);
      })
      .catch(error => {
        setResponseMessage('require group id');
        setErrorbar(true);
        setLoading(false);
        setOpenActive(false);
      });
  };

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
          <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                type="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickSearch}
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Users"
                variant="outlined"
              />
              </Grid>
          </CardContent>
        </Card>
      </Box>

      <TableContainer component={Paper}>
        <Dialog
          fullWidth={true}
          maxWidth={'xs'}
          open={openActive}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CardHeader
            style={{ backgroundColor: 'rgb(9 168 236)', color: 'white' }}
            title="Activate / Deactivate Users"
          />
          <form onSubmit={handleFormActiveSubmit}>
            <DialogContent>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value={'1'}
                  control={<Radio />}
                  label="Activate!"
                />
                <FormControlLabel
                  value={'0'}
                  control={<Radio />}
                  label="Deactivate!"
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>

              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">
                Activate/Deactivate
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map(row => {
                let STATUS;
                if (row.active === 1) {
                  STATUS = (
                    <ThemeProvider theme={active}>
                      <Button
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<DoneOutlineIcon />}
                        onClick={e => handleClickActive(e, row.id)}
                      >
                        Activate
                      </Button>
                    </ThemeProvider>
                  );
                } else {
                  STATUS = (
                    <ThemeProvider theme={deactive}>
                      <Button
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<ErrorOutlineIcon />}
                        onClick={e => handleClickActive(e, row.id)}
                      >
                        Deactivate
                      </Button>
                    </ThemeProvider>
                  );
                }
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">{STATUS}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<VpnKeyIcon />}
                        onClick={e => handleClickPassword(e, row.id)}
                      >
                        {/* Change Pssword */}
                      </Button>
                      <ThemeProvider theme={orange}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.button}
                          startIcon={<EditRoundedIcon />}
                          href={`/app/merchant/users/edit/${row.id}`}
                        >
                          {/* Edit */}
                        </Button>
                      </ThemeProvider>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100, 500]}
          component="div"
          count={totalPage}
          rowsPerPage={postsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
        {/* Change password */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CardHeader
            style={{ backgroundColor: 'rgb(7 30 243)', color: 'white' }}
            title="Change Password"
          />

          <form onSubmit={handleFormSubmit}>
            <DialogContent>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                defaultValue={UserName}
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
                defaultValue={values.password}
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
                defaultValue={values.confirmPassword}
                type="password"
                fullWidth
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Snackbar
          open={errorBar}
          autoHideDuration={6000}
          onClose={handleCloseBar}
        >
          <Alert onClose={handleCloseBar} severity="error">
            {ResponseMessage}
          </Alert>
        </Snackbar>

        <Snackbar
          open={sueccesBar}
          autoHideDuration={6000}
          onClose={handleCloseBar}
        >
          <Alert onClose={handleCloseBar} severity="success">
            {ResponseMessage}
          </Alert>
        </Snackbar>
      </TableContainer>
    </div>
  );
}
