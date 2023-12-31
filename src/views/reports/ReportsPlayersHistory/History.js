import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Search as SearchIcon } from 'react-feather';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Box,
  Card,
  Typography,
  Grid,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Paper
} from '@material-ui/core';
import Api from '../../../Api';
import {
  searchUser,
} from "../../../adminModel/data";


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
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: 2
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [noRecord, setNoRecord] = useState('');



  const handleClickSearch = async() => {
    setLoading(true);
    try {
      const dataUser = await searchUser(search);
      //console.log('dataUser',dataUser)
      if(dataUser === 'NO DATA FOUND'){
        setNoRecord('NO DATA FOUND');
      }else{
        setGetUsers(dataUser);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('error: ',e);
    }


  };

  //console.log("getUsers: ", getUsers)
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
                        fontSize="small"
                        color="action"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickSearch}
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={e => setSearch(e.target.value)}
                placeholder="Username"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={3}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Username</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">View Users</StyledTableCell>
                <StyledTableCell align="left">Points History</StyledTableCell>
                <StyledTableCell align="left">Commission History</StyledTableCell>
                <StyledTableCell align="left">Bet History</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getUsers.length ? (
                getUsers.map((row, i) => {
                  let GROUP;
                  let UPLINE;
                  let DOWNLINE;
                  if (row.allow === 'PLATINUM') {
                    GROUP = (
                      <Typography
                        align="left"
                        style={{ color: '#ffc107', fontWeight: 'bold', fontSize: '12px' }}
                      >
                        {row.allow}
                      </Typography>
                    );
                    DOWNLINE = (<Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<VisibilityIcon />}
                      href={`/app/agent/downline/tree/${row.refcode}/${row.username}`}
                    >View Downline
                    </Button>)
                  } else if (row.allow === 'AGENT') {
                    GROUP = (
                      <Typography
                        align="left"
                        style={{ color: '#6d4c41', fontWeight: 'bold', fontSize: '12px' }}
                      >
                      AGENT
                      </Typography>
                    );
                    UPLINE = (<Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<VisibilityIcon />}
                      href={`/app/agent/upline/tree/${row.id}/${row.username}`}
                    >View Agent</Button>)

                    DOWNLINE = (<Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<VisibilityIcon />}
                      href={`/app/agent/downline/tree/${row.refcode}/${row.username}`}
                    >View Downline
                    </Button>)
 
                  } else {
                    GROUP = (
                      <Typography
                        align="left"
                        style={{ color: '#3949ab', fontWeight: 'bold', fontSize: '12px' }}
                      >
                        {row.allow}
                      </Typography>
                    );
                    DOWNLINE = (<Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<VisibilityIcon />}
                      href={`/app/agent/upline/tree/${row.id}/${row.username}`}
                    >View Agent</Button>)
                  }


                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.username}<br></br>{GROUP}</StyledTableCell>
                      <StyledTableCell align="left">{row.first_name + " " + row.last_name}</StyledTableCell>

                      <StyledTableCell align="left"> {UPLINE} {DOWNLINE}</StyledTableCell>
                      <StyledTableCell align="left"> <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<VisibilityIcon />}
                        href={`/app/reports/points/${row.id}/${row.username}`}
                      >View
                          </Button>
                      </StyledTableCell>
                      <StyledTableCell align="left"> <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<VisibilityIcon />}
                        href={`/app/reports/commission/${row.id}/${row.username}`}
                      >View
                          </Button>
                      </StyledTableCell>
                      <StyledTableCell align="left"> <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<VisibilityIcon />}
                        //href={`/app/reports/bet/${row.id}/${row.username}/`}
                        href={`/app/reports/event/bet/${row.id}/${row.username}`}

                      >View
                          </Button>
                      </StyledTableCell>
                    </StyledTableRow>

                  );
                })
              ) : (
                <TableRow>
                  <TableCell key={1} colSpan={7}>
                    {noRecord}
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
