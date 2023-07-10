import React,{useState,useEffect, useCallback} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../../axios';
import Api from '../../../Api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Box
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useAlert } from 'react-alert';
import Alert from '@material-ui/lab/Alert';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },box: {
    webkitBoxShadow: '-7px 11px 10px -1px rgba(209,209,209,1)',
    mozBoxShadow: '-7px 11px 10px -1px rgba(209,209,209,1)',
    boxShadow: '-7px 11px 10px -1px rgba(209,209,209,1)'
  },
  textColor: {
    color: 'white'
  },
  Paperoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px',
    marginBottom: '25px',
    marginLeft: '25px',
    marginRight: '25px',
    float: 'right'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  TextField: {
    margin: theme.spacing(1),
    width: '25ch',
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [fund, setFund] = useState([]);
 

  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [Page, setPage] = useState(1);

  const handleNextPage = (event, value) => {
    setPage(value)
    ////console.log("handleChange: ",value);
    return FundRequest('', value,'');
  };

  const handleClickSearch = () => {
    return FundRequest(search, Page,'');
  };


  

  const FundRequest = useCallback(async (search, page, STATUS) => {
    if (search === undefined || page === undefined) {
      search = '';
      page = 1;
      STATUS = '';
    } else {

    }
    ////console.log("dito: ",search, page, STATUS)
    setLoading(true);
    try {
      await api
        .get(
          `${Api.request.URL}/admin/merchant/request/list/?page=${page}&status=${STATUS}&s=${search}`
        )
        .then(res => {
          setFund(res.data.DATA.data);
          setTotalPage(res.data.DATA.total_page);
        })
        .catch(error => {
          alert.error(error.response.data.message);
     
        });
    setLoading(false);
    } catch (e) {
      //console.log(e);
    }
  },[alert]);

  useEffect(() => {
    FundRequest();
  }, [FundRequest]);
 

  const [values, setValues] = useState({
    status: ''
  });
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    /* //console.log("values: ",event.target.value) */
    let STATUS = event.target.value;
    return FundRequest(search, Page,STATUS);

  };
 


  return (
    <div>
        <TableContainer  component={Paper}>
       <Box mt={3}>
      
       <Paper component="form" className={classes.Paperoot}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Search Merchant"
                onChange={e => setSearch(e.target.value)}
              />
              <IconButton
                onClick={handleClickSearch}
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            <Paper component="form" className={classes.Paperoot}>
              
            <TextField
             className={classes.TextField}
             id="standard-select-currency"
             select
             name="status"
            /*  label="Select Status" */
             value={values.status}
             onChange={handleChange}
      
        >
            <MenuItem key={1} value={"PENDING"}>PENDING </MenuItem>
            <MenuItem key={2} value={"CANCEL"}>CANCEL </MenuItem>
            <MenuItem key={3} value={"ROLLBACK"}>ROLLBACK </MenuItem>
        </TextField>
            </Paper>
         
       </Box>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Merchant Code</StyledTableCell>
            <StyledTableCell>MerchantName</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Request Date</StyledTableCell>
            <StyledTableCell>Approve Date</StyledTableCell>
            <StyledTableCell>Request Fund</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fund.map((row,index) => {
            let STAT;
            switch(row.stat) {
              case "APPROVE": 
                 STAT =  <Alert variant="filled" severity="success">APPROVE</Alert>;
                break;

              case "PENDING": 
                 STAT =  <Alert variant="filled" severity="info">PENDING</Alert>;
                break;
              case "CANCEL":
                STAT = <Alert variant="filled" severity="error">CANCEL</Alert>;
                break;
              default:
                STAT = <Alert variant="filled" severity="warning">ROLLBACK</Alert>;
            }
            return(
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.merchantCode}
              </StyledTableCell>
              <StyledTableCell >{row.merchantName}</StyledTableCell>
              <StyledTableCell >{row.username}</StyledTableCell>
              <StyledTableCell >{row.requestDate}</StyledTableCell>
              <StyledTableCell >{row.approveDate}</StyledTableCell>
              <StyledTableCell >{row.request_fund.toLocaleString()}</StyledTableCell>
              <StyledTableCell >{STAT}</StyledTableCell>
            </StyledTableRow>
               );
          })}
        </TableBody>
      </Table>
    </TableContainer>

    <Box mt={3} display="flex" justifyContent="center">
    <Pagination
      color="primary"
      count={totalPage}
      size="small"
      shape="rounded"
      onChange={handleNextPage}
    />
    </Box>
    </div>        
  );
}
