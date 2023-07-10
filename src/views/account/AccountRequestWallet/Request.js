import React, { useState, useEffect } from "react";
import Api from "../../../Api";
import Button from "@material-ui/core/Button";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from "@material-ui/core/InputLabel";
import api from "../../../axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Card,
  Box,
  colors,
  CardHeader,
  Paper,
  List,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";

import ReactExport from "react-data-export";
import { useCallback } from "react";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  table: {
    minWidth: 700,
  },
  field: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  paggi: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  text: {
    textAlign: "center",
  },
  container: {
    maxHeight: 600,
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
    backgroundColor: colors.orange[700],
    // minWidth: "100%",
    // minHeight: "100%",
    color: "white",
    "&:hover": {
      backgroundColor: colors.orange[800],
    },
  },
  /*   btn:{
    backgroundColor: "#f11708",
    color: "white"
  } */
}));

function SendingAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    margin: 0,
    padding: theme.spacing(2),
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
  const [downloads, setDownloads] = useState([]);

  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");
  const [noRecord, setNoRecord] = useState("");
  const [fullname, setFullName] = useState("");
  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let dd = String(today.getDate() - 1).padStart(2, "0");
  let ddD = String(today.getDate()).padStart(2, "0");
  //let star = yyyy + '-' + mm + '-' + dd+'T21:00';
  let star = yyyy + "-" + mm + "-" + dd;
  let end = yyyy + "-" + mm + "-" + ddD;

  const [startingDate, setStarDate] = useState(star);
  const [endingDate, setEndDate] = useState(end);

  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 100);
    let val = Count + 100;
    //("value: ",val)
    return getPosts(search, group, paid, status, val, startingDate, endingDate);
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
    return getPosts(search, group, paid, status, val, startingDate, endingDate);
  };

  const handleChange = (event) => {
    if (event.target.name === "startingDate") {
      setStarDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "username") {
      setSearch(event.target.value);
    } else if (event.target.name === "group") {
      setGroup(event.target.value);
    } else if (event.target.name === "paid") {
      setPaid(event.target.value);
    } else if (event.target.name === "fullname") {
      setFullName(event.target.value);
    } else if (event.target.name === "status") {
      setStatus(event.target.value);
    } else if (event.target.name === "typeIN") {
      setTypeIN(event.target.value);
      // console.log("typeIN: ",event.target.value)
    } else {
      // setSearch(event.target.value);
    }
  };

  const handleClickSearchDate = () => {
    setCout(0);
    return getPosts(
      search,
      fullname,
      group,
      paid,
      status,
      0,
      startingDate,
      endingDate,
      TYPEIN
    );
  };

  const getPosts = useCallback(async (
    search,
    fullname,
    group,
    paid,
    status,
    val,
    startingDate,
    endingDate,
    TYPEIN
  ) => {
    setLoading(true);
    let GROUP;
    let STATUS;
    let PAYMENT;
    if (group === "ALL") {
      GROUP = "";
    } else {
      GROUP = group;
    }
    if (status === "ALL") {
      STATUS = "";
    } else {
      STATUS = status;
    }
    if (paid === "All") {
      PAYMENT = "";
    } else {
      PAYMENT = paid;
    }
    try {
      await api.get(
          `${Api.request.URL}/api/v2/fund/load/request?search=${
            search === undefined ? "" : search
          }&fullname=${fullname === undefined ? "" : fullname}&group=${group === undefined ? "" : GROUP}&status=${
            group === undefined ? "" : STATUS
          }&paid=${paid === undefined ? "" : PAYMENT}&start=${
            val === undefined ? 0 : val
          }&startDate=${
            startingDate === undefined ? star : startingDate
          }&endDate=${endingDate === undefined ? end : endingDate}&type=${
            TYPEIN === undefined ? "DIRECT" : "DIRECT"
          }`
        ).then((res) => {
          setPosts(res.data.data.data);
          setNextDisAble(false);
          //setTotalPage(res.data.DATA.total_page);
        }).catch((error) => {
          setPosts([]);
          setNoRecord("No Record Found!");
          setLoading(false);
          alert.error(error.response.data.message);
          if (error.response.data.message === "NO DATA FOUND") {
            setNextDisAble(true);
          } else {
          }
        });
    } catch (e) {
      setLoading(false);
    }

  },[star,end,alert]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleClickDownload = () => {
    setLoading(true);
    let PAIDSTAT;
    if (paid === "All") {
      PAIDSTAT = "";
    } else {
      PAIDSTAT = paid;
    }
    api
      .get(
        `${Api.request.URL}/api/v2/fund/load/request/download?search=${search}&fullname=${fullname}&group=${group}&status=${status}&paid=${PAIDSTAT}&startDate=${startingDate}&endDate=${endingDate}&type=DIRECT`
      )
      .then((res) => {
        setDownloads(res.data.data.data);
        document.getElementById("downloads").click();
        setLoading(false);
      })
      .catch((error) => {
        setNoRecord("No Record Found!");
        setLoading(false);
        alert.error(error.response.data.message);
      });

    //  setLoading(false);
  };

  const [approve, setApprove] = useState(false);
  const [paymentUpdate, setPaymentUpdate] = useState(false);
  const [getRequestWallet, setGetRequestWallet] = useState([]);
  const [RequestID, setRequestID] = useState("");

  const handleClickPayment = (e, id) => {
    setLoading(true);
    setRequestID(id);
    api
      .get(`${Api.request.URL}/api/v2/fund/load/request/${id}`)
      .then((res) => {
        setGetRequestWallet(res.data.data.data);
        setLoading(false);
        setPaymentUpdate(true);
      })
      .catch((error) => {
        if (error.response.data.status === false) {
          // alert.error(error.response.data.message);
          setLoading(false);
        } else {
        }
      });
  };

  const handleClickApprove = (e, id) => {
    setLoading(true);
    setRequestID(id);
    api
      .get(`${Api.request.URL}/api/v2/fund/load/request/${id}`)
      .then((res) => {
        setGetRequestWallet(res.data.data.data);
        setLoading(false);
        setApprove(true);
      })
      .catch((error) => {
        if (error.response.data.status === false) {
          // alert.error(error.response.data.message);
          setLoading(false);
        } else {
        }
      });
  };

  //console.log("getRequestWallet:" ,getRequestWallet) handleClickRollback
  let getWallet = {};
  getRequestWallet.map((RowWallet) => {
    return (getWallet = RowWallet);
  });

  const [sending, setSending] = useState(false);
  // const [playerRequestID, setPlayerIDRequestID] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [TypeMOP, setTypeMOP] = useState("UNPAID");
  const [wrongPassword, setWrongPassword] = React.useState("");
  // const [errorPass, setErrorPassword] = useState(false);
  const [NOTE, setPostNotes] = React.useState("");
  const [TYPEIN, setTypeIN] = React.useState("");
  // setPinPassword(true);

  const [password, setPassword] = useState("");
  //*************************************************** PAG APPROVE AND CANCEL SA REQUEST ************************************ */
  const handleClickSending = (playerID, status) => {
    // Api.request.authorized
    if (password === String(Api.request.authorized)) {
      let APIURL;
      let arrayAPPROVED;
      if (status === "APPROVED") {
        arrayAPPROVED = {
          reqId: RequestID,
          platinumId: playerID,
          userId: Api.request.userID,
          remarks: remarks,
          paid: TypeMOP,
        };
        //console.log("APPROVED");
        APIURL = `${Api.request.URL}/api/v2/fund/load/request/`;
      } else {
        arrayAPPROVED = {
          requestId: RequestID,
          remarks: remarks,
          userId: Api.request.userID,
        };
        //console.log("CANCELLED");
        APIURL = `${Api.request.URL}/api/v2/fund/request/cancel`;
      }

      setLoading(!backdropopen);
      api
        .post(APIURL, arrayAPPROVED, {
          headers: {
            Authorization: `Bearer ${Api.request.token}`,
          },
        })
        .then((res) => {
          const Updatepending = posts.findIndex(
            (item) => item.id === RequestID
          );
          const UpdatePost = posts;

          let VAL;
          if (status === "APPROVED") {
            VAL = "POSTED";
          } else {
            VAL = "CANCELLED";
          }

          if (res.data.message === "YOUR BALANCE IS INSUFICCIENT") {
            setWrongPassword(res.data.message);
            //  alert.error(res.data.message);
          } else {
            UpdatePost[Updatepending].paid = TypeMOP;
            UpdatePost[Updatepending].note = remarks;
            UpdatePost[Updatepending].status = VAL;
            UpdatePost[Updatepending].staff = Api.request.username;
            alert.success(res.data.message);
            setPosts(UpdatePost);
            setApprove(false);
          }

          // getPosts(setPosts);
        })
        .catch((error) => {
          setWrongPassword(error.response.data.message);
          // alert.error("ops");
        });
      setLoading(false);
    } else if (password === "") {
      setWrongPassword("*Required Password!*");
      // setErrorPassword(true)
      //alert.error('Required Password!');
    } else {
      // console.log
      setWrongPassword("*Wrong Password!*");
      // setErrorPassword(true)
    }
  };

  //*************************************************** PAG Update ng payment  ************************************ */
  const handleClickUpdatePayment = (playerID, status) => {
    // Api.request.authorized
    if (password === String(Api.request.authorized)) {
      const UpdatePayment = {
        reqId: RequestID,
        userId: Api.request.userID,
        paid: TypeMOP,
        remarks: NOTE,
      };

      setLoading(!backdropopen);
      api
        .post(
          `${Api.request.URL}/api/v2/fund/load/update/payment`,
          UpdatePayment
          // {
          //   headers: {
          //     Authorization: `Bearer ${Api.request.token}`,
          //   },
          // }
        )
        .then((res) => {
          const Updatepending = posts.findIndex(
            (item) => item.id === RequestID
          );
          const UpdatePost = posts;
          UpdatePost[Updatepending].paid = TypeMOP;

          alert.success(res.data.message);
          setPosts(UpdatePost);
          setPaymentUpdate(false);
          // getPosts(setPosts);
        })
        .catch((error) => {
          // alert.error(error.response.data.message);
          setWrongPassword(error.response.data.message);
        });
      setLoading(false);
    } else if (password === "") {
      alert.error("Required Password!");
    } else {
      // console.log
      setWrongPassword("*Wrong Password!*");
      //setErrorPassword(true);
      // alert.error('Wrong Password!');
    }
  };

  const handleCloseAppove = () => {
    setWrongPassword("");
    setApprove(false);
    setPaymentUpdate(false);

    setGetRequestWallet([]);
  };

  const handleSending = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSending(false);
  };

  //*************************************************** END PAG APPROVE AND CANCEL SA REQUEST ************************************ */
  const deactive = createTheme({
    palette: {
      secondary: {
        main: "#d84315",
      },
    },
  });
  const REDCOLOR = createTheme({
    palette: {
      primary: orange,
    },
  });

  const GREENCOLOR = createTheme({
    palette: {
      primary: green,
    },
  });
  const [openPaid, setOpenPaid] = React.useState(false);
  const [paidArray, setArrayPaid] = React.useState([]);

  const handleClose = () => {
    setOpenPaid(false);
    setWrongPassword("");
    setShowPlayer(false);
  };

  const handelClickOpenModalLLL = (e, id) => {
    setOpenPaid(true);
    api
      .get(`${Api.request.URL}/api/v2/fund/load/request/payment/history/${id}`)
      .then((res) => {
        setArrayPaid(res.data.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        setArrayPaid([]);
        //alert.error(error.response.data.message);
      });
  };

  const [showPlayer, setShowPlayer] = useState(false);
  const [PhotoReciept, setSrc] = useState("");

  const getSource = (e, photo) => {
    setSrc(photo);
    setShowPlayer(true);
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        fullWidth={true}
        // maxWidth={'md'}
        open={openPaid}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader className={classes.dialog} title="History" />

        {paidArray.length ? (
          paidArray.map((row, i) => {
            return (
              <List>
                <ListItem>
                  <ListItemText primary={"Status Payment : " + row.isPaid} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Process by  : " + row.processby} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Remarks : " + row.remarks} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      "Transaction Date : " + row.transactionDate.slice(0, 10)
                    }
                  />
                </ListItem>
              </List>
            );
          })
        ) : (
          <List>
            <ListItem>
              <Typography color="inherit">No Record</Typography>
            </ListItem>
          </List>
        )}
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                type="search"
                label="Username"
                name="username"
                onChange={handleChange}
                placeholder="Username"
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                type="search"
                label="Full Name"
                name="fullname"
                onChange={handleChange}
                placeholder="Full Name"
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="group"
                label="Player Type"
                value={group}
                onChange={handleChange}
                placeholder="Player Type"
                variant="outlined"
              >
                <MenuItem key={1} value={"ALL"}>
                  ALL
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
              </TextField>
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="paid"
                label="Pay Status"
                value={paid}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem key={1} value={"All"}>
                  All
                </MenuItem>
                <MenuItem key={2} value={"PAID"}>
                  PAID
                </MenuItem>
                <MenuItem key={3} value={"UNPAID"}>
                  UNPAID
                </MenuItem>
              </TextField>
            </Grid>

            {/* <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="typeIN"
                label="Type"
                value={TYPEIN}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem key={0} value={'ALL'}>
                  ALL
                </MenuItem>
                <MenuItem key={1} value={'DIRECT'}>
                  DIRECT
                </MenuItem>
                <MenuItem key={2} value={'WALLET'}>
                 WALLET
                </MenuItem>
               
              </TextField>
            </Grid> */}

            <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="status"
                label="Request Status"
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
                <MenuItem key={3} value={"CANCEL"}>
                  CANCELLED
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={2} xs={12}>
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
            <Grid item md={2} xs={12}>
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

            <Grid item md={2} xs={12}>
              <Button
                fullWidth={true}
                color="primary"
                onClick={handleClickDownload}
                variant="contained"
                type="submit"
                startIcon={<PrintIcon />}
                style={{ height: "55px" }}
                className={classes.ExcelButton}
              >
                Generate Excel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
        <ExcelSheet data={downloads} name="Request Points">
          <ExcelColumn
            label="Transaction#"
            value={(col) => "Transaction #" + col.id}
          />

          <ExcelColumn
            label="Date Request"
            value={(col) =>
              col.dateCreated === null
                ? ""
                : col.dateCreated.slice(0, 10) +
                  "  " +
                  col.dateCreated.slice(11, 19)
            }
          />
          <ExcelColumn
            label="Date Posted"
            value={(col) =>
              col.datePosted === null
                ? ""
                : col.datePosted.slice(0, 10) +
                  "  " +
                  col.datePosted.slice(11, 19)
            }
          />
          <ExcelColumn
            label="Date Cancelled"
            value={(col) =>
              col.dateCancel === null
                ? ""
                : col.dateCancel.slice(0, 10) +
                  "  " +
                  col.dateCancel.slice(11, 19)
            }
          />
          <ExcelColumn label="Type" value="player_type" />
          <ExcelColumn label="Player" value="player" />
          <ExcelColumn label="Full Name" value="fullname" />
          <ExcelColumn label="Ref #" value={(col) => col.refno} />

          <ExcelColumn
            label="Loaded Points"
            value={(col) =>
              col.points === null ? "" : col.points.toLocaleString()
            }
          />
          <ExcelColumn label="Status" value="status" />
          {/* <ExcelColumn label="Type" value="type"/> */}
          <ExcelColumn label="Status Payment" value="paid" />
          {/* <ExcelColumn label="Payment Details" value="payment_details"/> */}
          <ExcelColumn label="Remarks" value="note" />
          <ExcelColumn label="Assist By" value="staff" />
          {/* <ExcelColumn label="Link" value="ss_url" /> */}
        </ExcelSheet>
      </ExcelFile>

      <Box mt={1}></Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          id="emp"
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Transaction #</StyledTableCell>
              <StyledTableCell align="center">Date Request</StyledTableCell>
              <StyledTableCell align="center">Player</StyledTableCell>
              <StyledTableCell align="center">Full Name</StyledTableCell>
              <StyledTableCell align="left">Reference Number</StyledTableCell>
              <StyledTableCell align="center">Loaded Points</StyledTableCell>
              <StyledTableCell align="center">Request Status</StyledTableCell>
              <StyledTableCell align="center">Admin Remarks</StyledTableCell>
              <StyledTableCell align="center">Agent Remarks</StyledTableCell>
              <StyledTableCell align="center">Assist By</StyledTableCell>
              <StyledTableCell align="center">Link</StyledTableCell>
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
                          color="primary"
                          //onClick={e => handleClickApprove(e, row.id)}
                          // startIcon={<CheckCircleIcon />}
                        >
                          POSTED
                        </Button>
                      </ThemeProvider>
                    );
                    break;
                  case "CANCELLED":
                    buttonProcess = (
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Note</Typography>
                            <b>{row.note}</b>
                          </React.Fragment>
                        }
                      >
                        <ThemeProvider theme={REDCOLOR}>
                          <Button
                            // startIcon={<CancelIcon />}
                            color="primary"
                          >
                            CANCELLED
                          </Button>
                        </ThemeProvider>
                      </HtmlTooltip>
                    );
                    break;
                  default:
                    buttonProcess = (
                      <Button
                        color="primary"
                        className={classes.button}
                        // startIcon={<InfoIcon />}
                        onClick={(e) => handleClickApprove(e, row.id)}
                      >
                        PENDING
                      </Button>
                    );
                }

                let GROUP;
                if (row.player_type === "PLATINUM") {
                  GROUP = (
                    <Typography
                      align="center"
                      style={{
                        color: "gold",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {row.player_type}
                    </Typography>
                  );
                } else if (row.player_type === "AGENT") {
                  GROUP = (
                    <Typography
                      align="center"
                      style={{
                        color: "#564843",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      AGENT
                    </Typography>
                  );
                } else {
                  GROUP = (
                    <Typography
                      align="center"
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {row.player_type}
                    </Typography>
                  );
                }

                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">
                      Transaction #{row.id}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.dateCreated.slice(0, 10)}
                      <br></br>
                      {row.dateCreated.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="center" scope="row">
                      {row.player}
                      <br></br> {GROUP}
                    </StyledTableCell>

                    <StyledTableCell align="center" scope="row">
                      {row.fullname}
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      style={{ fontWeight: "bold" }}
                    >
                      Ref # {row.refno}
                    </StyledTableCell>

                    {row.paid === "PAID" ? (
                      <StyledTableCell
                        align="center"
                        style={{ color: "red", fontSize: "16px" }}
                      >
                        {row.points.toLocaleString()}
                        <br></br>
                        <Button
                          style={{ color: "green", fontSize: "12px" }}
                          onClick={(e) => handelClickOpenModalLLL(e, row.id)}
                          // startIcon={<CheckCircleIcon />}
                        >
                          {row.paid}
                        </Button>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell
                        align="center"
                        style={{ color: "red", fontSize: "16px" }}
                      >
                        {row.points.toLocaleString()}
                        <br></br>
                        {row.status === "CANCELLED" ? (
                          <Button
                            style={{ color: "orange", fontSize: "12px" }}
                            // onClick={e => handleClickPayment(e, row.id)}
                            // startIcon={<CancelIcon />}
                          >
                            CANCELLED
                          </Button>
                        ) : row.status === "PENDING" &&
                          row.paid === "UNPAID" ? (
                          <Button
                            style={{ color: "orange", fontSize: "12px" }}
                            // onClick={e => handleClickPayment(e, row.id)}
                            // startIcon={<CancelIcon />}
                          >
                            {row.paid}
                          </Button>
                        ) : (
                          <Button
                            style={{ color: "blue", fontSize: "12px" }}
                            onClick={(e) => handleClickPayment(e, row.id)}
                            // startIcon={<CancelIcon />}
                          >
                            {row.paid}
                          </Button>
                        )}
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                    {buttonProcess}
                      {/* {row.player_type === "DIRECT_PLAYER" ||
                      row.player_type === "AGENT"
                        ? row.status
                        : buttonProcess} */}
                      <br></br>
                      {row.datePosted === null ? (
                        <Typography style={{ fontSize: "12px" }}>
                          {row.dateCancel === null
                            ? ""
                            : row.dateCancel.slice(0, 10)}
                          <br></br>
                          {row.dateCancel === null
                            ? ""
                            : row.dateCancel.slice(11, 19)}
                        </Typography>
                      ) : (
                        <Typography style={{ fontSize: "12px" }}>
                          {row.datePosted === null
                            ? ""
                            : row.datePosted.slice(0, 10)}
                          <br></br>
                          {row.datePosted === null
                            ? ""
                            : row.datePosted.slice(11, 19)}
                        </Typography>
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">{row.note}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.agentNote}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.staff}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.ss_url === null ? (
                        ""
                      ) : (
                        <img
                          alt="Logo"
                          src={
                            "https://ezybetgame.s3.ap-southeast-1.amazonaws.com/proof_of_payment_receipt/" +
                            row.ss_url
                          }
                          style={{
                            width: "25%",
                            height: "50px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            getSource(e, row.ss_url);
                          }}
                        />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  key={1}
                  colSpan={10}
                >
                  {noRecord}
                </StyledTableCell>
              </StyledTableRow>
            )}
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
          <Grid item xs={1}>
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

      <Snackbar open={sending} autoHideDuration={6000} onClose={handleSending}>
        <SendingAlert onClose={handleSending} severity="success">
          This is a success message!
        </SendingAlert>
      </Snackbar>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={showPlayer}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Proof Of Payment Receipt
        </DialogTitle>

        <DialogContent>
          <div style={{ height: "100%" }}>
            <img
              alt="Logo"
              src={
                "https://ezybetgame.s3.ap-southeast-1.amazonaws.com/proof_of_payment_receipt/" +
                PhotoReciept
              }
              style={{ width: "100%" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {/*<Button autoFocus onClick={closePlayer} color="primary">
              Disagree
            </Button> */}
          <Button onClick={handleClose} style={Api.button_orange} autoFocus>
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {/* PAG APPROVED */}
      <Dialog
        open={approve}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader className={classes.dialog} title="Request Points" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              Username:
              <Typography variant="h6">{getWallet.username}</Typography>
            </Grid>

            <Grid item xs={6}>
              Request Points:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {getWallet.points === undefined
                  ? 0
                  : getWallet.points.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="age-native-simple">Select Status</InputLabel>
              <NativeSelect
                fullWidth={true}
                margin="dense"
                defaultValue={getWallet.paid}
                name="age"
                onChange={(e) => setTypeMOP(e.target.value)}
              >
                <option key={1} value={"PAID"}>
                  PAID
                </option>
                <option key={2} value={"UNPAID"}>
                  UNPAID
                </option>
              </NativeSelect>

              <TextField
                id="standard-number"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={3}
                autoFocus
                label="Remarks"
                type="text"
                margin="dense"
                onChange={(e) => setRemarks(e.target.value)}
                name="note"
                value={remarks}
                fullWidth
              />
              <TextField
                fullWidth={true}
                type="password"
                margin="dense"
                id="standard-basic"
                label="Password"
                required={true}
                name={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography style={{ color: "red" }}> {wrongPassword}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <DialogActions>
          <Button
            onClick={() => handleClickSending(getWallet.playerId, "APPROVED")}
            variant="contained"
            color="primary"
            //style={Api.button_green}
            type="submit"
          >
            Approve
          </Button>
          <ThemeProvider theme={deactive}>
            <Button
              onClick={() =>
                handleClickSending(getWallet.playerId, "CANCELLED")
              }
              variant="contained"
              style={Api.button_orange}
              //color="secondary"
              autoFocus
            >
              Cancelled
            </Button>
          </ThemeProvider>

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

      {/* PAG UPDATE NG PAYMENT STATUS */}

      <Dialog
        open={paymentUpdate}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader className={classes.dialog} title=" Payment Status" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              Username:
              <Typography variant="h6">{getWallet.username}</Typography>
            </Grid>

            <Grid item xs={6}>
              Points:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {getWallet.points}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="age-native-simple">Select Status</InputLabel>
              <NativeSelect
                fullWidth={true}
                margin="dense"
                defaultValue={getWallet.paid}
                name="age"
                onChange={(e) => setTypeMOP(e.target.value)}
              >
                <option key={1} value={"PAID"}>
                  PAID
                </option>
                <option key={2} value={"UNPAID"}>
                  UNPAID
                </option>
              </NativeSelect>

              <TextField
                id="standard-number"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={3}
                autoFocus
                label="Note"
                type="text"
                margin="dense"
                onChange={(e) => setPostNotes(e.target.value)}
                name="noted"
                fullWidth
              />
              <TextField
                fullWidth={true}
                type="password"
                margin="dense"
                id="standard-basic"
                label="Password"
                required={true}
                name={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography style={{ color: "red" }}> {wrongPassword}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <DialogActions>
          <Button
            onClick={() =>
              handleClickUpdatePayment(getWallet.playerId, "APPROVED")
            }
            variant="contained"
            color="primary"
            type="submit"
          >
            Update Payment
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
