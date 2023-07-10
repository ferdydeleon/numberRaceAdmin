import React, { useState,useEffect } from 'react';
import Api from '../../../Api';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
// import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { Pagination } from '@material-ui/lab';
// import Paper from '@material-ui/core/Paper';
import api from '../../../axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
// import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import MuiAlert from '@material-ui/lab/Alert';
// import Snackbar from '@material-ui/core/Snackbar';
// import Typography from '@material-ui/core/Typography';
// import { Divider, InputAdornment, SvgIcon } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import CancelIcon from '@material-ui/icons/Cancel';
// import InfoIcon from '@material-ui/icons/Info';
// import Tooltip from '@material-ui/core/Tooltip';
import { Card  } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { useCallback } from 'react';

// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


// const HtmlTooltip = withStyles(theme => ({
//   tooltip: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9'
//   }
// }))(Tooltip);

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  table: {
    minWidth: 700
  },
  field: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500
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
  text: {
    textAlign: 'left'
  }, container: {
    maxHeight: 500,
  },
  page:{
    '& .MuiPaginationItem-page.Mui-selected': {
      color: '#fff',
      backgroundColor: Api.paginationColor.color,
    }
  },
dialog:{
  backgroundColor: Api.table.head,
  color: theme.palette.common.white,
}
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// function SendingAlert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const AppTotalWithdraw = () => {
  const alert = useAlert();
  const classes = useStyles();
  const [backdropopen, setLoading] = React.useState(false);
  const [posts, setPosts] = useState([]);
  // const [totalPage, setTotalPage] = useState(0);
  //search function here
  /* const [Page, setPage] = useState(0); */
  // const [search, setSearch] = useState('');
  // const [Count, setCout] = useState(0);
  // const [disable, setDisAble] = useState(true);
  // const [nextdisable, setNextDisAble] = useState(false);
  // const handleNextPage = () => {
  //   setDisAble(false)
  //   setCout(Count + 50)
  //   let val = Count + 50;
  //  // console.log("value: ",val)
  //  return getPosts(search,val);
  // };

  // const handleBackPage = () => {
  //   setCout(Count - 100)
  //   let val = Count - 100;
  //  // console.log("value: ",val)
  //   if(val===0){
  //     setNextDisAble(false)
  //     setDisAble(true)
  //   }else{
  //   }
  //  return getPosts(search, val);
  // };

  // const handleClickSearch = () => {
  //   // let str = search;
  //   // let res = str.slice(4);
  //   // let fil = str.substring(0, 4);
  //   // let SEARCH;
  //   // if (fil === 'REF#') {
  //   //   SEARCH = res;
  //   // } else {
  //   //   SEARCH = search;
  //   // }
  //   // let Page = 1;
  //   return getPosts(search,Count);
  // };


  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  // let dd = String(today.getDate()-1).padStart(2, '0');
  let ddD = String(today.getDate()).padStart(2, '0');
  //let star = yyyy + '-' + mm + '-' + dd+'T21:00';
  let star = yyyy + '-' + mm + '-' + ddD
  // let end = yyyy + '-' + mm + '-' + ddD

  const [startingDate, setStarDate] = useState(star);
  // const [endingDate, setEndDate] = useState(end);
  // const [UserNamee, setUserNamee]= useState('');
  // const [GROUP, setTypeIN] = React.useState('');
  // const [Cash_OUT, setCash_out] = React.useState('');
  
  const handleChange = event => {
    if (event.target.name === 'startingDate') {
      setStarDate(event.target.value);
    // } else if (event.target.name === 'endingDate') {
    //   setEndDate(event.target.value);
    // } else if (event.target.name === 'username') {
    //   setUserNamee(event.target.value);
    // } else if (event.target.name === 'cash_out') {
    //   setCash_out(event.target.value);
    // } else if (event.target.name === 'group') {
    //   setTypeIN(event.target.value);
     // console.log("typeIN: ",event.target.value)
    } else {
     // setSearch(event.target.value);
    }
  };

  const handleClickSearchDate = () => {
    return getPosts(startingDate);
  };

  const getPosts = useCallback(async (startDate) => {
   // ('MANUAL_CASHOUT', 'AUTO_CASHOUT')
  // &w_type=${CASH_OUT === undefined ?  '': CASH_OUT}
    setLoading(true);
    try {
      await 
      api.get(
          `${Api.request.URL}/api/v2/Withdraw/view/total?date=${startDate === undefined ? startingDate:startDate}`
        )
        .then(res => {
         console.log(res.data.data.data)
          setPosts(res.data.data.data);
          setLoading(false);
          //setNextDisAble(false)
      
        })
        .catch(error => {
          setLoading(false);
          alert.error(error.response.data.message);
          if(error.response.data.message ==='NO DATA FOUND'){
           // setNextDisAble(true)
          }else{

          }
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  },[startingDate,alert]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  


  //*************************************************************************************************** */

  return (
    <Card>
  

  <Card>
        <CardContent>
          <Grid container spacing={3}>
            
             {/* <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="group"
                label="Player Type"
                value={GROUP}
                onChange={handleChange}
                placeholder="Player Type"
                variant="outlined"
              >
                <MenuItem key={1} value={'ALL'}>
                  ALL
                </MenuItem>
                <MenuItem key={2} value={'PLATINUM'}>
                  PLATINUM
                </MenuItem>
                <MenuItem key={3} value={'AGENT'}>
                  AGENT
                </MenuItem>
                <MenuItem key={4} value={'DIRECT_PLAYER'}>
                  DIRECT_PLAYER
                </MenuItem>
              </TextField>
            </Grid> */}

           {/*<Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="cash_out"
                label="Manual / Auto Cash Out"
                value={Cash_OUT}
                onChange={handleChange}
                placeholder="Manual / Auto Cash Out"
                variant="outlined"
              >
            
                <MenuItem key={1} value={'MANUAL_CASHOUT'}>
                  MANUAL CASH OUT
                </MenuItem>
                <MenuItem key={2} value={'AUTO_CASHOUT'}>
                  AUTO CASH OUT
                </MenuItem>
          
              </TextField>
            </Grid> */}
          

            
       

       
              <Grid  item md={3} xs={12}>
                <TextField
                  fullWidth={true}
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  id="date"
                  label="Date"
                  variant="outlined"
                  name="startingDate"
                  defaultValue={startingDate}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid  item md={2} xs={12}>
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
              </Grid> */}
              <Grid  item md={2} xs={12}>
                <Button
                 fullWidth={true}
                  color="primary"
                  onClick={handleClickSearchDate}
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


      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">Full Name</StyledTableCell>
              <StyledTableCell align="left">User Type</StyledTableCell>
              <StyledTableCell align="left">Total Withdraw</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              {/* <StyledTableCell align="left">Type</StyledTableCell> */}
             
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                let COLORED;

                if(row.color === 1){
                  COLORED = 'red';
                }else{
                  COLORED = '';
                }

                return (
              
                  <StyledTableRow key={i} >
                    <StyledTableCell  style={{color:COLORED}}  align="left">{i + 1} </StyledTableCell>
                    <StyledTableCell   style={{color:COLORED}} align="left">{row.username}</StyledTableCell>
                    <StyledTableCell  style={{color:COLORED}} align="left">{row.fullname} </StyledTableCell>
                    <StyledTableCell  style={{color:COLORED}} align="left">{row.allow} </StyledTableCell>
                  <StyledTableCell  style={{color:COLORED}} align="left">{row.totalWithdraw === null ? '0':row.totalWithdraw.toLocaleString()} </StyledTableCell> 
           
                    <StyledTableCell  style={{color:COLORED}} align="left">{row.datePosted.slice(0,10)} </StyledTableCell>
                    {/* <StyledTableCell  style={{color:COLORED}} align="left">{row.type}</StyledTableCell>   */}
                     
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" key={1} colSpan={8}>
                  No records found!
                </StyledTableCell>
              </StyledTableRow>
            )} 

          </TableBody>
        </Table>

        {/* <Box
            mt={2}
            display="flex" m={1} p={1} justifyContent="center"
            className={classes.root}
          >
            <Grid item xs={0}>
              <Button  disabled={disable} startIcon={<ArrowBackIosIcon />} onClick={handleBackPage}> </Button >
              <Button  disabled={nextdisable} startIcon={<ArrowForwardIosIcon />}  onClick={handleNextPage}> </Button >
          </Grid>
       
          </Box> */}
      </TableContainer>

        <Backdrop className={classes.backdrop} open={backdropopen}>
          <CircularProgress color="inherit" />
        </Backdrop>

     
     
    </Card>
  );
};
export default AppTotalWithdraw;
