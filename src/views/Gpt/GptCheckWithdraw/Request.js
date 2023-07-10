import React, { useEffect, useState, useRef } from "react";
import Api from "../../../Api";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import api from "../../../axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import CardContent from "@material-ui/core/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";
import ReactExport from "react-data-export";

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
  const [posts, setPosts] = useState([]);
  const [downloads, setDownloads] = useState([]);

  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");
  const [noRecord, setNoRecord] = useState("");
  const [fullname, setFullName] = useState("");
  const [Count, setCout] = useState(0);

  const [amount, setamount] = useState("");
  const [payment_channel, setpayment_channel] = useState("");
  const [UserNamee, setUserNamee] = useState("");
  const [merchantID, setMerchantID] = useState(null);
  const [statusCheck, setStatusCheck] = useState("");
  const [merchantRemarks, SetMerchantRemarks] = useState("");
  const [paymentStatus, setStatusPayment] = useState("");


  const [remarks, setRemarks] = useState("");
  const [wrongPassword, setWrongPassword] = React.useState("");
  const [NOTE, setPostNotes] = React.useState("");
  const [TYPEIN, setTypeIN] = React.useState("");
  const [getRequestWallet, setGetRequestWallet] = useState([]);
  const [RequestID, setRequestID] = useState("");
  const [password, setPassword] = useState("");

  const [sending, setSending] = useState(false);
  const [approve, setApprove] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(false);
  const [paymentUpdate, setPaymentUpdate] = useState(false);
  const [backdropopen, setLoading] = React.useState(false);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let ddD = String(today.getDate()).padStart(2, "0");
  let star = yyyy + "-" + mm + "-" + ddD;
  let end = yyyy + "-" + mm + "-" + ddD;

  const [startingDate, setStarDate] = useState(star);
  const [endingDate, setEndDate] = useState(end);

  const handleNextPage = () => {
    setDisAble(false);
    console.log(Count);
    setCout(Count + 10);
    let val = Count + 10;
    //("value: ",val)
    return getPosts(search, group, paid, status, val, startingDate, endingDate);
  };

  const handleBackPage = () => {
    setCout(Count - 10);
    let val = Count - 10;
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

  const getPosts = async (
    search,
    fullname,
    group,
    status,
    val,
    startingDate,
    endingDate,
  ) => {
    setLoading(true);
    let GROUP;
    let STATUS;

    
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


    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/withdraw/request?search=${
            search === undefined ? "" : search
          }&fullname=${fullname === undefined ? "" : fullname}&group=${group === undefined ? "" : GROUP}&status=${
            status === undefined ? "" : STATUS
          }&start=${val === undefined ? 0 : val}&startDate=${
            startingDate === undefined ? star : startingDate
          }&endDate=${
            endingDate === undefined ? star : endingDate
          }&type=WALLET`
        )
        .then((res) => {
          setPosts(res.data.data.data);
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
        `${Api.request.URL}/api/v2/withdraw/request/download?search=${search}&fullname=${fullname}&group=${group}&status=${group}&startDate=${startingDate}&endDate=${endingDate}&type=WALLET`
      )
      .then((res) => {
        // console.log("download: ",res.data.data.data);
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


  const handleClickViewPayment = (e, id, username, status,idrollback) => {
    setLoading(true);
    setUserNamee(username);
    setStatusPayment(status);
    try {
      setUserNamee(username);
      const CheckStat = {
        merchant_order_num: id,
      };

      api
        .post(`${Api.request.URL}/api/v2/gpt/check_withdraw`, CheckStat)
        .then((res) => {
          setLoading(false);
          let _payment =  res.data.data && JSON.parse(res.data.data.replace("/", ""));
          console.log('_payment.status: ',_payment.status)
          if(_payment.status === "fail"){
            setMerchantID(idrollback);
          }else{
            setMerchantID(id);
          }

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
         // alert.error(error.response.data.msg);
          setPaymentDetails(true);
          console.log('error22: ',idrollback)
          setMerchantID(idrollback);
          setStatusCheck(error.response.data.msg)
          setLoading(false);
        });
    } catch (e) {}
  };

  //console.log("getRequestWallet:" ,getRequestWallet) handleClickRollback
  let getWallet = {};
    getRequestWallet.map((RowWallet) => {
    return (getWallet = RowWallet);
  });


  // setPinPassword(true);
  //*************************************************** PAG APPROVE AND CANCEL SA REQUEST ************************************ */

  const handleClickSending = (playerID, status) => {
    // Api.request.authorized
    if (password === Api.request.authorized) {
      let APIURL;
      let arrayAPPROVED;
      if (status === "APPROVED") {
        arrayAPPROVED = {
          reqId: RequestID,
          platinumId: playerID,
          userId: Api.request.userID,
          remarks: remarks,
          paid: "",
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

          UpdatePost[Updatepending].paid = "";
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
    if (password === Api.request.authorized) {
      const UpdatePayment = {
        reqId: RequestID,
        userId: Api.request.userID,
        paid: "",
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
          UpdatePost[Updatepending].paid = "";

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
  const [openPaid, setOpenPaid] = React.useState(false);
  const [paidArray, setArrayPaid] = React.useState([]);

  const handleClose = () => {
    setOpenPaid(false);
    setOpenPosted(false)
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
      console.log(merchantID)
      const deposit = {
        merchant_order_num: merchantID,
        password: password,
      };
      api
        .post(`${Api.request.URL}/api/v2/gpt/withdraw/rollback`, deposit)
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

  const tableRef = useRef(null);


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

            <Grid item md={3} xs={12}>
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
                <MenuItem key={3} value={"ROLLBACK"}>
                  ROLLBACK
                </MenuItem>
              </TextField>
            </Grid>

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
        <ExcelSheet data={downloads} name="Cashout Report">
          <ExcelColumn
            label="Transaction #"
            value={(col) => "Transaction #" + col.id}
          />
          <ExcelColumn
            label="Date Request"
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
              col.dateposted === null
                ? ""
                : col.dateposted.slice(0, 10) +
                  "  " +
                  col.dateposted.slice(11, 19)
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
          <ExcelColumn label="Type" value="player_type" />
          <ExcelColumn label="Username" value="username" />
          <ExcelColumn label="Full Name" value="fullname" />
          <ExcelColumn
            label="Account Name"
            value={(col) =>
              col.details == [{}] || col.details == null
                ? ""
                : JSON.parse(col.details).card_holder
            }
          />

          <ExcelColumn
            label="Account Number"
            value={(col) =>
              col.details == [{}] || col.details == null
                ? ""
                : JSON.parse(col.details).card_number
            }
          />
          <ExcelColumn
            label="Received Withdrawn Amount"
            value={(col) =>
              col.points === null ? "" : col.points.toLocaleString()
            }
          />

          <ExcelColumn
            label="Fee"
            value={(col) => (col.fee === null ? "" : col.fee.toLocaleString())}
          />
          <ExcelColumn label="Status" value="status" />
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
          ref={tableRef}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Ref #</StyledTableCell>
              <StyledTableCell align="center">Date Request</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Full Name</StyledTableCell>
              <StyledTableCell align="center">Account Name</StyledTableCell>
              <StyledTableCell align="center">Account Number</StyledTableCell>
              <StyledTableCell align="center">Withdrawn Amount</StyledTableCell>
              <StyledTableCell align="center">Fee</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Payment Channel</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center">Staff</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let buttonProcess;
                let checkStatusGPT;
                let dateUPDATE;
                if (row.dateposted == null) {
                  dateUPDATE = row.datecancel;
                } else if (row.datecancel == null) {
                  dateUPDATE = row.dateposted;
                } else {
                  dateUPDATE = "";
                }
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
                  case "ROLLBACK":
                    buttonProcess = (
                      <ThemeProvider theme={REDCOLOR}>
                        <Typography
                          // startIcon={<CancelIcon />}
                          color="primary"
                        >
                          ROLLBACK
                        </Typography>
                      </ThemeProvider>
                    );
                    break;
                  default:
                    buttonProcess = (
                      <Typography color="primary" className={classes.button}>
                        PENDING
                      </Typography>
                    );
                }

                let GROUP;
                if (row.player_type === "PLATINUM") {
                  GROUP = (
                    <b
                      align="center"
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
                      align="center"
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
                      align="center"
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

                checkStatusGPT = Api.request.username === "accounting_aly" ? "" : (
                  <Button
                    color="primary"
                    onClick={(e) =>
                      handleClickViewPayment(
                        e,
                        row.refno === null  ? row.id:row.refno,
                        row.username,
                        row.status,
                        row.id
                      )
                    }
                    // startIcon={<CheckCircleIcon />}
                  >
                    Check Status
                  </Button>
                );

                let obj;
                try {
                  obj = JSON.parse(row.details === null ? [{}] : row.details);
                } catch (e) {
                  obj = [{}];
                }

                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">
                      Ref #{row.refno === null ? row.id:row.refno}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.datecreated.slice(0, 10)}
                      <br></br>
                      {row.datecreated.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="center" scope="row">
                      {row.username}
                      <br></br> {GROUP}
                    </StyledTableCell>
                    <StyledTableCell align="center" scope="row">
                      {row.fullname}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {obj.card_holder}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {obj.card_number}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.points === null ? "0" : row.points.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.fee === null ? "0" : row.fee.toLocaleString()}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {buttonProcess}
                      {row.dateposted === null ? (
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
                          {row.dateposted === null
                            ? ""
                            : row.dateposted.slice(0, 10)}
                          <br></br>
                          {row.dateposted === null
                            ? ""
                            : row.dateposted.slice(11, 19)}
                        </Typography>
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.payment_channel}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {checkStatusGPT} 
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      {row.note}
                    </StyledTableCell>*/}
                    <StyledTableCell align="center">
                      {row.staff} 
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
                  colSpan={11}
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
          // title={"Payment Details "+ "("+UserNamee+")"}
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


          {paymentStatus === "POSTED" ||  paymentStatus === "ROLLBACK" ? ("") :  statusCheck === "success" || statusCheck === "success_done"  || statusCheck === "waiting" ? (
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
        <DialogTitle id="form-dialog-title">Rollback</DialogTitle>
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
            Rollback
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default React.memo(App);
