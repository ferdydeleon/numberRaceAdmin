import React, { useState, useEffect, useCallback } from "react";
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
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Search as SearchIcon } from "react-feather";
// import { useAlert } from 'react-alert';
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Color from "../../../utils/colors";
import { fetchgamelist } from "../../../adminModel/data";
import { eventList } from "src/adminModel/eventData";

const useStyles = makeStyles((theme) => ({
  root: {
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
  container: {
    maxHeight: 500,
  },
 
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Color.headColor,
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
  const [search, setSearch] = useState("");
  const [game, setGame] = useState("");
  // const alert = useAlert();
  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 100);
    let val = Count + 100;
    // console.log("value: ",val)
    return RequestEvent(search, game, val);
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
    return RequestEvent(search, game, val);
  };

  const handleSelectGame = (event) => {
    setGame(event.target.value);
    return RequestEvent(search, event.target.value);
  };

  const handleClickSearch = () => {
    //let Page = 1;
    return RequestEvent(search, game);
  };

  const [posts, setPosts] = useState([]);
  const [backdropopen, setLoading] = useState(false);
  const [nodata, setNodata] = useState('');

  const RequestEvent = useCallback(async (search, game, val) => {
    setLoading(true);
    async function fetchData() {
      const results = await eventList(search, game, val);
      if (results === "NO DATA FOUND") {
        //console.log(results.length);
        setNodata(results)
        setPosts([]);
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

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="game"
                label="Select Game"
                value={game}
                onChange={handleSelectGame}
                variant="outlined"
              >
                {gameList.map((g, i) => (
                  <MenuItem key={i} value={g.game_name}>
                    {g.game_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3} xs={12}>
              <Box>
                <TextField
                  fullWidth={true}
                  type="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          style={{ cursor: "pointer" }}
                          fontSize="small"
                          color="action"
                          onClick={handleClickSearch}
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Events"
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={3}></Box>

      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Event Name</StyledTableCell>
              <StyledTableCell align="left">Game</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">View Fight</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                // console.log("length: ",posts.length)
                let STATUS;
                switch (row.STATUS) {
                  case "CLOSE":
                    STATUS = (
                      <StyledTableCell
                        style={{ color: Color.red, fontWeight: 500 }}
                        align="left"
                      >
                        CLOSE
                      </StyledTableCell>
                    );
                    break;
                  case "SHOW":
                    STATUS = (
                      <StyledTableCell
                        style={{ color: Color.blue, fontWeight: 500 }}
                        align="left"
                      >
                        SHOW
                      </StyledTableCell>
                    );
                    break;
                  case "OPEN":
                    STATUS = (
                      <StyledTableCell
                        style={{ color: Color.green, fontWeight: 500 }}
                        align="left"
                      >
                        OPEN
                      </StyledTableCell>
                    );
                    break;
                  case "CANCEL":
                    STATUS = (
                      <StyledTableCell
                        style={{ color: Color.orange, fontWeight: 500 }}
                        align="left"
                      >
                        CANCEL
                      </StyledTableCell>
                    );
                    break;
                  default:
                }
                let URLencode = encodeURIComponent(row.event_name);
                return (
                  <StyledTableRow hover key={i}>
                    <StyledTableCell align="left">{row.id}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.created_date.slice(0, 10)} <br></br>
                      {row.created_date.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.event_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.game_name}
                    </StyledTableCell>
                    {STATUS}
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small" //${row.event_name} "2-Hits / 3-Hits Combo Promo @ Mavins Center"
                        className={classes.button}
                        href={`/app/event/deal/${row.id}/${URLencode}`}
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={9}>
                  {nodata}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={totalPage}
                  rowsPerPage={rowsPerPage}
                  page={Page}
                  onChangePage={handleNextPage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                /> */}
        {posts.length ? (
          <Box
            mt={2}
            display="flex"
            m={1}
            p={1}
            justifyContent="center"
            className={classes.root}
          >
            <Grid item>
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
          ""
        )}
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default List;
