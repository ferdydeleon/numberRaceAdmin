import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  withStyles,
  TableContainer,
  MenuItem,
  Paper,
  Button,
  CardContent,
  TextField,
  colors,
  Typography,
  // CardHeader
} from "@material-ui/core";
import api from "../../../axios";
import Api from "../../../Api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// import MuiAlert from '@material-ui/lab/Alert';
import { useAlert } from "react-alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  backColor: {
    backgroundColor: "black",
    color: "white",
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
  button: {
    color: theme.palette.common.white,
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
  ExcelButton: {
    backgroundColor: colors.orange[700],
    // minWidth: "100%",
    // minHeight: "100%",
    color: "white",
    "&:hover": {
      backgroundColor: colors.orange[800],
    },
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
  },
}))(TableRow);

const List = () => {
  const classes = useStyles();
  const [fund, setFund] = useState("fund");
  // const [totalPage, setTotalPage] = useState(0);
  // const [Page, setPage] = useState(0);
  const alert = useAlert();

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 50);
    let val = Count + 50;

    return RequestEvent(fund, val, startingDate, endingDate);
  };

  const handleBackPage = () => {
    setCout(Count - 50);
    let val = Count - 50;

    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return RequestEvent(fund, val, startingDate, endingDate);
  };

  // const handleSelectGame = event => {
  //   setFund(event.target.value);

  //   return RequestEvent(event.target.value);
  // };

  const [posts, setPosts] = useState([]);
  const [backdropopen, setLoading] = useState(false);
  const [totalFund, setTotalFund] = useState(0);
  const [totalDraw, setTotalDraw] = useState(0);

  // console.log("totalFund: ",totalFund)
  // console.log("totalDraw: ",totalDraw)
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

  const handleChange = (event) => {
    if (event.target.name === "startingDate") {
      setStarDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "fund") {
      setFund(event.target.value);
      setPosts([]);
    } else {
      // setSearch(event.target.value);
    }
  };

  const handleClickSearchDate = () => {
    return RequestEvent(fund, Count, startingDate, endingDate);
  };

  const RequestEvent = async (fund, Count, startingDate, endingDate) => {
    setLoading(true);
    // let FUND;
    // if (fund === undefined) {
    //   FUND = 'fund';
    // } else {
    //   FUND = fund;
    // }

    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/company/fund/history?type=${
            fund === undefined ? "" : fund
          }&start=${Count === undefined ? 0 : Count}&startDate=${
            startingDate === undefined ? star : startingDate
          }&endDate=${endingDate === undefined ? end : endingDate}`
        )
        .then((res) => {
          setPosts(res.data.data.data);
          let SEND = res.data.data.data.filter((x) => x.TYPE === "SEND");
          let COMPANY = res.data.data.data.filter((x) => x.TYPE === "COMPANY");

          const TOTAL_SEND = SEND.reduce((a, v) => (a = a + v.fund), 0);
          const TOTAL_COMPANY = COMPANY.reduce((a, v) => (a = a + v.fund), 0);

          // console.log('TOTALFUND: ', (TOTAL_COMPANY - TOTAL_SEND))
          // console.log('TOTAL_SEND: ',TOTAL_SEND)
          // console.log('TOTAL_COMPANY: ',TOTAL_COMPANY)
          let TOTALFUND = TOTAL_COMPANY - TOTAL_SEND;
          setTotalFund(
            TOTALFUND.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );

          setTotalDraw(
            res.data.data.data
              .reduce((a, v) => (a = a + v.points), 0)
              .toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          );

          setNextDisAble(false);
          setLoading(false);
        })
        .catch((error) => {
          setPosts([]);
          alert.error(error.response.data.message);
          if (error.response.data.message === "NO DATA FOUND") {
            setNextDisAble(true);
          } else {
          }
          setLoading(false);
        });
    } catch (e) {
      alert.error(e);
      console.log(e);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   RequestEvent();
  // }, []);

  const [downloads, setDownloads] = useState([]);
  const handleClickDownload = () => {
    setLoading(true);
    api
      .get(
        `${Api.request.URL}/api/v2/company/fund/history/download?type=${fund}&startDate=${startingDate}&endDate=${endingDate}`
      )
      .then((res) => {
        if (fund === "fund") {
          setDownloads(res.data.data.data);
          document.getElementById("downloads").click();
        } else {
          setDownloads(res.data.data.data);
          document.getElementById("downloadsDraw").click();
        }

        setLoading(false);
      })
      .catch((error) => {
        alert.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h4">
              {fund === "fund"
                ? "Total Fund: " + totalFund
                : "Total Draw Fund: " + totalDraw}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2}></Box>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="fund"
                label="Select Fund"
                value={fund}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem key={1} value={"fund"}>
                  Company Fund
                </MenuItem>
                <MenuItem key={2} value={"draw"}>
                  Draw Fund{" "}
                </MenuItem>
                {/* <MenuItem key={3} value={'banker'}>Banker Fund</MenuItem> */}
                <MenuItem key={3} value={"withdraw"}>
                  Withdraw Fund
                </MenuItem>
                <MenuItem key={4} value={"comission"}>
                  Commission Fund
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
        <ExcelSheet data={downloads} name="Company Fund">
          <ExcelColumn
            label="Transaction #"
            value={(col) => "Transaction #" + col.id}
          />
          <ExcelColumn
            label="Date Request"
            value={(col) =>
              col.transactionDate === null
                ? ""
                : col.transactionDate.slice(0, 10) +
                  "  " +
                  col.transactionDate.slice(11, 19)
            }
          />
          <ExcelColumn label="Username" value="username" />
          <ExcelColumn label="Type" value="TYPE" />
          <ExcelColumn label="Fund" value="fund" />
          <ExcelColumn label="Balance Before" value="balance_before" />
          <ExcelColumn label="balance After" value="balance_after" />
          <ExcelColumn label="Remarks" value="remarks" />
          <ExcelColumn label="Process By" value="processBy" />
        </ExcelSheet>
      </ExcelFile>

      <ExcelFile
        element={<Button id="downloadsDraw" fullWidth={true}></Button>}
      >
        <ExcelSheet data={downloads} name="Draw Fund">
          <ExcelColumn
            label="Transaction #"
            value={(col) => "Transaction #" + col.id}
          />
          <ExcelColumn
            label="Transaction Date"
            value={(col) =>
              col.transactionDate === null
                ? ""
                : col.transactionDate.slice(0, 10) +
                  "  " +
                  col.transactionDate.slice(11, 19)
            }
          />
          <ExcelColumn label="Type" value="transaction_type" />
          <ExcelColumn label="Points" value="points" />
          <ExcelColumn label="Balance Before" value="balance_before" />
          <ExcelColumn label="balance After" value="balance_after" />
        </ExcelSheet>
      </ExcelFile>

      <Box mt={3}></Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Transaction #</StyledTableCell>
              <StyledTableCell align="left">Transaction Date</StyledTableCell>
              {fund === "fund" ||
              fund === "withdraw" ||
              fund === "comission" ? (
                <StyledTableCell align="left">Username</StyledTableCell>
              ) : (
                ""
              )}
              {fund === "withdraw" || fund === "comission" ? (
                ""
              ) : (
                <StyledTableCell align="left">Type</StyledTableCell>
              )}
              {fund === "fund" ||
              fund === "withdraw" ||
              fund === "comission" ? (
                <StyledTableCell align="left">Fund</StyledTableCell>
              ) : (
                <StyledTableCell align="left">Points</StyledTableCell>
              )}
              <StyledTableCell align="left">Balance Before</StyledTableCell>
              <StyledTableCell align="left">Balance After</StyledTableCell>
              <StyledTableCell align="left">Remarks</StyledTableCell>
              <StyledTableCell align="left">Assist By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let VAL;
                if (fund === "withdraw" || fund === "comission") {
                  VAL = "";
                } else {
                  if (fund === "fund") {
                    VAL = (
                      <StyledTableCell align="left">{row.TYPE}</StyledTableCell>
                    );
                  } else {
                    VAL = (
                      <StyledTableCell align="left">
                        {row.transaction_type}
                      </StyledTableCell>
                    );
                  }
                }

                return (
                  <StyledTableRow hover key={i}>
                    <StyledTableCell align="left">
                      Transaction #{row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.transactionDate === null
                        ? ""
                        : row.transactionDate.slice(0, 10)}{" "}
                      <br></br>{" "}
                      {row.transactionDate === null
                        ? ""
                        : row.transactionDate.slice(11, 19)}
                    </StyledTableCell>
                    {fund === "fund" ||
                    fund === "withdraw" ||
                    fund === "comission" ? (
                      <StyledTableCell align="left">
                        {row.username}
                      </StyledTableCell>
                    ) : (
                      ""
                    )}
                    {VAL}
                    {fund === "fund" ||
                    fund === "withdraw" ||
                    fund === "comission" ? (
                      <StyledTableCell style={{ color: "red" }} align="left">
                        {row.fund === undefined || row.fund === null
                          ? "0"
                          : row.fund.toLocaleString()}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell style={{ color: "red" }} align="left">
                        {row.points === undefined || row.points === null
                          ? "0"
                          : row.points.toLocaleString()}
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="left">
                      {row.balance_before === null
                        ? 0
                        : row.balance_before.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row.balance_after === null
                        ? 0
                        : row.balance_after.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row.remarks}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row.processBy}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={9}>
                  No record found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {posts.length ? (
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
                className={classes.page}
                disabled={disable}
                startIcon={<ArrowBackIosIcon />}
                onClick={handleBackPage}
              >
                {" "}
              </Button>
              <Button
                className={classes.page}
                disabled={nextdisable}
                startIcon={<ArrowForwardIosIcon />}
                onClick={handleNextPage}
              >
                {" "}
              </Button>
            </Grid>
            {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
          </Box>
        ) : (
          ""
        )}

        <Backdrop className={classes.backdrop} open={backdropopen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </TableContainer>
    </div>
  );
};

export default List;
