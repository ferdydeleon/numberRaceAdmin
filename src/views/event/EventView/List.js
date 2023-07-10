import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  MenuItem,
  TableHead,
  TableRow,
  makeStyles,
  withStyles,
  TableContainer,
  Paper,
  Button,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  CardHeader,
} from "@material-ui/core";
// import api from "../../../axios";
import Api from "../../../Api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Search as SearchIcon } from "react-feather";
import { useAlert } from "react-alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { fetchgamelist } from "../../../adminModel/data";
import { eventChangeStatus, eventList } from "src/adminModel/eventData";
// import { result } from "lodash";
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
  const [search, setSearch] = useState("");
  const [game, setGame] = useState("");
  const alert = useAlert();

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 20);
    let val = Count + 20;
    // console.log("value: ",val)
    return RequestEvent(search, game, val);
  };

  const handleBackPage = () => {
    setCout(Count - 20);
    let val = Count - 20;
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
  // const [error, setError] = useState(false);
  const RequestEvent = useCallback((search, game, val) => {
    setLoading(true);
    async function fetchData() {
      const results = await eventList(search, game, val);
      if (results === "NO DATA FOUND") {
        //console.log(results.length);
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

  const [changeStatus, setOpenChangeStatus] = React.useState(false);
  const [eventID, setEventID] = React.useState(false);
  const [EventSTATUS, setStatus] = React.useState("");

  const handleChangeStatus = (e, id, status) => {
    setOpenChangeStatus(true);
    setStatus(status);
    setEventID(id);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenChangeStatus(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleFormChangeStatus = (e) => {
    e.preventDefault();
    setLoading(true);
    async function fetchData() {
      const arrayStatus = {
        id: eventID,
        status: EventSTATUS,
        userId: Api.request.userID,
      };
      const results = await eventChangeStatus(arrayStatus);
      alert.success(results);
      const sample = posts.findIndex((item) => item.id === eventID);
      const newArena = posts;
      newArena[sample].STATUS = EventSTATUS;
      setLoading(false);
      setOpenChangeStatus(false);
    }
    fetchData().catch(console.error);
    setOpenChangeStatus(false);
  };

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
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={changeStatus}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader className={classes.dialog} title="Change Status" />
        <form onSubmit={handleFormChangeStatus}>
          <DialogContent>
            <TextField
              fullWidth={true}
              select
              SelectProps={{
                native: true,
              }}
              label="Select Status"
              value={EventSTATUS}
              onChange={handleChange}
              variant="outlined"
            >
              <option value={"OPEN"}>OPEN</option>
              <option value={"SHOW"}>SHOW</option>
              <option value={"CLOSE"}>CLOSE</option>
              <option value={"CANCEL"}>CANCEL</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
              className={classes.button_hover_orange}
            >
              Exit
            </Button>
            <Button
              variant="contained"
              type="submit"
              className={classes.button_hover_green}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
                {/* <MenuItem value={"ALL"}>ALL</MenuItem> */}
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
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Event Name</StyledTableCell>
              <StyledTableCell align="left">Game Type</StyledTableCell>
              <StyledTableCell align="left">Arena</StyledTableCell>
              {/* <StyledTableCell align="left">Agent</StyledTableCell>
                <StyledTableCell align="left">Company</StyledTableCell> */}
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let status;
                let status_event;
                if (row.STATUS === "OPEN") {
                  status_event = (
                    <Button
                      variant="contained"
                      // style={//Api.button_green}
                      size="small"
                      className={classes.button_hover_green}
                      onClick={(e) => handleChangeStatus(e, row.id, row.STATUS)}
                    >
                      {row.STATUS}
                    </Button>
                  );
                  status = (
                    <Button
                      variant="contained"
                      //style={//Api.button_blue}
                      size="small"
                      className={classes.button_hover_blue}
                      // startIcon={<VisibilityIcon />}
                      href={`/app/event/edit/${row.id}/${row.STATUS}`}
                    >
                      View
                    </Button>
                  );
                } else if (row.STATUS === "CLOSE") {
                  status_event = (
                    <Button
                      variant="contained"
                      //style={Api.button_red}
                      size="small"
                      className={classes.button_hover_red}
                      onClick={(e) => handleChangeStatus(e, row.id, row.STATUS)}
                    >
                      {" "}
                      {row.STATUS}
                    </Button>
                  );

                  status = (
                    <Button
                      variant="contained"
                      //style={//Api.button_blue}
                      size="small"
                      className={classes.button_hover_blue}
                      href={`/app/event/edit/${row.id}/${row.STATUS}`}
                      // startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  );
                } else if (row.STATUS === "CANCEL") {
                  status_event = (
                    <Button
                      variant="contained"
                      //  style={//Api.button_orange}
                      size="small"
                      onClick={(e) => handleChangeStatus(e, row.id, row.STATUS)}
                      className={classes.button_hover_orange}
                    >
                      {" "}
                      {row.STATUS}
                    </Button>
                  );
                  status = (
                    <Button
                      variant="contained"
                      // style={//Api.button_blue}
                      size="small"
                      className={classes.button_hover_blue}
                      href={`/app/event/edit/${row.id}/${row.STATUS}`}
                      // startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  );
                } else {
                  status_event = (
                    <Button
                      size="small"
                      variant="contained"
                      //style={//Api.button_indigo}
                      className={classes.button_hover_indigo}
                      onClick={(e) => handleChangeStatus(e, row.id, row.STATUS)}
                    >
                      {row.STATUS}
                    </Button>
                  );

                  status = (
                    <Button
                      variant="contained"
                      //style={Api.button_blue}
                      size="small"
                      className={classes.button_hover_blue}
                      href={`/app/event/edit/${row.id}/${row.STATUS}`}
                      // startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  );
                }
                // console.log("length: ",posts.length)
                return (
                  <StyledTableRow hover key={i}>
                    <StyledTableCell align="left">{row.id}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.created_date.slice(0, 10)} <br></br>{" "}
                      {row.created_date.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.event_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.game_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.arena_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {status_event}
                    </StyledTableCell>
                    <StyledTableCell align="left">{status}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={9}>
                  NO DATA FOUND!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {posts.length === 20 ? (
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
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default List;
