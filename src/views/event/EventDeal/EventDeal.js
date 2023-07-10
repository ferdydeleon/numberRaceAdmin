import React, { useState, useEffect,useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  CardContent,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Search as SearchIcon } from "react-feather";
// import { useAlert } from "react-alert";
import Color from "../../../utils/colors";
import { eventFight } from "src/adminModel/eventData";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Color.headColor,
    color: Color.tableTextColor,
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    maxHeight: 900,
  },

}));

export default function EventDeal() {
  const classes = useStyles();
  var { id, title } = useParams();
  const [backdropopen, setLoading] = useState(false);
  // const alert = useAlert();
  const [Event, setEventDeal] = useState([]);
  const [search, setSearch] = useState("");
  const [nodata, setNodata] = useState('');

  const handleClickSearch = () => {
    return EventDeal(search);
  };

  const EventDeal = useCallback(async (search) => {
    setLoading(true);
    async function fetchData() {
      const results = await eventFight(id,search);
      if (results === "NO DATA FOUND") {
        setNodata(results)
        setEventDeal([]);
        setLoading(false);
      } else {
        setEventDeal(results);
        setLoading(false);
      }
    }
    fetchData().catch(console.error);
  }, [id]);

  useEffect(() => {
    EventDeal();
  }, [EventDeal]);

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                type="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        style={{ cursor: "pointer" }}
                        //fontSize="small"
                        color="action"
                        onClick={handleClickSearch}
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Fight Number"
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box mt={3}>
        <TableContainer component={Paper} className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={8}  style={{backgroundColor: Color.tableColor}}>
                  <Typography variant="h4" style={{color: Color.green}}>{'Event Name: '+title}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Declarator</StyledTableCell>
                <StyledTableCell align="center">Fight#</StyledTableCell>
                <StyledTableCell align="left">Declare Win</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                {/* <StyledTableCell align="left">Card Result</StyledTableCell>  */}
                <StyledTableCell align="center">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Event.length ? (
                Event.map((val, i) => {
                  let row = val.event;
                  let value = val.declare;
                  var Income = value.map((elem) =>
                    elem.declare_win.length === 0 ? "pending" : elem.declare_win
                  );
                  let RESULT;
                  if (row.status === "CANCEL") {
                    RESULT = Income === "" ? "CANCEL" : Income;
                  } else {
                    RESULT = Income === "" ? "Pending Declare" : Income;
                  }
                  let DECLARWIN;
                  switch (Income.join(", ")) {
                    case "MERON":
                      DECLARWIN = (
                        <StyledTableCell
                          style={{ color: Color.red }}
                          align="center"
                        >
                          MERON
                        </StyledTableCell>
                      );
                      break;
                    case "WALA":
                      DECLARWIN = (
                        <StyledTableCell
                          style={{ color: Color.blue }}
                          align="center"
                        >WALA
                        </StyledTableCell>
                      );
                      break;
                    case "DRAW":
                      DECLARWIN = (
                        <StyledTableCell
                          style={{ color: Color.green }}
                          align="center"
                        >DRAW
                        </StyledTableCell>
                      );
                      break;
                    default:
                      DECLARWIN = (
                        <StyledTableCell
                          style={{ color: Color.green  }}
                          align="center"
                        >________
                        </StyledTableCell>
                      );
                  }
                  let STATUS;
                  switch (row.status) {
                    case "CLOSE":
                      STATUS = (
                        <StyledTableCell
                          style={{color: Color.red }}
                          align="left"
                        >
                          CLOSE
                        </StyledTableCell>
                      );
                      break;
                    case "DONE":
                      STATUS = (
                        <StyledTableCell
                          style={{ color: Color.blue }}
                          align="left"
                        >
                          DONE
                        </StyledTableCell>
                      );
                      break;
                    case "OPEN":
                      STATUS = (
                        <StyledTableCell
                          style={{ color: Color.green }}
                          align="left"
                        >
                          OPEN
                        </StyledTableCell>
                      );
                      break;
                    case "CANCEL":
                      STATUS = (
                        <StyledTableCell
                          style={{ color: Color.orange }}
                          align="left"
                        >
                          CANCEL
                        </StyledTableCell>
                      );
                      break;
                    case "PAUSE":
                      STATUS = (
                        <StyledTableCell style={{ color: Color.red }} align="left">
                          PAUSE
                        </StyledTableCell>
                      );
                      break;
                    default:
                      // STATUS =( <StyledTableCell  align="left" style={{color:"red"}} >PAUSE</StyledTableCell>);
                      STATUS = (
                        <StyledTableCell align="left">________</StyledTableCell>
                      );
                  }

                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.created.slice(0, 10)} <br></br>{" "}
                        {row.created.slice(11, 19)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.username}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {"#" + row.fightNumber}
                      </StyledTableCell>
                      {row.status === "CANCEL" || row.status === "OPEN" ? (
                        <StyledTableCell align="center">
                          ________
                        </StyledTableCell>
                      ) : (
                        DECLARWIN
                      )}
                      {STATUS}
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.button}
                          href={`/app/event/deal/bet/${id}/${row.id}/${encodeURIComponent(title)}/${row.fightNumber}/${RESULT.length === 0 ? 'Pending Declare':RESULT}`}
                          startIcon={<VisibilityIcon />}
                        >
                          Bettors
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.button}
                          href={`/app/event/fight/history/${id}/${row.fightNumber}/${encodeURIComponent(title)}`}
                          startIcon={<VisibilityIcon />}
                        >
                          History
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell key={1} colSpan={8}>
                   {nodata}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
