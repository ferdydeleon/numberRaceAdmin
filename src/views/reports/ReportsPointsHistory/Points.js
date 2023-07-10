import React, { useState } from 'react';
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
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper
} from '@material-ui/core';
import Api from '../../../Api';
import api from '../../../axios';
import { useAlert } from 'react-alert';
import { useParams } from "react-router-dom";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import PrintIcon from "@material-ui/icons/Print";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getTree, setAgentTree] = useState([]);

  const alert = useAlert();
  var { id } = useParams();
  //////console.log("Agent ID: ",id)

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false)
    setCout(Count + 100)
    let val = Count + 100;
    //////console.log("value: ",val)
    return AgentTree(startingDate, endingDate, val);
  };

  const handleBackPage = () => {
    setCout(Count - 100)
    let val = Count - 100;
    // ////console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false)
      setDisAble(true)
    } else {
    }
    return AgentTree(startingDate, endingDate, val);
  };

  const AgentTree = async (startingDate, endingDate, val) => {
    // ////console.log("Agent ID: ",id) 
    setLoading(true);

    // let today = new Date();
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = today.getFullYear();
    // var dd = String(today.getDate()).padStart(2, '0');
    // let star = yyyy + '-' + mm + '-' + dd
    // let end = yyyy + '-' + mm + '-' + dd
    // 2021-08-28T12:01
    // Points.js:162 endingDate:  2021-08-28T00:01

    // 2021-08-28T10:20:13.000Z
    // 2021-08-28T10:20:13.000Z
    // T01:00:00.000Z
    // T24:00:00.000Z

    // http://devopsenv.talpakan.com:3009/api/v2/history/points?userId=73&start=0&from=2021-08-29T01:00:00.000Z&to=2021-08-29T24:00:00.000Z


    let URL = '';
    if (startingDate === undefined || endingDate === undefined) {
      URL = `${Api.request.URL}/api/v2/history/points?userId=${id}&start=${val === undefined ? 0 : val}&from=${star + "T00:00:01.000Z"}&to=${end + "T24:00:00.000Z"}`;
    } else {
      URL = `${Api.request.URL}/api/v2/history/points?userId=${id}&start=${val === undefined ? 0 : val}&from=${startingDate + "T00:00:01.000Z"}&to=${endingDate + "T24:00:00.000Z"}`;
    }

    try {
      await
        api.get(URL)
          .then(res => {
            setAgentTree(res.data.data.data)
            setNextDisAble(false)
            setLoading(false);
          }).catch(error => {
            setAgentTree([]);
            alert.error(error.response.data.message)
            if (error.response.data.message === 'NO DATA FOUND') {
              setNextDisAble(true)
            } else {
            }
            setLoading(false);
          });

    } catch (e) {
      ////console.log(e);
    }
    // setLoading(false);
  };

  // useEffect(() => {
  //   AgentTree();
  // }, []);

  const handleChange = event => {
    if (event.target.name === 'startingDate') {
      setStarDate(event.target.value);
    } else if (event.target.name === 'endingDate') {
      setEndDate(event.target.value);
    } else {
      // setSearch(event.target.value);
    }
  };

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let dd = String(today.getDate()).padStart(2, '0');
  //let star = yyyy + '-' + mm + '-' + dd+'T21:00';
  let star = yyyy + '-' + mm + '-' + dd
  let end = yyyy + '-' + mm + '-' + dd


  const [startingDate, setStarDate] = useState(star);
  const [endingDate, setEndDate] = useState(end);

  const handleClickSearch = () => {
    return AgentTree(startingDate, endingDate);
  };



  const handleClickDownload = () => {
    document.getElementById("downloads").click();
  }

  return (
    <div>
      <ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
        <ExcelSheet data={getTree} name="Downline">
          <ExcelColumn label="Date"value={(col) =>
              col.transactionDate === null
                ? ""
                : col.transactionDate.slice(0, 10) +
                  "  " +
                  col.transactionDate.slice(11, 19)
            }
          />
          <ExcelColumn label="Transaction Name" value="transaction_name" />
          <ExcelColumn label="Points"  value={(col) =>
              col.points === null ? "" : col.points.toLocaleString()
            }
          /> 
          <ExcelColumn label="Balance Before"  value={(col) =>
              col.balance_before === null ? "" : col.balance_before.toLocaleString()
            }
          /> 
          <ExcelColumn label="Balance After" value={(col) =>
              col.balance_after === null ? "" : col.balance_after.toLocaleString()
            }
          />
          <ExcelColumn label="Type" value="type" />
          <ExcelColumn label="Type Status" value="type_status" />
          <ExcelColumn label="Status" value="status" />
          <ExcelColumn label="Sender" value="sender" />
          <ExcelColumn label="Receiver" value="receiver" />
          <ExcelColumn label="Note" value="note" />
        </ExcelSheet>
      </ExcelFile>


      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={2} xs={12}>
                <TextField
                  fullWidth={true}
                  type="date"
                  InputLabelProps={{
                    shrink: true
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
                    shrink: true
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
                  style={{ height: '55px' }}
                >
                  Filter
                </Button>
              </Grid>

               <Grid item md={3} xs={12}>
               <Button
          color="primary"
          onClick={handleClickDownload}
          variant="contained"
          type="submit"
          startIcon={<PrintIcon />}
          style={{ height: "55px", marginBottom: "15px",backgroundColor: "green" }}
        >
          Generate Excel
        </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box >
      <Box mt={3}>

      </Box>
      <TableContainer component={Paper} style={{ maxHeight: 600 }}>
        <Table stickyHeader className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Transaction Name</StyledTableCell>
              <StyledTableCell align="left">Points</StyledTableCell>
              <StyledTableCell align="left">Balance Before</StyledTableCell>
              <StyledTableCell align="left">Balance After</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Type Status</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Sender</StyledTableCell>
              <StyledTableCell align="left">Receiver</StyledTableCell>
              <StyledTableCell align="left">Note</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getTree.length ? (
              getTree.map((row, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">{row.id}</StyledTableCell>
                    <StyledTableCell align="left">{row.transactionDate === undefined ? '' : row.transactionDate.slice(0, 10)} <br></br> {row.transactionDate === undefined ? '' : row.transactionDate.slice(11, 19)}</StyledTableCell>
                    <StyledTableCell align="left">{row.transaction_name}</StyledTableCell>
                    <StyledTableCell align="left">{row.points === undefined ? 0 : row.points.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="left">{row.balance_before === undefined ? 0 : row.balance_before.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="left">{row.balance_after === undefined ? 0 : row.balance_after.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="left">{row.type}</StyledTableCell>
                    <StyledTableCell align="left">{row.type_status}</StyledTableCell>
                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                    <StyledTableCell align="left">{row.sender}</StyledTableCell>
                    <StyledTableCell align="left">{row.receiver}</StyledTableCell>
                    <StyledTableCell align="left">{row.note}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={12}>
                  No Record Found
              </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box
          mt={2}
          display="flex" m={1} p={1} justifyContent="center"
          className={classes.root}
        >
          <Grid item xs={0}>
            <Button className={classes.page} disabled={disable} startIcon={<ArrowBackIosIcon />} onClick={handleBackPage}> </Button>
            <Button className={classes.page} disabled={nextdisable} startIcon={<ArrowForwardIosIcon />} onClick={handleNextPage}> </Button>
          </Grid>
          {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
        </Box>
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
