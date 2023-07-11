import React, { useCallback, useEffect, useState } from "react";
import Api from "../../../Api";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import { Pagination } from '@material-ui/lab';
// import Paper from '@material-ui/core/Paper';
import api from "../../../axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CardContent from "@material-ui/core/CardContent";

import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider, InputAdornment, SvgIcon } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { Card, Box, CardHeader, MenuItem } from "@material-ui/core";
import { useAlert } from "react-alert";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

import PrintIcon from "@material-ui/icons/Print";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ReactExport from "react-data-export";
import Color from "../../../utils/colors";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  table: {
    minWidth: 700,
    backgroundColor: Color.tableColor,
  },
  field: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  text: {
    textAlign: "left",
  },
  container: {
    maxHeight: 500,
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
  ExcelButton: {
    backgroundColor: "orange",
    color: "white",
    "&:hover": {
      backgroundColor: "orange",
    },
  },
}));

function SendingAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const App = () => {
  const alert = useAlert();
  const classes = useStyles();
  const [backdropopen, setLoading] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 100);
    let val = Count + 100;
    // console.log("value: ",val)
    return getPosts(search, val);
  };

  const handleBackPage = () => {
    setCout(Count - 100);
    let val = Count - 100;
    // console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return getPosts(search, val);
  };

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let start = yyyy + "-" + mm + "-" + firstDay;
  let end = yyyy + "-" + mm + "-" + lastDay;

  const [startingDate, setStarDate] = useState(start);
  const [endingDate, setEndDate] = useState(end);

  const [status, setStatus] = useState("");
  const [typeUser, setUserType] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "startingDate") {
      setStarDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "username") {
      setSearch(event.target.value);
    } else if (event.target.name === "statusS") {
      setStatus(event.target.value);
    } else if (event.target.name === "typeUser") {
      setUserType(event.target.value);
    } else {
      // setSearch(event.target.value);
    }
  };

  const handleClickSearch = () => {
    return getPosts(search, Count, status, startingDate, endingDate, typeUser);
  };

  const getPosts = useCallback(
    async (search, val, status, startingDate, endingDate, typeUser) => {
      setLoading(true);
      let STATUS;
      if (status === "ALL") {
        STATUS = "";
      } else {
        STATUS = status;
      }
      let userType;
      if (typeUser === "ALL") {
        userType = "";
      } else {
        userType = typeUser;
      }
      try {
        await api
          .get(
            `${Api.request.URL}/api/v2/comission/convert/request?search=${
              search === undefined ? "" : search
            }&start=${val === undefined ? 0 : val}&status=${
              status === undefined ? "" : STATUS
            }&userType=${userType === undefined ? "" : userType}&from=${
              val === undefined ? start : startingDate
            }&to=${val === undefined ? end : endingDate}`
          )
          .then((res) => {
            // console.log(res.data.data.data)
            setPosts(res.data.data.data);
            setLoading(false);
            setNextDisAble(false);
          })
          .catch((error) => {
            setLoading(false);
            alert.error(error.response.data.message);
            setPosts([]);
            if (error.response.data.message === "NO DATA FOUND") {
              setNextDisAble(true);
            } else {
            }
          });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    },
    [start, end, alert]
  );

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [approve, setApprove] = useState(false);
  const [getRequestWallet, setGetRequestWallet] = useState([]);

  const handleClickApprove = (e, id) => {
    setLoading(true);
    api
      .get(`${Api.request.URL}/api/v2/comission/convert/request/${id}`)
      .then((res) => {
        setApprove(true);
        setGetRequestWallet(res.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.status === false) {
          // alert.error(error.response.data.message);
          setLoading(false);
        } else {
        }
      });
  };

  let getWallet = {};
  getRequestWallet.map((RowWallet) => {
    return (getWallet = RowWallet);
  });

  const [sending, setSending] = useState(false);
  const [wrongPassword, setWrongPassword] = React.useState("");
  const [password, setPassword] = useState("");

  const handleClickSending = (playerID, status) => {
    // Api.request.authorized
    if (password === Api.request.authorized) {
      let APIURL;
      let arrayAPPROVED;
      let STATUS_PAYMENT;

      if (status === "APPROVED") {
        STATUS_PAYMENT = "POSTED";
        arrayAPPROVED = {
          reqId: getWallet.id,
          platinumId: playerID,
          userId: Api.request.userID,
        };

        APIURL = `${Api.request.URL}/api/v2/comission/convert/request`;
      } else {
        STATUS_PAYMENT = "CANCEL";
        arrayAPPROVED = {
          reqId: getWallet.id,
          userId: Api.request.userID,
        };

        APIURL = `${Api.request.URL}/api/v2/comission/convert/request/cancel/`;
      }
      setLoading(!backdropopen);
      api
        .post(APIURL, arrayAPPROVED)
        .then((res) => {
          const Updatepending = posts.findIndex(
            (item) => item.id === getWallet.id
          );
          const UpdatePost = posts;
          UpdatePost[Updatepending].status = STATUS_PAYMENT;
          setApprove(false);
          alert.success(res.data.message);
          setPosts(UpdatePost);
        })
        .catch((error) => {
          setWrongPassword(error.response.data.message);
          setApprove(false);
        });
      setLoading(false);
    } else {
      // console.log
      setWrongPassword("Wrong Password!");
    }
  };

  const handleCloseAppove = () => {
    // setErrorPassword(false)
    setWrongPassword("");
    setApprove(false);
    setGetRequestWallet([]);
  };

  const handleSending = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSending(false);
  };
  //*************************************************************************************************** */

  const [downloads, setDownloads] = useState([]);

  const handleClickDownload = () => {
    api
      .get(
        `${Api.request.URL}/api/v2/comission/convert/request/download?search=${
          search === undefined ? "" : search
        }&status=${status}&start=0&from=${startingDate}&to=${endingDate}`
      )
      .then((res) => {
        setLoading(false);
        setDownloads(res.data.data.data);
        document.getElementById("downloads").click();
      })
      .catch((error) => {
        alert.error(error.response);
        setLoading(false);
      });
  };

  const REDCOLOR = createTheme({
    palette: {
      primary: red,
    },
  });

  const GREENCOLOR = createTheme({
    palette: {
      primary: green,
    },
  });

  return (
    <div>
      <ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
        <ExcelSheet data={downloads} name="Commission">
          <ExcelColumn
            label="Date Created"
            value={(col) =>
              col.datecreated === null
                ? ""
                : col.datecreated.slice(0, 10) +
                  "  " +
                  col.datecreated.slice(11, 19)
            }
          />
          <ExcelColumn
            label="Date Posted"
            value={(col) =>
              col.dateApprove === null
                ? ""
                : col.dateApprove.slice(0, 10) +
                  "  " +
                  col.dateApprove.slice(11, 19)
            }
          />
          <ExcelColumn
            label="Date Cancelled"
            value={(col) =>
              col.datecancel === null
                ? ""
                : col.datecancel.slice(0, 10) +
                  "  " +
                  col.datecancel.slice(11, 19)
            }
          />

          <ExcelColumn label="Username" value="username" />
          <ExcelColumn
            label="Commision"
            value={(col) =>
              col.comission === null ? "" : col.comission.toLocaleString()
            }
          />
          <ExcelColumn label="User Type" value="userType" />
          <ExcelColumn label="Status" value="status" />
          <ExcelColumn label="Assist By" value="approvedBy" />
          <ExcelColumn label="Note" value="note" />
        </ExcelSheet>
      </ExcelFile>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
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
                        style={{ cursor: "pointer" }}
                        onChange={handleChange}
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Username"
                variant="outlined"
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="typeUser"
                label="Select User Type"
                value={typeUser}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem key={1} value={"ALL"}>
                  ALL
                </MenuItem>
                <MenuItem key={1} value={"PLATINUM"}>
                  PLATINUM
                </MenuItem>
                <MenuItem key={2} value={"DIRECT_PLAYER"}>
                  DIRECT PLAYER
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="statusS"
                label="Select Status Request"
                value={status}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem key={1} value={"ALL"}>
                  ALL
                </MenuItem>
                <MenuItem key={1} value={"PENDING"}>
                  PENDING
                </MenuItem>
                <MenuItem key={2} value={"POSTED"}>
                  POSTED
                </MenuItem>
                <MenuItem key={3} value={"CANCELLED"}>
                  CANCELLED
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                id="date"
                label="Start Date"
                variant="outlined"
                name="startingDate"
                defaultValue={startingDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                id="date"
                label="End Date"
                variant="outlined"
                name="endingDate"
                defaultValue={endingDate}
                onChange={handleChange}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <Button
                fullWidth={true}
                color="primary"
                onClick={handleClickSearch}
                variant="contained"
                type="submit"
                style={{ height: "55px" }}
              >
                Filter
              </Button>
            </Grid>

            <Grid item md={3} xs={12}>
              <Button
                fullWidth={true}
                color="primary"
                onClick={handleClickDownload}
                variant="contained"
                startIcon={<PrintIcon />}
                style={{ height: "55px", marginBottom: 5 }}
                className={classes.ExcelButton}
              >
                Generate Excel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Date Created</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Commision</StyledTableCell>
              <StyledTableCell align="center">User Type</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Assist By</StyledTableCell>
              <StyledTableCell align="center">Note</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let buttonProcess;
                switch (row.status) {
                  case "POSTED":
                    buttonProcess = (
                      <ThemeProvider theme={GREENCOLOR}>
                        <Button
                          // variant="contained"
                          color="primary"
                          className={classes.button}

                          // onClick={e => handleClickApprove(e, row.id)}
                        >
                          POSTED
                        </Button>
                      </ThemeProvider>
                    );

                    break;
                  case "CANCEL":
                    buttonProcess = (
                      <ThemeProvider theme={REDCOLOR}>
                        <Button
                          ///  variant="contained"
                          color="primary"
                        >
                          CANCEL
                        </Button>
                      </ThemeProvider>
                    );
                    break;
                  default:
                    buttonProcess = (
                      <Button
                        // variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={(e) => handleClickApprove(e, row.id)}
                      >
                        PENDING
                      </Button>
                    );
                }

                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">{i + 1} </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.datecreated === null
                        ? ""
                        : row.datecreated.slice(0, 10)}
                      <br></br>
                      {row.datecreated === null
                        ? ""
                        : row.datecreated.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.username}
                    </StyledTableCell>

                    <StyledTableCell style={{ color: "red" }} align="center">
                      {row.comission === null
                        ? 0
                        : row.comission.toLocaleString()}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.userType}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {buttonProcess}
                      <br></br>
                      {row.dateApprove === null ? (
                        <Typography style={{ fontSize: "12px" }}>
                          {row.datecancel === null
                            ? ""
                            : row.datecancel.slice(0, 10)}
                          <br></br>
                          {row.datecancel === null
                            ? ""
                            : row.datecancel.slice(11, 19)}
                        </Typography>
                      ) : (
                        <Typography style={{ fontSize: "12px" }}>
                          {row.dateApprove === null
                            ? ""
                            : row.dateApprove.slice(0, 10)}
                          <br></br>
                          {row.dateApprove === null
                            ? ""
                            : row.dateApprove.slice(11, 19)}
                        </Typography>
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.approvedBy}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.note}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" key={1} colSpan={8}>
                  No records found!
                </StyledTableCell>
              </StyledTableRow>
            )}

            {/* <Dialog
              open={pinPassword}
              fullWidth={true}
              maxWidth={'xs'}
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <CardHeader
                className={classes.dialog}
                title="Please Enter Your Password?"
              />
              <DialogContent>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    id="InputPassword"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    name={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClickSending}
                  variant="contained"
                  color="primary"
                >
                  Enter
                </Button>
                <Button
                  onClick={handleClosePassword}
                  variant="contained"
                  color="default"
                  autoFocus
                >
                  Exit
                </Button>
              </DialogActions>
            </Dialog> */}
          </TableBody>
        </Table>

        <Box
          mt={2}
          display="flex"
          m={1}
          p={1}
          justifyContent="center"
          className={classes.root}
        >
          <Grid item xs={0}>
            <Button
              disabled={disable}
              startIcon={<ArrowBackIosIcon />}
              onClick={handleBackPage}
            >
              {" "}
            </Button>
            <Button
              disabled={nextdisable}
              startIcon={<ArrowForwardIosIcon />}
              onClick={handleNextPage}
            >
              {" "}
            </Button>
          </Grid>
          {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
        </Box>
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={sending} autoHideDuration={6000} onClose={handleSending}>
        <SendingAlert onClose={handleSending} severity="success">
          This is a success message!
        </SendingAlert>
      </Snackbar>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={approve}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader className={classes.dialog} title="Convert Commission" />

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              Username:
              <Typography variant="h4" gutterBottom>
                {getWallet.username}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Commission Points:
              <Typography variant="h4" gutterBottom style={{ color: "red" }}>
                {getWallet.comission === undefined
                  ? 0
                  : getWallet.comission.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                required={true}
                margin="dense"
                id="standard-basic"
                label="Password"
                type="password"
                name={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography style={{ color: "red" }}> {wrongPassword}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider></Divider>
        <DialogActions>
          <Button
            onClick={() => handleClickSending(getWallet.playerId, "APPROVED")}
            variant="contained"
            style={Api.button_green}
            //color="primary"
            type="submit"
          >
            Approve
          </Button>

          <Button
            onClick={() => handleClickSending(getWallet.playerId, "CANCEL")}
            variant="contained"
            style={Api.button_red}
            autoFocus
          >
            Cancel
          </Button>

          <Button
            onClick={handleCloseAppove}
            variant="contained"
            style={Api.button_orange}
            autoFocus
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default App;
