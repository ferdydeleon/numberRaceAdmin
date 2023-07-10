import React, { useState, useEffect, useCallback } from "react";
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
// import InputLabel from '@material-ui/core/InputLabel';
import api from "../../../axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from '@material-ui/core/DialogContent';
import CardContent from "@material-ui/core/CardContent";
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import ListItem from "@material-ui/core/ListItem";
import CancelIcon from "@material-ui/icons/Cancel";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Card,
  Box,
  CardHeader,
  // List,
  // ListItemText,
  // Divider,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";
import { Paper, colors } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";

import ReactExport from "react-data-export";
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
    maxHeight: 500,
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
  // const [totalPage, setTotalPage] = useState(0);
  //search function here
  /* const [Page, setPage] = useState(0); */
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [statusS, setStatus] = useState("");
  //const [paid, setPaid] = useState('');
  const [fullname, setFullName] = useState("");
  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const [downloads, setDownloads] = useState([]);

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let dd = String(today.getDate() - 1).padStart(2, "0");
  let ddd = String(today.getDate()).padStart(2, "0");
  //let star = yyyy + '-' + mm + '-' + dd+'T21:00';
  let star = yyyy + "-" + mm + "-" + dd;
  let end = yyyy + "-" + mm + "-" + ddd;

  const [startingDate, setStarDate] = useState(star);
  const [endingDate, setEndDate] = useState(end);

  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 100);
    let val = Count + 100;

    return getPosts(search, group, statusS, val, startingDate, endingDate);
  };

  const handleBackPage = () => {
    setCout(Count - 100);
    let val = Count - 100;
    //  console.log("value: ", val)
    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return getPosts(search, group, statusS, val, startingDate, endingDate);
  };

  const handleChange = (event) => {
    if (event.target.name === "startingDate") {
      setStarDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "username") {
      setSearch(event.target.value);
    } else if (event.target.name === "group") {
      setGroup(event.target.value);
    } else if (event.target.name === "fullname") {
      setFullName(event.target.value);
    } else if (event.target.name === "paid") {
      //setPaid(event.target.value);
    } else if (event.target.name === "statusS") {
      setStatus(event.target.value);
    } else {
      // setSearch(event.target.value);
    }
  };

  const handleClickSearchDate = () => {
    return getPosts(search,fullname, group, statusS, 0, startingDate, endingDate);
  };

  const getPosts = useCallback(async (
    search,
    fullname,
    group,
    status,
    val,
    startingDate,
    endingDate
  ) => {
    setLoading(true);
    //("ALL" ,group)
    let GROUP;
    let PaymentStatus;
    if (group === "ALL") {
      GROUP = "";
    } else {
      GROUP = group;
    }
    if (status === "ALL") {
      PaymentStatus = "";
    } else {
      PaymentStatus = status;
    }

    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/withdraw/request?search=${
            search === undefined ? "" : search
          }&fullname=${fullname === undefined ? "" : fullname}&group=${group === undefined ? "" : GROUP}&status=${
            status === undefined ? "" : PaymentStatus
          }&start=${val === undefined ? 0 : val}&startDate=${
            startingDate === undefined ? star : startingDate
          }&endDate=${
            endingDate === undefined ? end : endingDate
          }&type=${"DIRECT"}`
        )

        .then((res) => {
          //console.log('res:', res.data.DATA.total_page);
          setNextDisAble(false);
          setPosts(res.data.data.data);
          //setTotalPage(res.data.DATA.total_page);
        })
        .catch((error) => {
          setPosts([]);
          setLoading(false);
          // alert.error(error.response.data.message);
          if (error.response.data.message === "NO DATA FOUND") {
            setNextDisAble(true);
          } else {
          }
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  },[star,end]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleClickDownload = () => {
    //return getDownload(search, group,paid, status,Count, startingDate, endingDate);
    ///api/v2/withdraw/request?search
    api
      .get(
        `${
          Api.request.URL
        }/api/v2/withdraw/request?search=${search}&fullname=${fullname}&group=${group==='ALL' ? '':group}&status=${statusS==='ALL' ? '':statusS}&startDate=${startingDate}&endDate=${endingDate}&type=${"DIRECT"}`
      )
      .then((res) => {
        setLoading(false);
        setDownloads(res.data.data.data);
        document.getElementById("downloads").click();
      })
      .catch((error) => {
        alert.error(error.response.data.message);
        setLoading(false);
      });
  };

  const [approve, setApprove] = useState(false);
  const [getRequestWallet, setGetRequestWallet] = useState([]);
  const [RequestID, setRequestID] = useState("");
  const handleClickApprove = (e, id) => {
    setLoading(true);
    setRequestID(id);
    api
      .get(`${Api.request.URL}/api/v2/withdraw/request/${id}`)
      .then((res) => {
        // console.log('res.data.data.data',res.data.data.data)
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
  // const [TypeMOP, setTypeMOP] = useState('');
  const [wrongPassword, setWrongPassword] = React.useState("");
  // const [errorPass, setErrorPassword] = useState(false);
  const [NOTE, setPostNotes] = React.useState("");

  const [password, setPassword] = useState("");

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
          remarks: NOTE,
          userId: Api.request.userID,
        };
        APIURL = `${Api.request.URL}/api/v2/withdraw/request`;
      } else {
        arrayAPPROVED = {
          requestId: RequestID,
          userId: Api.request.userID,
          remarks: NOTE,
        };
        // console.log(arrayAPPROVED);
        APIURL = `${Api.request.URL}/api/v2/withdraw/request/cancel`;
      }
      // console.log('arrayAPPROVED',arrayAPPROVED)
      // console.log('arrayAPPROVED: ', arrayAPPROVED)
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
          // let VAL;
          let MESSAGE;
          if (
            res.data.message ===
            "YOU'RE NOT ALLOWED TO APPROVE! USER POINTS IS INSUFFICIENT!"
          ) {
            // VAL = 'PENDING';
            MESSAGE = res.data.message;
            UpdatePost[Updatepending].status = "PENDING";
            UpdatePost[Updatepending].note = "";
            UpdatePost[Updatepending].staff = "";
            alert.error(
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                {MESSAGE}
              </div>
            );
          } else if (res.data.message === "Invalid user group") {
            // VAL = 'PENDING';
            MESSAGE = res.data.message;
            UpdatePost[Updatepending].status = "PENDING";
            UpdatePost[Updatepending].note = "";
            UpdatePost[Updatepending].staff = "";
            alert.success(<div style={{ fontSize: "20px" }}>{MESSAGE}</div>);
          } else if (res.data.message === "NO REQUEST FOUND") {
            // VAL = 'PENDING';
            MESSAGE = res.data.message;
            UpdatePost[Updatepending].status = "PENDING";
            UpdatePost[Updatepending].note = "";
            UpdatePost[Updatepending].staff = "";
            alert.success(<div style={{ fontSize: "20px" }}>{MESSAGE}</div>);
          } else if (
            res.data.message === "REQUEST WITHDRAW SUCCESSFULLY POSTED"
          ) {
            // VAL = 'POSTED';
            MESSAGE = res.data.message;
            UpdatePost[Updatepending].status = "POSTED";
            UpdatePost[Updatepending].note = NOTE;
            UpdatePost[Updatepending].staff = Api.request.username;
            alert.success(<div style={{ fontSize: "20px" }}>{MESSAGE}</div>);
          } else if (
            res.data.message === "Withdrawal request is successfully cancelled!"
          ) {
            // VAL = 'POSTED';
            MESSAGE = res.data.message;
            UpdatePost[Updatepending].status = "CANCEL";
            UpdatePost[Updatepending].note = NOTE;
            UpdatePost[Updatepending].staff = Api.request.username;
            alert.success(<div style={{ fontSize: "20px" }}>{MESSAGE}</div>);
          } else {
            alert.error("error!!");
          }
          setApprove(false);
          setPosts(UpdatePost);
          //("1")
        })
        .catch((error) => {
          // setWrongPassword("")
          setWrongPassword(error.response.data.message);
        });
      setLoading(false);
    } else if (password === "") {
      // alert.error('Required Password!');
      setWrongPassword("*Required Password!*");
      // setErrorPassword(true);
    } else {
      // console.log
      // alert.error('Wrong Password!');
      setWrongPassword("*Wrong Password!*");
      //  setErrorPassword(true);
    }
  };

  const handleCloseAppove = () => {
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
      primary: red,
    },
  });

  const GREENCOLOR = createTheme({
    palette: {
      primary: green,
    },
  });

  // const [amount, setamount] = useState("");
  // const [merchantRemarks, SetMerchantRemarks] = useState("");
  // const [payment_channel, setpayment_channel] = useState("");
  // const [statusCheck, setStatusCheck] = useState("");
  // const [UserNamee, setUserNamee] = useState("");
  // const [merchantID, setMerchantID] = useState(null);

  // const [paymentDetails, setPaymentDetails] = useState(false);

  // const handleClickViewStatus = (e, id, username) => {
  //   setLoading(true);
  //   setMerchantID(id);
  //   setUserNamee(username);

  //   const CheckStat = {
  //     merchant_order_num: id,
  //   };

  //   api
  //     .post(`${Api.request.URL}/api/v2/gpt/check_withdraw`, CheckStat)
  //     .then((res) => {
  //       setLoading(false);
  //       let _payment =
  //         res.data.data && JSON.parse(res.data.data.replace("/", ""));
  //       console.log(_payment.amount);
  //       setPaymentDetails(true);
  //       setamount(_payment.amount);
  //       SetMerchantRemarks(_payment.merchant_order_remark);
  //       setpayment_channel(_payment.gateway);
  //       setStatusCheck(_payment.status);
  //     })
  //     .catch((error) => {
  //       alert.error(error.response.data.msg);
  //       setLoading(false);
  //     });
  // };

  // const [openPosted, setOpenPosted] = useState(false);
  // const handleClickPosted = () => {
  //   setOpenPosted(true);
  // };

  // const handleClickRollback = () => {
  //   if (password === Api.request.authorized) {
  //     setLoading(true);
  //     //setPaymentDetails(false);
  //     // setOpenPosted(false);
  //     const withdrawRollback = {
  //       merchant_order_num: merchantID,
  //       password: password,
  //     };
  //     api
  //       .post(
  //         `${Api.request.URL}/api/v2/gpt/withdraw/rollback`,
  //         withdrawRollback
  //       )
  //       .then((res) => {
  //         setLoading(false);
  //         console.log("res: ", res.data);
  //         alert.success(res.data.msg);
  //       })
  //       .catch((error) => {
  //         console.log("error: ", error.response.data);
  //         alert.error(error.response.data.msg);
  //         setLoading(false);
  //       });
  //   } else {
  //     setWrongPassword("*Error Password!*");
  //   }
  // };

  // const handleClose = () => {
  //   setOpenPosted(false);
  //   setWrongPassword("");
  // };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
        <ExcelSheet data={downloads} name="Request Points">
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
            label="Date Canceled"
            value={(col) =>
              col.datecancel === null
                ? ""
                : col.datecancel.slice(0, 10) +
                  " " +
                  col.datecancel.slice(11, 19)
            }
          />
          <ExcelColumn label="Type" 
                      value={(col) =>
                            col.player_type === "AGENT"
                            ? "DIRECT_PLAYER"
                            : col.player_type
              }
            />

          <ExcelColumn label="Player" value="username" />
          <ExcelColumn label="Full Name" value="fullname" />
          <ExcelColumn label="Account Name" value="account_name" />
          <ExcelColumn label="Account Number" value="account_number" />
          <ExcelColumn
            label="Request Points"
            value={(col) =>
              col.points === null
                ? 0
                : col.points.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
            }
          />
          
          <ExcelColumn label="Status" value="status" />
          <ExcelColumn
            label="Remarks"
            value={(col) => (col.note === null ? "" : col.note)}
          />
          <ExcelColumn label="Assist By" value="staff" />
        </ExcelSheet>
      </ExcelFile>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                type="search"
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
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="group"
                label="Select Player Type"
                value={group}
                onChange={handleChange}
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
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="statusS"
                label="Select Status Request"
                value={statusS}
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
          </Grid>

          <Grid container spacing={3}>
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
                onClick={handleClickSearchDate}
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

      <Box mt={3}></Box>

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
              <StyledTableCell align="left">Date Request</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">Full Name</StyledTableCell>
              <StyledTableCell align="left">Account Name</StyledTableCell>
              <StyledTableCell align="left">Account #</StyledTableCell>
              <StyledTableCell align="center">
                Request Withdraw Points
              </StyledTableCell>
              <StyledTableCell align="center">Request Status</StyledTableCell>

              <StyledTableCell align="center">Admin Remarks</StyledTableCell>
              <StyledTableCell align="center">Player Remarks</StyledTableCell>
              <StyledTableCell align="center">Assist By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                //let statuMessage;
                let buttonProcess;
                switch (row.status) {
                  case "POSTED":
                    buttonProcess = (
                      <ThemeProvider theme={GREENCOLOR}>
                        <Button
                          color="primary"
                          //onClick={e => handleClickApprove(e, row.id)}
                          startIcon={<CheckCircleIcon />}
                        >
                          POSTED
                        </Button>
                      </ThemeProvider>
                    );

                    break;
                  case "CANCEL":
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
                          <Button startIcon={<CancelIcon />} color="primary">
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
                        startIcon={<InfoIcon />}
                        onClick={(e) => handleClickApprove(e, row.id)}
                      >
                        PENDING
                      </Button>
                    );
                }

                let player_type;
                if (row.player_type === "PLATINUM") {
                  player_type = (
                    <Typography
                      align="left"
                      style={{
                        color: "#ffc107",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {row.player_type}
                    </Typography>
                  );
                } else if (row.player_type === "AGENT") {
                  player_type = (
                    <Typography
                      align="left"
                      style={{
                        color: "#6d4c41",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                   {row.player_type} 
                    </Typography>
                  );
                } else {
                  player_type = (
                    <Typography
                      align="left"
                      style={{
                        color: "#3949ab",
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
                    <StyledTableCell align="left">
                      {row.datecreated.slice(0, 10)}
                      <br></br>
                      {row.datecreated.slice(11, 19)}
                    </StyledTableCell>

                    <StyledTableCell align="left" scope="row">
                      {row.username}
                      <br></br>
                      {player_type}
                    </StyledTableCell>
                    <StyledTableCell align="left" scope="row">
                      {row.fullname}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ fontWeight: "bold" }}>
                      {row.account_name}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ fontWeight: "bold" }}>
                      {row.account_number}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ color: "red" }}>
                      {row.points.toLocaleString()}{" "}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.player_type === "AGENT" ||
                      player_type === "DIRECT_PLAYER"
                        ? row.status
                        : buttonProcess}
                      <br></br>
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

                    <StyledTableCell align="center">{row.note}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.agentNote}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.staff}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" key={1} colSpan={9}>
                  No records found!
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
        open={approve}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader
          className={classes.dialog}
          title="Players Request Withdraw"
        />
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
                required={true}
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
                margin="dense"
                id="standard-basic"
                label="Password"
                type="password"
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
            // color="primary"
            style={Api.button_green}
            type="submit"
          >
            Approve
          </Button>
          <ThemeProvider theme={deactive}>
            <Button
              onClick={() => handleClickSending(getWallet.playerId, "CANCEL")}
              variant="contained"
              style={Api.button_orange}
              // color="secondary"
              autoFocus
            >
              Cancel
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

      {/* <Dialog
        open={paymentDetails}
        maxWidth={"sm"}
        fullWidth={true}
        onClose={handleCloseAppove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CardHeader
          className={classes.dialog}
          title={`Payment Status (${UserNamee})`}
        />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary={"Amount : " + amount.toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Remark  : " + merchantRemarks} />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Get Way  : " + payment_channel} />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Status  : " + statusCheck} />
            </ListItem>
          </List>
        </CardContent>
        <Divider />
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
            <Button
              onClick={handleClickPosted}
              variant="contained"
              color="primary"
              autoFocus
            >
              Process
            </Button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog> */}

      {/* <Dialog
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

          <Button onClick={handleClickRollback} color="primary">
            Posted
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};
export default App;
