import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Api from '../../../Api';
import api  from '../../../axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  withStyles,
  Button,
  makeStyles
} from '@material-ui/core';
import { useAlert } from 'react-alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const Fundhistory = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [backdropopen, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [Page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  // var dd = String(today.getDate()).padStart(2, '0');
  var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  let star = yyyy + '-' + mm + '-' + firstDay ;
  let end = yyyy + '-' + mm + '-' + lastDay;

  const [startingDate, setStarDate] = useState(star);
  const [endingDate, setEndDate] = useState(end);
  
  const [type, setType] = useState('All');

  const handleNextPage = (event, value) => {
    setPage(value);
    let val = value + 1;

    return FundHistory(search, val, type, startingDate, endingDate);
  };

  const handleChange = event => {
    if (event.target.name === 'startingDate') {
      setStarDate(event.target.value);
    } else if (event.target.name === 'endingDate') {
      setEndDate(event.target.value);
    } else if (event.target.name === 'type') {
      setType(event.target.value);
    } else {
      setSearch(event.target.value);
    }
  };

  const handleClickSearch = () => {
    let Page = 1;
    let TYPE;
    if (type === 'All') {
      TYPE = '';
    } else {
      TYPE = type;
    }
    return FundHistory(search, Page, TYPE, startingDate, endingDate);
  };

  const [fund, setFund] = useState([]);
  const FundHistory = useCallback(async (search, page, type, startingDate, endingDate) => {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    let star = yyyy + '-' + mm + '-' + dd;
    let end = yyyy + '-' + mm + '-' + dd;
    
    let URL = '';
    if (search === undefined || page === undefined || startingDate === undefined || endingDate === undefined) {
      page = 1;
      search = '';
      type = '';
      URL = `${Api.request.URL}/Admin/Report/fund?page=${page}&merchant=${Api.request.merchant_id}&type=${type}&from=${star}&to=${end}&s=${search}`;
    } else {
      URL = `${Api.request.URL}/Admin/Report/fund?page=${page}&merchant=${Api.request.merchant_id}&type=${type}&from=${startingDate}&to=${endingDate}&s=${search}`;
    }
  
    setLoading(true);
    try {
      await api
        .get(URL)
        .then(res => {
          setFund(res.data.data.data);
          setTotalPage(res.data.data.total_query);
          setLoading(false);
        })
        .catch(error => {
          setFund([]);
          alert.error(error.response.data.message);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  },[alert]);

  useEffect(() => {
    FundHistory();
  }, [FundHistory]);

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* <Grid item md={2} xs={6}>
              <TextField
                fullWidth
                label="Search"
                type="search"
                name="search"
                variant="outlined"
                onChange={e => setSearch(e.target.value)}
              />
            </Grid> */}
            <Grid item md={2} xs={6}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                label="Select Type"
                value={type}
                onChange={e => setType(e.target.value)}
                variant="outlined"
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'WITHDRAW_WALLET'}>WITHDRAW WALLET</MenuItem>
                <MenuItem value={'LOAD_WALLET'}>LOAD WALLET</MenuItem>
                <MenuItem value={'MANUAL_WITHDRAW'}>MANUAL WITHDRAW</MenuItem>
                <MenuItem value={'REQUEST_WALLET'}>REQUEST WALLET</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={2} xs={6}>
              <TextField
                fullWidth
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
            <Grid item md={2} xs={6}>
              <TextField
                fullWidth
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
            <Grid item md={2} xs={6}>
              <Button
                fullWidth
                color="primary"
                onClick={handleClickSearch}
                variant="contained"
                type="submit"
                style={{ height: '55px' }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box mt={3}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>Merchant Name</StyledTableCell> */}
                  <StyledTableCell>Request Date</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Request</StyledTableCell>
                  <StyledTableCell>Assist By</StyledTableCell>
                  <StyledTableCell>Request Fund</StyledTableCell>
                  <StyledTableCell>Balance Before</StyledTableCell>
                  <StyledTableCell>Balance After</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
      
                </TableRow>
              </TableHead>
              <TableBody>
                {fund.map((row, index) => (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {/* <StyledTableCell>{row.merchantName}</StyledTableCell> */}
                    <StyledTableCell>
                      {row.requestDate.slice(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell>{row.transaction_type}</StyledTableCell>
                    <StyledTableCell>{row.request}</StyledTableCell>
                    <StyledTableCell>{row.approve}</StyledTableCell>
                    <StyledTableCell>
                      {row.request_fund.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.balance_before.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.balance_after.toLocaleString()}
                    </StyledTableCell>

  
                    <StyledTableCell>{row.status}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalPage}
            rowsPerPage={rowsPerPage}
            page={Page}
            onChangePage={handleNextPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

Fundhistory.propTypes = {
  className: PropTypes.string
};

export default Fundhistory;
