import React, { useState, useEffect, useCallback } from "react";
// import Pagination from '@material-ui/lab/Pagination';
import {
  Box,
  Grid,
  Card,
  MenuItem,
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
import Api from "../../../Api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAlert } from "react-alert";
import PrintIcon from "@material-ui/icons/Print";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ReactExport from "react-data-export";
import { actualIncome, reportGameList } from "../../../adminModel/reportData";
import getdate from "../../../utils/date";
import { fetchgamelist } from "../../../adminModel/data";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
  const [noData, setNoData] = useState("");

  const [startingDate, setStarDate] = useState(getdate.start);
  const [endingDate, setEndDate] = useState(getdate.end);
  const [search, setSearch] = useState('');

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
        if(search===''){
          setSearch(true);
        }else{
          return RequestEvent(search, Count, startingDate, endingDate);
        }
   
  };


  const RequestEvent = useCallback((search, val, startingDate, endingDate) => {
    setLoading(true);
    async function fetchData() {
      const results = await actualIncome(search, val, startingDate, endingDate);
      if (results === "NO DATA FOUND") {
        setPosts([]);
        setNoData(results);
        setNextDisAble(true);
        setLoading(false);
      } else {
        setPosts(results);
        setNextDisAble(false);
        setLoading(false);
      }
    }
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    RequestEvent();
  }, [RequestEvent]);


  const [gameList, setGamelist] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const getGamelist = await fetchgamelist();
      setGamelist(getGamelist);
    }
    fetchData().catch(console.error);
  }, []);


  const handleClickDownload = () => {
    setLoading(true);
    async function fetchData() {
      const results = await reportGameList(search,startingDate, endingDate);
      if (results === "NO DATA FOUND") {
        alert.error(results);
        setLoading(false);
      } else {
        setLoading(false);
        setDownloads(results);
        document.getElementById("downloads").click();
      }
    }
    fetchData().catch(console.error);
  };


  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={2} xs={12}>
              
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Game"
                    value={search}
                    name="search"
                    onChange={handleChange}
                    variant="outlined"
                    required
                  >
                    <MenuItem key={0} value={""}>Test</MenuItem>
                    {gameList.map((g, i) => (
                      <MenuItem key={i+1} value={g.game_code}>
                        {g.game_name}
                      </MenuItem>
                    ))}
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
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let GAMECODE;
                switch (row.game_code) {
                  case "DOTA":
                    GAMECODE = (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/details/${row.event_id}/${row.game_type}/${row.withBanka}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    );
                    break;
                  case "NBA":
                    GAMECODE = (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/details/${row.event_id}/${row.game_type}/${row.withBanka}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    );
                    break;
                  case "MOBILE_LEGEND":
                    GAMECODE = (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/details/${row.event_id}/${row.game_type}/${row.withBanka}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    );
                    break;
                  case "SABONG":
                    GAMECODE = (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/details/${row.event_id}/${row.game_type}/${row.withBanka}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    );
                    break;
                  case "DROP_BALL":
                    GAMECODE = (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/details/${row.event_id}/${row.game_type}/${row.withBanka}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    );
                    break;
                  case "COLOR_GAME":
                    GAMECODE = (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/app/reports/event/details/${row.event_id}/${row.game_type}/${row.withBanka}/${row.event_name}/${row.game_code}`}
                      >
                        Details
                      </Button>
                    );
                    break;
                  default:
                }
                return (
                  <StyledTableRow hover key={i}>
                    <StyledTableCell align="left">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">{GAMECODE}</StyledTableCell>
                    <StyledTableCell align="left"> {row.created_date.slice(0, 10)} <br></br>{row.created_date.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.event_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={12}>
                  {noData}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {posts.length === 100 ?
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
        </Box> : null}
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default List;
