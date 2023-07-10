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
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  // Card,
  // CardContent,
  Grid,
  Box,
 // TextField,
  Button,
  Paper
} from '@material-ui/core';
import Api from '../../../Api';
import api from '../../../axios';
import { useAlert } from 'react-alert';
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

  const alert = useAlert();
  var { id,user } = useParams();
  //console.log("Agent ID: ",id)

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false)
    setCout(Count + 100)
    let val = Count + 100;
    //console.log("value: ",val)
   return AgentTree(startingDate, endingDate, val);
  };

  const handleBackPage = () => {
    setCout(Count - 100)
    let val = Count - 100;
   // console.log("value: ",val)
    if(val===0){
      setNextDisAble(false)
      setDisAble(true)
    }else{
    }
   return AgentTree(startingDate, endingDate, val);
  };


  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  var dd = String(today.getDate()).padStart(2, '0');
  let star = yyyy + '-' + mm + '-' + dd;
  let end = yyyy + '-' + mm + '-' + dd;

  const startingDate = star;
  const  endingDate =  end;
  // const handleClickSearch = () => {
  //   return AgentTree( startingDate, endingDate);
  // };

  const AgentTree = useCallback(async (startingDate, endingDate,val) => {
// console.log("Agent ID: ",id)
    setLoading(true);

    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    let star = yyyy + '-' + mm + '-' + dd;
    let end = yyyy + '-' + mm + '-' + dd;

    let URL = '';
    if ( startingDate === undefined || endingDate === undefined) {
      URL = `${Api.request.URL}/api/v2/history/bet?userId=${id}&start=${val=== undefined ? 0 : val}&from=${star}&to=${end}`;
     // URL = `${Api.request.URL}/Admin/report/event/income/download?page=${page}&from=${star}&to=${end}&s=${type}`;
      } else {
      URL = `${Api.request.URL}/api/v2/history/bet?userId=${id}&start=${val=== undefined ? 0 : val}&from=${startingDate}&to=${endingDate}`;
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
            if(error.response.data.message==='NO DATA FOUND'){
              setNextDisAble(true)
            }else{
  
            }
            setLoading(false);
          });
 
    } catch (e) {
      console.log(e);

    }
    // setLoading(false);
  },[id,alert]);

  useEffect(() => {
    AgentTree();
  }, [AgentTree]);

  // const handleChange = event => {
  //   if (event.target.name === 'startingDate') {
  //     setStarDate(event.target.value);
  //   } else if (event.target.name === 'endingDate') {
  //     setEndDate(event.target.value);
   
  //   } else {
  //    // setSearch(event.target.value);
  //   }
  // };


  return (
    <div>
      <Box mt={3}>
        {/* <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid  item md={2} xs={6}>
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
              <Grid  item md={2} xs={6}>
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
              <Grid  item md={2} xs={6}>
                
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
              <ReactHTMLTableToExcel
                  style={{ lineheight: '3' }}
                  fullWidth={true}
                  table="emp"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText={
                    <Button color="primary" variant="contained">
                      Generate Report
                    </Button>
                  }
                />
              </Grid>
            </Grid> 
          </CardContent>
        </Card> */}
      </Box >
      <Box mt={3}>

      </Box>
    <TableContainer component={Paper} style={{maxHeight: 600}}>
      <Table stickyHeader className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow> 
          <StyledTableCell align="left">#</StyledTableCell>
          <StyledTableCell align="left">Date Created</StyledTableCell>
            <StyledTableCell align="left">Event Names</StyledTableCell>
            <StyledTableCell align="left">status</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>    
          </TableRow>
        </TableHead>
        <TableBody>
        {getTree.length ? (
           getTree.map((row,i) => {

            let URLencode = encodeURIComponent(row.event_name);
            return (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              
              <StyledTableCell align="left">{row.created_date.slice(0, 10)}</StyledTableCell>
              <StyledTableCell align="left">{row.event_name}</StyledTableCell>
              <StyledTableCell align="left">{row.status}</StyledTableCell>
              <StyledTableCell align="left">
              <Button 
                        variant="contained"
                        color="secondary"
                        size="small"
                              className={classes.button}
                              startIcon={<VisibilityIcon />}
                             href={`/app/reports/bet/${id}/${user}/${row.id}/${URLencode}`}
                            // href={`/app/reports/event/bet/${row.id}/${row.username}`} ReportsBetEvent
                            >View
                          </Button >
              </StyledTableCell>
            </StyledTableRow>
             );
            })
          ) : (
            <TableRow>
              <TableCell key={1} colSpan={5}>
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
              <Button  className={classes.page} disabled={disable} startIcon={<ArrowBackIosIcon />} onClick={handleBackPage}> </Button >
              <Button className={classes.page}  disabled={nextdisable} startIcon={<ArrowForwardIosIcon />}  onClick={handleNextPage}> </Button >
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
