import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import Api from '../../../Api';
import { eventFightHistory } from "src/adminModel/eventData";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles =makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 700,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function History() {
  const classes = useStyles();
  var   {  event,fightno } = useParams();
  const [eventFighthistory, setEventFightHistory] = useState([]);
  const [nodata, setNodata] = useState('');
  const [backdropopen, setLoading] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
     setLoading(true);
      const results = await eventFightHistory(event, fightno);
      if (results === "NO DATA FOUND") {
        setNodata(results)
        setEventFightHistory([]);
      }else{
        setEventFightHistory(results);
      }
      setLoading(false);
    }
    fetchData().catch(console.error);
  }, [event, fightno]);


  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Transaction Date</StyledTableCell>
            {/* <StyledTableCell align="left">Fight Number</StyledTableCell> */}
            <StyledTableCell align="center">Info Redeclare</StyledTableCell>
            <StyledTableCell align="left">Info </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {eventFighthistory.length ? (
              eventFighthistory.map((row, i) => {
              return (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.transactionDate.slice(0, 10)} <br></br> {row.transactionDate.slice(11, 19)}</StyledTableCell>
              {/* <StyledTableCell align="left">{row.fightNumber}</StyledTableCell> */}
              <StyledTableCell align="center">{row.info}</StyledTableCell>
              <StyledTableCell align="left">{row.info2}</StyledTableCell>
            </StyledTableRow>
            );
            })
          ) : (
            <StyledTableRow>
              <TableCell key={1} colSpan={6}>
                {nodata}
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </TableContainer>
  );
}
