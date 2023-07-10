import React,{useState,useEffect, useCallback} from 'react';
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
  Typography,
  Paper
} from '@material-ui/core';
import Api from '../../../Api';
import api from '../../../axios';
import { useAlert } from 'react-alert';
import { useParams } from "react-router-dom";

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
    },backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getTree, setAgentTree] = useState([]);
  const [noRecord, setNoRecord] = useState('');
  const alert = useAlert();
  var { ref,user,type } = useParams();
  //console.log("Agent ID: ",id)
  const AgentTree = useCallback(async () => {
// console.log("Agent ID: ",id)
    setLoading(true);
    try {
      await
        api.get(`${Api.request.URL}/api/v2/Agent/player?refcode=${ref}&username=${user}&group=${type}&start=0&userId=${Api.request.userID}`)

          .then(res => {
            //   const sorted = [...res.data.data.data].sort((a, b) => {
            //   return b.level - a.level;
            // });
            setAgentTree(res.data.data.data)
           //console.log("res.data.data.data: ",res.data.data.data)
          // console.log("HELLOW: ",sorted.filter(e => e.level !== ''))
            // setAgentTree(sorted.filter(e => e.level !== ''))
            setLoading(false);
          }).catch(error => {
            setNoRecord('No Record Found!');
            alert.error(error.response.data.message)
            setLoading(false);
          });

    } catch (e) {
      console.log(e);

    }
    // setLoading(false);
  }, [ref,type,user,alert]);

  useEffect(() => {
    AgentTree();
  }, [AgentTree]);

  return (
    <div>
      
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left">#</StyledTableCell>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Playing Points</StyledTableCell>
            <StyledTableCell align="left">Commission Points</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getTree.length ? (
          getTree.map((row,i) => {
            let GROUP;
            if (row.groups === 'PLATINUM') {
              GROUP = (
                <Typography
                  align="left"
                  style={{ color: '#ffc107', fontWeight: 'bold',fontSize: '12px' }}
                >
                  {row.groups}
                </Typography>
              );
            } else if (row.groups === 'AGENT') {
              GROUP = (
                <Typography
                  align="left"
                  style={{ color: '#6d4c41', fontWeight: 'bold',fontSize: '12px' }}
                >
                  {row.groups}
                </Typography>
              );
            } else {
              GROUP = (
                <Typography
                  align="left"
                  style={{ color: '#3949ab', fontWeight: 'bold',fontSize: '12px' }}
                >
                  {row.groups}
                </Typography>
              );
            }
            return (
            <StyledTableRow key={i}>
                <StyledTableCell align="left">{i+1}</StyledTableCell>
              <StyledTableCell align="left">{row.username}</StyledTableCell>
              <StyledTableCell align="left">{row.first_name+" "+row.last_name}</StyledTableCell>
              <StyledTableCell align="left">{row.playing_points.toLocaleString()}</StyledTableCell>
              <StyledTableCell align="left">{row.comission_points.toLocaleString()}</StyledTableCell>
              <StyledTableCell align="left">{row.active}</StyledTableCell>
              <StyledTableCell align="left">{GROUP}</StyledTableCell>
            </StyledTableRow>
            );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={4}>
                 {noRecord}
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
