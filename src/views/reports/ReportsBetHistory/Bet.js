import React, { useState, useEffect, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Paper
} from '@material-ui/core';
import Api from '../../../Api';
import api from '../../../axios';
import { useAlert } from 'react-alert';
import { useParams } from "react-router-dom";
// import { Switch } from '@material-ui/core';

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
    }, backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  }
  , backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getTree, setAgentTree] = useState([]);

  const alert = useAlert();
  var { id, event } = useParams();
  ////console.log("Agent ID: ",id)

  const AgentTree = useCallback(async () => {
    // //console.log("Agent ID: ",id) history/bet?userId=5&start=0
    setLoading(true);
    try {
      await
        api.get(`${Api.request.URL}/api/v2/history/bet/fight?userId=${id}&event=${event}`)
          .then(res => {
            setAgentTree(res.data.data.data)
            setLoading(false);
          }).catch(error => {
            //setPosts([]);
            alert.error(error.response.data.message)
            setLoading(false);
          });

    } catch (e) {
      //console.log(e);
      setLoading(false);
    }
    // setLoading(false);
  }, [id,event,alert]);

  useEffect(() => {
    AgentTree();
  }, [AgentTree]);

  return (
    <div>

      <TableContainer component={Paper} style={{ maxHeight: 600 }}>
        <Table stickyHeader className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Transaction Date</StyledTableCell>
              <StyledTableCell align="left">Fight#</StyledTableCell>
              <StyledTableCell align="center">Points</StyledTableCell>
              <StyledTableCell align="center">Bet Type</StyledTableCell>
              <StyledTableCell align="center">Declare Win</StyledTableCell>
              <StyledTableCell align="center">Bet Status</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getTree.length ? (
              getTree.map((val, i) => {
                let row = val.eventDetails;
                let value = val.declare;
                 let declareWIN = value.map(elem => elem.declare_win === '' ? '______':elem.declare_win.replace(""," "));
          
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">{row.transactionDate.slice(0, 10)} <br></br> {row.transactionDate.slice(11, 19)}</StyledTableCell>
                    <StyledTableCell align="left">{row.fightnumber}</StyledTableCell>
                    <StyledTableCell style={{ color: "red" }} align="center">{row.bet_points === null ? 0 : row.bet_points.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="center">{row.bet_type}</StyledTableCell> 
                    {/* {BETYPE} */}
                    {/* {DECLARWIN} */}
                    <StyledTableCell align="center">{declareWIN}</StyledTableCell> 
                    <StyledTableCell align="center">{row.isWin}</StyledTableCell>             
                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={4}>
                  No Record Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
