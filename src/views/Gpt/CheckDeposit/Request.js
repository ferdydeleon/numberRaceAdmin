import React, { useEffect, useState } from "react";
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
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import ListItem from "@material-ui/core/ListItem";
import CardContent from "@material-ui/core/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
// import Tooltip from '@material-ui/core/Tooltip';
import {
  Card,
  Box,
  colors,
  CardHeader,
  Paper,
  Divider,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";

import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// const HtmlTooltip = withStyles(theme => ({
//   tooltip: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9'
//   }
// }))(Tooltip);

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
    textAlign: "Left",
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
    backgroundColor: colors.orange[700],
    // minWidth: "100%",
    // minHeight: "100%",
    color: "white",
    "&:hover": {
      backgroundColor: colors.orange[800],
    },
  },
  BoldName: {
    fontSize: 24,
  },
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

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
  const [totalPage, setTotalPage] = useState(0);
  //search function here
  /* const [Page, setPage] = useState(0); */
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

  const [REF, setREF] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "startingDate") {
      setStarDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "username") {
      setSearch(event.target.value);
    } else if (event.target.name === "fullname") {
      setFullName(event.target.value);
    } else if (event.target.name === "group") {
      setGroup(event.target.value);
    } else if (event.target.name === "paid") {
      setPaid(event.target.value);
    } else if (event.target.name === "status") {
      setStatus(event.target.value);
    } else if (event.target.name === "typeIN") {
      setTypeIN(event.target.value);
    } else if (event.target.name === "ref") {
      setREF(event.target.value);
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
      TYPEIN,
      REF
    );
  };

  const getPosts = async (
    search,
    fullname,
    group,
    paid,
    status,
    val,
    startingDate,
    endingDate,
    TYPEIN,
    REF
  ) => {
    setLoading(true);
    let GROUP;
    let STATUS;
    let PAYMENT;
    let TYPE;
    let REFERENCE;
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

    if (TYPEIN === "All") {
      TYPE = "";
    } else {
      TYPE = TYPEIN;
    }

    if (REF === "All") {
      REFERENCE = "";
    } else {
      REFERENCE = REF;
    }

    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/fund/load/request?search=${
            search === undefined ? "" : search
          }&fullname=${fullname === undefined ? "" : fullname}&group=${
            group === undefined ? "" : GROUP
          }&status=${group === undefined ? "" : STATUS}&paid=${
            paid === undefined ? "" : PAYMENT
          }&start=${val === undefined ? 0 : val}&startDate=${
            startingDate === undefined ? star : startingDate
          }&endDate=${
            endingDate === undefined ? end : endingDate
          }&type=WALLET&ref=${REF === undefined ? "" : REFERENCE}`
        )
        .then((res) => {
          setPosts(res.data.data.data.filter((e) => e.type === "WALLET"));
          //setPosts(res.data.data.data);
          setNextDisAble(false);
        })
        .catch((error) => {
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
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleClickDownload = () => {
    setLoading(true);
    api
      .get(
        `${Api.request.URL}/api/v2/fund/load/request/download?search=${search}&fullname=${fullname}&group=${group}&status=${status}&paid=${paid}&startDate=${startingDate}&endDate=${endingDate}}&ref=${REF}`
      )
      .then((res) => {
        // console.log("download: ",res.data.data.data);
        setDownloads(res.data.data.data.filter((e) => e.type === "WALLET"));

        //setDownloads(res.data.data.data);
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
  const [paymentDetails, setPaymentDetails] = useState(false);
  const [paymentUpdate, setPaymentUpdate] = useState(false);
  const [getRequestWallet, setGetRequestWallet] = useState([]);
  const [RequestID, setRequestID] = useState("");

  const [amount, setamount] = useState("");

  const [payment_channel, setpayment_channel] = useState("");
  const [UserNamee, setUserNamee] = useState("");

  const [merchantID, setMerchantID] = useState(null);
  const [statusCheck, setStatusCheck] = useState("");
  const [merchantRemarks, SetMerchantRemarks] = useState("");

  const handleClickViewPayment = (e, id, username) => {
    console.log("refno: ", id);
    setLoading(true);
    setMerchantID(id);
    setUserNamee(username);
    try {
      setUserNamee(username);
      const CheckStat = {
        merchant_order_num: id,
      };

      api
        .post(`${Api.request.URL}/api/v2/gpt/check_deposit`, CheckStat)
        .then((res) => {
          setLoading(false);
          let _payment =
            res.data.data && JSON.parse(res.data.data.replace("/", ""));
          console.log(_payment.amount);
          setPaymentDetails(true);
          setamount(_payment.amount);
          SetMerchantRemarks(_payment.merchant_order_remark);
          setpayment_channel(_payment.gateway);
          setStatusCheck(_payment.status);
          switch (_payment.gateway) {
            case "gcash":
              setpayment_channel(
                <img
                  alt="Logo"
                  src="/paymentChannel/gcash.png"
                  style={{ width: "50%" }}
                />
              );
              break;
            case "paymaya":
              setpayment_channel(
                <img
                  alt="Logo"
                  src="/paymentChannel/paymaya.png"
                  style={{ width: "50%" }}
                />
              );
              break;
            default:
            // code block
          }
        })
        .catch((error) => {
          alert.error(error.response.data.msg);
          setLoading(false);
        });
    } catch (e) {}
  };

  //console.log("getRequestWallet:" ,getRequestWallet) handleClickRollback
  let getWallet = {};
  getRequestWallet.map((RowWallet) => {
    return (getWallet = RowWallet);
  });

  const [sending, setSending] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [TypeMOP, setTypeMOP] = useState("");
  const [wrongPassword, setWrongPassword] = React.useState("");
  const [errorPass, setErrorPassword] = useState(false);
  const [NOTE, setPostNotes] = React.useState("");
  const [TYPEIN, setTypeIN] = React.useState("");
  // setPinPassword(true);

  const [password, setPassword] = useState("");
  //*************************************************** PAG APPROVE AND CANCEL SA REQUEST ************************************ */

  const handleChangeEEE = (event) => {
    if (event.target.name === "Username") {
      console.log(event.target.value);
      // console.log('1')
      // } else if (event.target.name === 'UserName') {
      //   // console.log('2')
      //   setUsername(event.target.value);
      // } else if (event.target.name === 'password') {
      //   // console.log('3')
      //   setPassword(event.target.value);
      // // } else if (event.target.name === 'confirmPassword') {
      // //   console.log('4')
      //   setConfirmPassword(event.target.value);
    } else {
      // console.log('5')
      // setSearch(event.target.value);
    }
  };

  const handleClickSending = (playerID, status) => {
    // Api.request.authorized
    if (password == Api.request.authorized) {
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

          UpdatePost[Updatepending].paid = TypeMOP;
          UpdatePost[Updatepending].note = remarks;
          UpdatePost[Updatepending].status = VAL;
          UpdatePost[Updatepending].staff = Api.request.username;

          alert.success(res.data.message);
          setPosts(UpdatePost);
          setApprove(false);

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
    if (password == Api.request.authorized) {
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
          UpdatePayment,
          {
            headers: {
              Authorization: `Bearer ${Api.request.token}`,
            },
          }
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
      setErrorPassword(true);
      // alert.error('Wrong Password!');
    }
  };

  const handleCloseAppove = () => {
    setWrongPassword("");
    setApprove(false);
    setPaymentUpdate(false);
    setPaymentDetails(false);
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

  const handleClose = () => {
    setOpenPosted(false);
  };

  const [openPosted, setOpenPosted] = useState(false);
  const handleClickPosted = () => {
    setPaymentUpdate(false);
    setOpenPosted(true);
  };

  const handleClickDepositPosted = () => {
    if (password === Api.request.authorized) {
      setLoading(true);
      setPaymentDetails(false);
      setOpenPosted(false);
      const deposit = {
        merchant_order_num: merchantID,
        password: password,
      };
      api
        .post(`${Api.request.URL}/api/v2/gpt/deposit`, deposit)
        .then((res) => {
          setLoading(false);
          console.log("res: ", res.data);
          alert.success(res.data.msg);
        })
        .catch((error) => {
          console.log("error: ", error.response.data);
          alert.error(error.response.data.msg);
          setLoading(false);
        });
    } else {
      setWrongPassword("*Error Password!*");
    }
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
                type="search"
                label="Ref#"
                name="ref"
                onChange={handleChange}
                placeholder="Reference #"
                variant="outlined"
              />
            </Grid>

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

          <Grid container spacing={3}>
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
        <ExcelSheet data={downloads} name="Cashin Report">
          <ExcelColumn label="Ref #" value={(col) => "Ref #" + col.id} />

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
          <ExcelColumn label="Username" value="player" />
          <ExcelColumn label="Full Name" value="fullname" />
          <ExcelColumn
            label="Cashin Points"
            value={(col) =>
              col.points === null ? "" : col.points.toLocaleString()
            }
          />
          {/* <ExcelColumn
            label="Fee"
            value={(col) =>
              col.fee === null ? "" : col.fee.toLocaleString()
            }
          /> */}
          <ExcelColumn label="Status" value="status" />
          {/* <ExcelColumn label="Status Payment" value="paid" />
           <ExcelColumn label="Type" value="type"/>  */}
          <ExcelColumn label="Payment Channel" value="payment_channel" />
          <ExcelColumn label="Staff" value="staff" />
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
              <StyledTableCell align="Left">Ref #</StyledTableCell>
              <StyledTableCell align="Left">Date Request</StyledTableCell>
              <StyledTableCell align="Left">Username</StyledTableCell>
              <StyledTableCell align="Left">Full Name</StyledTableCell>
              <StyledTableCell align="Left">Amount</StyledTableCell>
              {/* <StyledTableCell align="Left">Fee</StyledTableCell> */}
              <StyledTableCell align="Left">Status</StyledTableCell>
              <StyledTableCell align="Left">Payment Channel</StyledTableCell>
              <StyledTableCell align="Left">Action</StyledTableCell>
              <StyledTableCell align="Left">Staff</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let buttonProcess;
                let checkStatusGPT;
                switch (row.status) {
                  case "POSTED":
                    buttonProcess = (
                      <ThemeProvider theme={GREENCOLOR}>
                        <Typography
                          color="primary"
                          //onClick={e => handleClickApprove(e, row.id)}
                          // startIcon={<CheckCircleIcon />}
                        >
                          POSTED
                        </Typography>
                      </ThemeProvider>
                    );

                    break;
                  case "CANCEL":
                    buttonProcess = (
                      <ThemeProvider theme={REDCOLOR}>
                        <Typography
                          // startIcon={<CancelIcon />}
                          color="primary"
                        >
                          CANCELLED
                        </Typography>
                      </ThemeProvider>
                    );
                    break;
                  default:
                    buttonProcess = (
                      <Typography
                        color="primary"
                        className={classes.button}
                        // startIcon={<InfoIcon />}
                        // onClick={e => handleClickApprove(e, row.id)}
                      >
                        PENDING
                      </Typography>
                    );
                }

                let GROUP;
                if (row.player_type === "PLATINUM") {
                  GROUP = (
                    <b
                      align="Left"
                      style={{
                        color: "gold",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {row.player_type}
                    </b>
                  );
                } else if (row.player_type === "AGENT") {
                  GROUP = (
                    <b
                      align="Left"
                      style={{
                        color: "#564843",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {row.player_type}
                    </b>
                  );
                } else {
                  GROUP = (
                    <b
                      align="Left"
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {row.player_type}
                    </b>
                  );
                }

                checkStatusGPT =
                  Api.request.username === "accounting_aly" ? (
                    ""
                  ) : (
                    <Button
                      color="primary"
                      onClick={(e) =>
                        handleClickViewPayment(
                          e,
                          row.refno === null ? row.id : row.refno,
                          row.player
                        )
                      }
                      // startIcon={<CheckCircleIcon />}
                    >
                      Check Status
                    </Button>
                  );

                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">
                      Ref #{row.refno === null ? row.id : row.refno}
                    </StyledTableCell>
                    <StyledTableCell align="Left">
                      {row.dateCreated.slice(0, 10)}
                      <br></br>
                      {row.dateCreated.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="Left" scope="row">
                      {row.player}
                      <br></br> {GROUP}
                    </StyledTableCell>
                    <StyledTableCell align="Left" scope="row">
                      {row.fullname}
                    </StyledTableCell>
                    <StyledTableCell align="Left">
                      {row.points === null ? "0" : row.points.toLocaleString()}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">{row.fee}</StyledTableCell> */}
                    <StyledTableCell align="Left">
                      {buttonProcess}
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
                    <StyledTableCell align="Left">
                      {row.payment_channel}
                    </StyledTableCell>
                    <StyledTableCell align="Left">
                      {checkStatusGPT}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.staff}</StyledTableCell>
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
          <Grid item xs={0}>
            <Button
              disabled={disable}
              startIcon={<ArrowBackIosIcon />}
              onClick={handleBackPage}
            ></Button>
            <Button
              disabled={nextdisable}
              startIcon={<ArrowForwardIosIcon />}
              onClick={handleNextPage}
            ></Button>
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
        open={paymentDetails}
        fullWidth={true}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader
          className={classes.dialog}
          title={"User: " + "" + UserNamee + ""}
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              PAYMENT DETAILS
              <Typography variant="h6" gutterBottom>
                Payment Channel
              </Typography>
            </Grid>

            <Grid item xs={6}>
              {payment_channel}
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Amount:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {amount.toLocaleString()}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Remark:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {merchantRemarks}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Status:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {statusCheck}
              </Typography>
            </Grid>

            {/* <Grid item xs={6}>
            Message:
                <Typography variant="h6" style={{ color: 'red' }} gutterBottom>
                {messagE}
              </Typography>
            </Grid> */}

            {/* <Grid item xs={6}>
              Date Created:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {created}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Update:
              <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                {paid_at}
              </Typography>
            </Grid> */}
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

          {statusCheck === "success" || statusCheck === "success_done" ? (
            ""
          ) : (
            <Button
              onClick={handleClickPosted}
              variant="contained"
              color="primary"
              autoFocus
            >
              Process
            </Button>
          )}
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
            //color="primary"
            style={Api.button_green}
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
            //color="primary"
            style={Api.button_green}
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

      <Dialog
        open={openPosted}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Deposit Posted</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter Your Password</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleClickDepositPosted} color="primary">
            Posted
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default React.memo(App);
