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
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import Api from "../../../Api";
import { Search as SearchIcon } from "react-feather";
import { useAlert } from "react-alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { fetchgamelist } from "../../../adminModel/data";
import { eventChangeStatus, eventList } from "src/adminModel/eventData";
import Edit from "./Edit";
import Color from "../../../utils/colors";
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
  container: {
    maxHeight: 500,
  },
  page: {
    "& .MuiPaginationItem-page.Mui-selected": {
      color: "#fff",
      backgroundColor: Api.paginationColor.color,
    },
  },
  importButton: {
    marginRight: theme.spacing(1),
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
    return RequestEvent(search, game);
  };

  const [posts, setPosts] = useState([]);
  const [backdropopen, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const RequestEvent = useCallback((search, game, val) => {
    setLoading(true);
    async function fetchData() {
      const results = await eventList(search, game, val);
      console.log('results: ',results)
      if (results === "NO DATA FOUND") {
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

  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [eventpassID, setEventPassID] = React.useState("");
  
  const HandleOpenUpdate = (id) => {
    setOpenModalEdit(!openModalEdit);
    setEventPassID(id);
  };



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
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
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
                    <StyledTableCell align="left">
                      {row.arena_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={(e) =>
                          handleChangeStatus(e, row.id, row.STATUS)
                        }
                      >
                        {row.STATUS}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.importButton}
                        style={{backgroundColor:Color.buttonGreen,color:Color.white}}
                        onClick={() => HandleOpenUpdate(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.importButton}
                        style={{backgroundColor:Color.buttonGreen,color:Color.white}}
                        href={`/app/event/assigned/declarator/${row.id}`}
                      >
                        Assigned
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        className={classes.importButton}
                        style={{backgroundColor:Color.buttonGreen,color:Color.white}}
                        href={`/app/event/button/${row.id}/${row.game_type}`}
                      >
                        Manage Button
                      </Button>
                    </StyledTableCell>
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
              ></Button>
            </Grid>
          </Box>
        ) : (
          ""
        )}
      </TableContainer>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Edit
        status={openModalEdit}
        handleClose={HandleOpenUpdate}
        eventID={eventpassID}
      />


    </div>
  );
};

export default List;
