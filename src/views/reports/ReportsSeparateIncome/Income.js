import React, { useState, useEffect, useCallback} from "react";
// import Pagination from '@material-ui/lab/Pagination';
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
  Paper,
  Button,
  CardContent,
  TextField,
  colors,
} from "@material-ui/core";
import api from "../../../axios";
import Api from "../../../Api";
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// import localStorageService from '../../auth/localStorageService';
// import MuiAlert from '@material-ui/lab/Alert';
// import { Search as SearchIcon } from 'react-feather';
import { useAlert } from "react-alert";
import PrintIcon from "@material-ui/icons/Print";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
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
  button_hover_green: {
    background: "linear-gradient(45deg, #fff 30%, #fff 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: "#4caf50",
    height: 35,
    padding: "0 18px",
    //boxShadow: 'rgb(183 236 184) 0px 3px 5px 2px',//'0 3px 5px 2px rgba(255, 105, 135, .3)',
    "&:hover": {
      background: "linear-gradient(45deg, #4caf50 30%, #81c784 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 18px",
      boxShadow: "rgb(31 74 32) 0px 3px 5px 2px", //'0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  },
  button_hover_blue: {
    background: "linear-gradient(45deg, #fff 30%, #fff 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: "#2196F3",
    height: 35,
    padding: "0 18px",
    //boxShadow: 'rgb(183 236 184) 0px 3px 5px 2px',//'0 3px 5px 2px rgba(255, 105, 135, .3)',
    "&:hover": {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 10px",
      boxShadow: "0 3px 5px 2px #0461aa", //'0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  },
  button_hover_red: {
    background: "linear-gradient(45deg, #fff 30%, #fff 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: "#dc004e",
    height: 35,
    padding: "0 15px",
    "&:hover": {
      background: "linear-gradient(45deg, #dc004e 30%, #e33371 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 15px",
      boxShadow: "rgb(109 8 42) 0px 3px 5px 2px", //'0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  },
  button_hover_orange: {
    background: "linear-gradient(45deg, #fff 30%, #fff 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: "#ff9800",
    height: 35,
    padding: "0 10px",
    "&:hover": {
      background: "linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 10px",
      boxShadow: "rgb(123 91 1) 0px 3px 5px 2px", //'0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  },
  button_hover_indigo: {
    background: "linear-gradient(45deg, #fff 30%, #fff 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: "#3f51b5",
    height: 35,
    padding: "0 16px",
    "&:hover": {
      background: "linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)", ///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 16px",
      boxShadow: "rgb(11 28 123) 0px 3px 5px 2px", //'0 3px 5px 2px rgba(255, 105, 135, .3)',
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
  // const [ResponseMessage, setResponseMessage] = useState('');
  // const [game, setGame] = useState('');

  // const [Page, setPage] = useState(0);
  const alert = useAlert();

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 100);
    let val = Count + 100;
    // console.log("value: ",val)
    return RequestEvent(search, val, startingDate, endingDate);
  };

  const handleBackPage = () => {
    setCout(Count - 100);
    let val = Count - 100;
    //console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return RequestEvent(search, val, startingDate, endingDate);
  };

  const [posts, setPosts] = useState([]);
  const [backdropopen, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [downloads, setDownloads] = useState([]);

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let dd = String(today.getDate()).padStart(2, "0");
  //let star = yyyy + '-' + mm + '-' + dd+'T21:00';
  let star = yyyy + "-" + mm + "-" + dd;
  let end = yyyy + "-" + mm + "-" + dd;

  const [startingDate, setStarDate] = useState(star);
  const [endingDate, setEndDate] = useState(end);
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "startingDate") {
      setStarDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "endingDate") {
      setEndDate(event.target.value);
    } else if (event.target.name === "search") {
      setSearch(event.target.value);
    } else {
      // setSearch(event.target.value);
    }
  };

  const handleClickSearch = () => {
    return RequestEvent(search, Count, startingDate, endingDate);
  };

  const RequestEvent = useCallback(async (search, val, startingDate, endingDate) => {
    setLoading(true);
    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/report/event/list?game_code=${search === undefined ? '' : search
          }&start=${val === undefined ? 0 : val}&limit=10&from=${
            startingDate === undefined ? star : startingDate
          }&to=${endingDate === undefined ? end : endingDate}`
        )
        .then((res) => {
          // console.log("res:",res.data.data.data)
          setPosts(res.data.data.data);
          setNextDisAble(false);
          setLoading(false);
        })
        .catch((error) => {
          setPosts([]);
          // console.log("error:",error.response.data.message)
          alert.error(error.response.data.message);
          if (error.response.data.message === "NO DATA FOUND") {
            setNextDisAble(true);
          } else {
          }
          setLoading(false);
        });
    } catch (e) {
      // setResponseMessage(e);
      console.log(e);
    }
    setLoading(false);
  },[star,end,alert]);

  useEffect(() => {
    RequestEvent();
  }, [RequestEvent]);

  // const [gameList, setGamelist] = useState([]);
  // useEffect(() => {
  //   api
  //     .get(`${Api.request.URL}/api/v2/Game`)
  //     .then((res) => {
  //       // console.log("game list: ", res.data.data.data);
  //       setGamelist(res.data.data.data);
  //     })
  //     .catch((error) => {}); ////.
  // }, []);

  console.log("handleClickDownload: ", search);
  const handleClickDownload = () => {
    //return getDownload(search, group,paid, status,Count, startingDate, endingDate);
    api
      .get(
        `${Api.request.URL}/api/v2/report/event/list?game_code=${'SABONG'}&start=0&from=${startingDate}&to=${endingDate}`
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

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {/* <Grid item md={2} xs={12}>
                {Api.request.username === "yna_navarro" ? (
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Game"
                    value={search}
                    name="search"
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem key={4} value={"SABONG"}>
                      SABONG
                    </MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Game"
                    defaultValue={"SABONG"}
                    name="search"
                    onChange={handleChange}
                    variant="outlined"
                  >
                

                    {gameList.map((g, i) => (
  <MenuItem key={i} value={g.game_code}>
    {g.game_name}
  </MenuItem>
))}
                  </TextField>
                )}
              </Grid> */}
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
                  onClick={handleClickSearch}
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
                  style={{ height: '55px' }}
                  className={classes.ExcelButton}
                >
                  Generate Excel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
          <ExcelSheet data={downloads} name="Event">
            <ExcelColumn
              label="Date"
              value={(col) => col.created_date.slice(0, 10)}
            />
            <ExcelColumn label="Event Name" value="event_name" />
            <ExcelColumn
              label="Min Bet"
              value={(col) =>
                col.minBet === null
                  ? 0
                  : col.minBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Max Bet"
              value={(col) =>
                col.maxBet === null
                  ? 0
                  : col.maxBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Agent"
              value={(col) =>
                col.agent === null
                  ? 0
                  : col.agent.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Company"
              value={(col) =>
                col.company === null
                  ? 0
                  : col.company.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />

            <ExcelColumn label="Status" value="status" />
          </ExcelSheet>
        </ExcelFile>
      </Box>
      <Box mt={3}> </Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">View</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Event Name</StyledTableCell>
              {/* <StyledTableCell align="left">Meron Bet</StyledTableCell>
              <StyledTableCell align="left">Wala Bet</StyledTableCell>
              <StyledTableCell align="left">Draw Bet</StyledTableCell>
              <StyledTableCell align="left">Draw Loss</StyledTableCell>
              <StyledTableCell align="left">Draw Income</StyledTableCell>
              <StyledTableCell align="left">Company Income</StyledTableCell> 
              <StyledTableCell align="left">Agent Commission</StyledTableCell>    */}
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                // console.log("length: ",posts.length)
                /* "eventID": 17,
                "event_name": "oct 22",
                "fight": 23,
                "created_date": "2021-10-22T03:05:11.000Z" */
                // let URLencode = encodeURIComponent(row.event_name);
                //console.log(encodeURI)
                return (
                  <StyledTableRow hover key={i}>
                    <StyledTableCell align="left">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/seperate/income/details/${row.event_id}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.created_date.slice(0, 10)} <br></br>{" "}
                      {row.created_date.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.event_name}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">{row.meronBet === null ? "0.00":row.meronBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</StyledTableCell>
                    <StyledTableCell align="left">{row.walaBet === null ? "0.00":row.walaBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }</StyledTableCell>
                    <StyledTableCell align="left">{row.drawBet=== null ? "0.00":row.drawBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }</StyledTableCell>
                    <StyledTableCell align="left">{row.drawLoss=== null ? "0.00":row.drawLoss.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }</StyledTableCell>
                    <StyledTableCell align="left">{row.drawIncome=== null ? "0.00":row.drawIncome.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }</StyledTableCell>

                    <StyledTableCell align="left">{row.company_income=== null ? "0.00":row.company_income.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }</StyledTableCell>
                  <StyledTableCell align="left">{row.ma_comission=== null ? "0.00":row.ma_comission.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }</StyledTableCell> */}
                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={12}>
                  No record found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <TablePagination
              rowsPerPageOptions={1}
              component="div"
              count={Count}
              rowsPerPage={Val}
              page={Page}   
              onChangePage={handleNextPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
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
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default List;
