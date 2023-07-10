import React, { useState, useEffect } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../../axios";
import DialogContentText from "@material-ui/core/DialogContentText";
import Api from "../../../Api";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { useAlert } from "react-alert";
import {
  Typography,
  Box,
  CardHeader,
  Card,
  Grid,
  Divider,
  CardContent,
  TextField,
  makeStyles,
  withStyles,
  Button,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useCallback } from "react";
import Color from '../../../utils/colors'
/* import ReactHTMLTableToExcel from 'react-html-table-to-excel'; */

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      with: "100%",
    },
  },
  container: {
    maxHeight: 500,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searcH: {
    float: "right",
  },
  Generate: {
    float: "right",
    marginTop: "7px",
  },
  page: {
    "& .MuiPaginationItem-page.Mui-selected": {
      color: "#fff",
      backgroundColor: Api.paginationColor.color,
    },
  },
  dialog: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    margin: 0,
    padding: theme.spacing(2),
  },
}))(TableRow);

const APplayers = () => {
  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [playerType, setTypePlayer] = useState("");
  const alert = useAlert();
  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);

  const [changepassword, setOpenChangePassword] = React.useState(false);
  const [valid, setValid] = useState("");
  const [error, setError] = useState(false);
  const [UserName, setUsername] = useState("");
  const [UserNameID, setUsernameID] = useState(false);
  // const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [user_ID, setuser_ID] = useState("");
  const [openActive, setOpenActive] = React.useState(false);
  const [openBooster, setOpenBooster] = React.useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");

  const handleClickSearchDate = () => {
    let START_C = 0;
    return RequestUsers(UserName, playerType, START_C);
  };

  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 50);
    let val = Count + 50;
    //console.log("value: ",val)
    return RequestUsers("", playerType, val);
  };

  const handleBackPage = () => {
    setCout(Count - 50);
    let val = Count - 50;
    // console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return RequestUsers("", playerType, val);
  };

  const handleChangeEEE = (event) => {
    if (event.target.name === "type") {
      setTypePlayer(event.target.value);
      // console.log('1')
    } else if (event.target.name === "UserName") {
      // console.log('2')
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      // console.log('3')
      setPassword(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      //   console.log('4')
      setConfirmPassword(event.target.value);
    } else {
      // console.log('5')
      // setSearch(event.target.value);
    }
  };

  const handleClickActive = (e, id) => {
    setOpenActive(true);
    setuser_ID(id);
  };
  const [openBoosterID, setOpenBoosterUserID] = React.useState("");

  const handleClickTagBooster = (e, id) => {
    setOpenBooster(true);
    setOpenBoosterUserID(id);
  };

  const handleClicktagAsbooster = () => {
    setLoading(true);
    const ArrayBooster = {
      userId: openBoosterID,
      playerId: Api.request.userID,
    };

    // const ArrayEditUsers = {
    //   id: user_ID,
    //   active: value,
    //   userId: 1,
    // };
    //console.log(ArrayEditUsers)

    api
      .post(`${Api.request.URL}/api/v2/Users/booster/tag`, ArrayBooster)
      .then((res) => {
        setOpenBooster(false);
        const sample = getUsers.findIndex((item) => item.id === openBoosterID);
        const newArena1 = getUsers;
        newArena1[sample].isBooster = "BOOSTER";
        alert.success(res.data.data);
        setLoading(false);
        // alert.success(res.data.data);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          alert.error(error.message);
          setOpenBooster(false);
          setLoading(false);
        } else {
          alert.error(error.response.data.message);
          setOpenBooster(false);
          setLoading(false);
        }
      });
  };

  const handleClickPassword = (e, id) => {
    setOpenChangePassword(true);

    let users = {};
    getUsers.map((row) => {
      if (row.id === id) {
        return (users = row);
      } else {
        return false;
      }
    });

    setUsernameID(users.id);
    setUsername(users.username);
  };

  const RequestUsers = useCallback(
    async (search, type, val) => {
      setLoading(true);
      try {
        let URL = "";
        let Group = "";
        if (type === "ALL") {
          Group = "";
        } else {
          Group = type;
        }

        URL = `${Api.request.URL}/api/v2/Users?search=${
          search === undefined ? "" : search
        }&group=${type === undefined ? "" : Group}&start=${
          val === undefined ? 0 : val
        }`;
        //}
        await api
          .get(URL)
          .then((res) => {
            //  console.log('res.data.data.data: ', res.data.data.data);
            // setTotalPage(res.data.data.total_query);
            const result = res.data.data.data.filter(
              (x) =>
                x.group_name === "DIRECT_PLAYER" || x.group_name === "AGENT"
            );
            //console.log("result: ", res.data.data.data);
            if (
              Api.request.username === "admin_aly" ||
              Api.request.username === "admin_louela"
            ) {
              setGetUsers(result);
            } else {
              setGetUsers(res.data.data.data);
            }

            setNextDisAble(false);
            setLoading(false);
          })
          .catch((error) => {
            setGetUsers([]);
            alert.error(error.response.data.message);
            if (error.response.data.message === "NO DATA FOUND") {
              setNextDisAble(true);
            } else {
            }
            setLoading(false);
          });
      } catch (e) {
        alert.error("Could not send request Error: Network Error");
        setLoading(false);
      }
      // setLoading(false);
    },
    [alert]
  );
  useEffect(() => {
    RequestUsers();
  }, [RequestUsers]);

  const handleClose = () => {
    setOpenBooster(false);
    setOpenActive(false);
    //  setViewAgent(false);
    setOpenChangePassword(false);
  };

  const [value, setValue] = useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleFormChangePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValid("Password and Confirm don't match");
      setError(true);
    } else {
      setLoading(true);
      setValid("");
      setError(false);
      setOpenChangePassword(false);

      const passwordArray = {
        id: UserNameID,
        password: password,
      };

      api
        .post(`${Api.request.URL}/api/v2/Users/password/`, passwordArray)
        .then((res) => {
          alert.success(res.data.message);
          setLoading(false);
          setPassword("");
          setConfirmPassword("");
          // setValues({
          //   password: '',
          //   confirmPassword: ''
          // });
        })
        .catch((error) => {
          alert.error(error.response.data.message);
          setLoading(false);
        });
    }
  };

  const handleFormActiveSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const ArrayEditUsers = {
      id: user_ID,
      active: value,
      userId: 1,
    };
    //console.log(ArrayEditUsers)

    const sample = getUsers.findIndex((item) => item.id === user_ID);
    const newArena = getUsers;
    let VAL;
    if (value === "1") {
      VAL = 1;
    } else {
      VAL = 0;
    }
    //console.log("sample: ",sample)
    newArena[sample].active = VAL;

    //console.log("ArrayEditUsers: ",ArrayEditUsers)
    api
      .post(`${Api.request.URL}/api/v2/Users/active`, ArrayEditUsers)
      .then((res) => {
        setLoading(false);
        setOpenActive(false);

        alert.success(res.data.message);
        /* return PlatinumList() */
        setGetUsers(newArena);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          alert.error(error.message);
          setLoading(false);
        } else {
          alert.error(error.response.data.message);
          setLoading(false);
        }
      });
  };

  // const [viewAgent, setViewAgent] = React.useState(false);
  // const [infoAgent, setInfoAgent] = React.useState([]);
  // const [agentUsername, setUsername] = useState('');
  // const [agentFirstName, setUsername] = useState('');
  // const [agentLastName, setUsername] = useState('');

  const [paymentDetails, setPaymentDetails] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [typeId, settypeId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idUrl, setidUrl] = useState("");
  const [picUrl, setpicUrl] = useState("");
  const [idNumner, setidNumber] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleClickViewPayment = (
    e,
    username,
    first_name,
    last_name,
    email,
    phone,
    dateOfBirth,
    address,
    idNumber,
    picUrl,
    idUrl,
    occupation,
    typeId
  ) => {
    setUsername(username);
    setFirstName(first_name, last_name);
    setPhone(phone);
    setEmail(email);
    setdateOfBirth(dateOfBirth);
    setAddress(address);
    setidNumber(idNumber);
    setpicUrl(picUrl);
    setidUrl(idUrl);
    settypeId(typeId);
    setOccupation(occupation);
    setPaymentDetails(true);
  };
  // const handleClickView = (e, id) => {
  //   //let fullName = fname + ' ' + lname;
  //  // console.log('Username1 : ', id);
  //   api.get(`${Api.request.URL}/users/agent/info/${id}`).then(res => {
  //     setInfoAgent(res.data.DATA);
  //     res.data.DATA.map(row => {
  //       setAgentUsername(row.username);
  //       setAgentFirstName(row.first_name);
  //       setAgentLastName(row.last_name);
  //       setAgentPhone(row.phone);
  //       setAgentEmail(row.email);
  //       setAgentRecode(row.refcode);
  //     });
  //     setViewAgent(true);
  //   });
  // };

  const handleCloseAppove = () => {
    setPaymentDetails(false);
  };
  const Updatepending = Api.STAFF_USER.STAFF.filter(
    (item) => item.username === Api.request.username
  );
  const access_change_password =
    parseInt(Updatepending.map((val) => val.change_password)) === 1;
  const access_approve_direct_player =
    parseInt(Updatepending.map((val) => val.approve_direct_player)) === 1;
  const access_approve_all_player =
    parseInt(Updatepending.map((val) => val.approve_all_player)) === 1;
  //console.log(" Updatepending.map(val => val.approve_all_player) === 1: ", Updatepending.map(val => val.approve_all_player) == 1)

  return (
    <div>
      <Dialog
        open={paymentDetails}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader className={classes.dialog} title={"Player Info "} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Username:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {UserName}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Name:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {firstName}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Date Of Birth:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {dateOfBirth}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Phone:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {phone}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Email:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {email}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Occupation:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {occupation}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Address:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {address}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Phone:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {phone}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Type ID:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {typeId}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              ID Number:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {idNumner}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              ID PICTURE:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                <img alt={"ID_PICTURE"} src={idUrl} style={{ width: "30%" }} />
              </Typography>
            </Grid>

            <Grid item xs={6}>
              SELFIE PICTURE:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                <img
                  alt={"SELFIE_PICTURE"}
                  src={picUrl}
                  style={{ width: "30%" }}
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <DialogActions>
          <Button
            onClick={handleCloseAppove}
            variant="contained"
            color="default"
            autoFocus
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {Api.request.username === "admin_aly" ||
            Api.request.username === "admin_louela" ? (
              ""
            ) : (
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth={true}
                  select
                  name="type"
                  label="Select Player Type"
                  value={playerType}
                  onChange={handleChangeEEE}
                  variant="outlined"
                >
                  <MenuItem key={1} value={"ALL"}>
                    All
                  </MenuItem>
                  <MenuItem key={2} value={"PLATINUM"}>
                    PLATINUM
                  </MenuItem>
                  <MenuItem key={3} value={"AGENT"}>
                    AGENT
                  </MenuItem>
                  <MenuItem key={4} value={"DIRECT_PLAYER"}>
                    DIRECT_PLAYER
                  </MenuItem>
                  <MenuItem key={5} value={"ADMIN"}>
                    ADMIN USER
                  </MenuItem>
                </TextField>
              </Grid>
            )}
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                type="text"
                label="Search"
                name="UserName"
                onChange={handleChangeEEE}
                placeholder="Username"
                variant="outlined"
              />
            </Grid>

            <Grid item md={2} xs={12}>
              <Button
                fullWidth={true}
                color="primary"
                onClick={handleClickSearchDate}
                variant="contained"
                type="submit"
                style={{ height: "55px" }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper className={classes.root}>
        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader ria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="left">#</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Points</StyledTableCell>
                <StyledTableCell align="right">Commision</StyledTableCell>

                <StyledTableCell align="center">Status</StyledTableCell>
                {Api.request.username === "admin_aly" ||
                Api.request.username === "admin_louela" ? (
                  ""
                ) : (
                  <StyledTableCell align="center">
                    Tag as Booster
                  </StyledTableCell>
                )}
                {access_change_password === true ? (
                  <StyledTableCell align="center">Action</StyledTableCell>
                ) : (
                  ""
                )}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {getUsers.length ? (
                getUsers.map((row, i) => {
                  let STATUS;
                  let STATUSNAME;
                  if (row.active === 1) {
                    STATUS = (
                      <Button
                        style={{ color: "#2e7d32" }}
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<DoneOutlineIcon />}
                        onClick={(e) => handleClickActive(e, row.id)}
                      >
                        Activate
                      </Button>
                    );

                    STATUSNAME = "Activate";
                  } else {
                    STATUS = (
                      <Button
                        style={{ color: "#d84315" }}
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<ErrorOutlineIcon />}
                        onClick={(e) => handleClickActive(e, row.id)}
                      >
                        Deactivate
                      </Button>
                    );

                    STATUSNAME = "Deactivate";
                  }
                  //  let approvalAdmin;
                  let GROUP;
                  let change_password;

                  if (row.group_name === "PLATINUM") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#ffc107",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    //approveFOrplayers = (<StyledTableCell align="center">{STATUS}</StyledTableCell>);
                    //  approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else if (row.group_name === "AGENT") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#6d4c41",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    // approveFOrplayers = (<StyledTableCell align="center">{STATUS}</StyledTableCell>);
                    //  approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else if (row.group_name === "STAFF") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#6d4c41",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    // approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else if (row.group_name === "SUPER_ADMIN") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#6d4c41",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    // approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else if (row.group_name === "ACCOUNTING") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#6d4c41",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    // approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else if (row.group_name === "SUPER PLATINUM") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#6d4c41",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    // approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else if (row.group_name === "DECLARATOR") {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#6d4c41",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    // approvalAdmin = (<StyledTableCell align="center">{STATUSNAME}</StyledTableCell>);
                  } else {
                    GROUP = (
                      <Typography
                        align="center"
                        style={{
                          color: "#3949ab",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {row.group_name}
                      </Typography>
                    );
                    //approveFOrplayers = (<StyledTableCell align="center">{STATUS}</StyledTableCell>);
                    // approvalAdmin = (<StyledTableCell align="center">{STATUS}</StyledTableCell>);
                  }

                  let approveFOrplayers;
                  switch (row.group_name) {
                    case "PLATINUM":
                      approveFOrplayers = (
                        <StyledTableCell align="center">
                          {STATUS}
                        </StyledTableCell>
                      );
                      change_password = (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.importButton}
                          startIcon={<VpnKeyIcon />}
                          onClick={(e) => handleClickPassword(e, row.id)}
                        ></Button>
                      );
                      break;
                    case "AGENT":
                      approveFOrplayers = (
                        <StyledTableCell align="center">
                          {STATUS}
                        </StyledTableCell>
                      );
                      change_password = (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.importButton}
                          startIcon={<VpnKeyIcon />}
                          onClick={(e) => handleClickPassword(e, row.id)}
                        ></Button>
                      );
                      break;
                    case "DIRECT_PLAYER":
                      approveFOrplayers = (
                        <StyledTableCell align="center">
                          {STATUS}
                        </StyledTableCell>
                      );
                      change_password = (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.importButton}
                          startIcon={<VpnKeyIcon />}
                          onClick={(e) => handleClickPassword(e, row.id)}
                        ></Button>
                      );
                      break;
                    default:
                      approveFOrplayers = (
                        <StyledTableCell align="center">
                          {row.status}
                        </StyledTableCell>
                      );
                  }

                  let TAG;
                  if (row.group_name === "PLATINUM") {
                    if (row.isBooster === "BOOSTER") {
                      TAG = (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.importButton}
                        >
                          booster
                        </Button>
                      );
                    } else {
                      TAG = (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.importButton}
                          onClick={(e) => handleClickTagBooster(e, row.id)}
                        >
                          Tag as booster
                        </Button>
                      );
                    }
                  } else {
                  }

                  return (
                    <StyledTableRow key={i + 1}>
                      <StyledTableCell align="left">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Button
                          style={{color:Color.tableTextColor}}
                          onClick={(e) =>
                            handleClickViewPayment(
                              e,
                              row.username,
                              row.first_name,
                              row.last_name,
                              row.email,
                              row.phone,
                              row.dateOfBirth,
                              row.address,
                              row.idNumber,
                              row.picUrl,
                              row.idUrl,
                              row.occupation,
                              row.typeId
                            )
                          }
                        >
                          {row.first_name + " " + row.last_name}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.username}
                        <br></br> {GROUP}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={{ color: "red" }}>
                        {row.playing_points === null
                          ? "0"
                          : row.playing_points.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={{ color: "red" }}>
                        {row.comission_points === null
                          ? "0"
                          : row.comission_points.toLocaleString()}
                      </StyledTableCell>

                      {access_approve_direct_player === true ? (
                        approveFOrplayers
                      ) : (
                        <StyledTableCell align="center">
                          {access_approve_all_player === true
                            ? STATUS
                            : STATUSNAME}
                        </StyledTableCell>
                      )}
                      {Api.request.username === "admin_aly" ||
                      Api.request.username === "admin_louela" ? (
                        ""
                      ) : (
                        <StyledTableCell align="center">{TAG}</StyledTableCell>
                      )}

                      {access_change_password === true ? (
                        <StyledTableCell align="center">
                          {access_approve_direct_player === true ? (
                            change_password
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              className={classes.importButton}
                              startIcon={<VpnKeyIcon />}
                              onClick={(e) => handleClickPassword(e, row.id)}
                            ></Button>
                          )}
                          {Api.request.groupName === "STAFF" ? (
                            ""
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "orange",
                                color: "white",
                              }}
                              variant="contained"
                              color="secondary"
                              size="small"
                              className={classes.importButton}
                              startIcon={<EditRoundedIcon />}
                              href={`/app/account/edit/${row.id}`}
                            ></Button>
                          )}
                        </StyledTableCell>
                      ) : (
                        ""
                      )}
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell key={1} colSpan={9}>
                    No Record Found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>

          {getUsers.length ? (
            <Box
              mt={2}
              display="flex"
              m={1}
              p={1}
              justifyContent="center"
              className={classes.root}
            >
              <Grid>
                <Button
                  className={classes.page}
                  disabled={disable}
                  startIcon={<ArrowBackIosIcon />}
                  onClick={handleBackPage}
                >
                </Button>
                <Button
                  className={classes.page}
                  disabled={nextdisable}
                  startIcon={<ArrowForwardIosIcon />}
                  onClick={handleNextPage}
                >
                </Button>
              </Grid>
              {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
            </Box>
          ) : (
            null
          )}
        </TableContainer>
      </Paper>

      <Dialog
        open={changepassword}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader className={classes.dialog} title="Change Password" />

        <form onSubmit={handleFormChangePassword}>
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
                readOnly: true,
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
              onChange={handleChangeEEE}
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
              onChange={handleChangeEEE}
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

      <Dialog
        open={openBooster}
        fullWidth={true}
        maxWidth={"xs"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          style={{ backgroundColor: "#eb3349", color: "white" }}
          title="Tag As Booster"
        />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want this player tag as booster?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClicktagAsbooster} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/*************************************************** * Pag Active ng Players  ****************************************/}

      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={openActive}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          className={classes.dialog}
          title="Activate/Deactivate Players"
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
                value={"1"}
                control={<Radio />}
                label="Activate!"
              />
              <FormControlLabel
                value={"0"}
                control={<Radio />}
                label="Deactivate!"
              />
            </RadioGroup>
            <Divider />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default React.memo(APplayers);
