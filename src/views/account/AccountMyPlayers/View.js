import React,{useState} from 'react';
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
  Grid,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Paper
} from '@material-ui/core';
import Api from '../../../Api';
import api from '../../../axios';
import { useAlert } from 'react-alert';

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



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  button: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [noRecord, setNoRecord] = useState('');
  const alert = useAlert();

  const handleClickSearch = () => {
    setLoading(true);
    const arraySearh = {
      username: search
    };
      let URL = '';
      URL = `${Api.request.URL}/api/v2/users/search/player/`;
       api.post(URL,arraySearh)
        .then(res => {
          setGetUsers(res.data.data.data);
          setLoading(false);
        })
        .catch(error => {
          setNoRecord('No Record Found!');
          alert.error(error.response.data.message);
          setLoading(false);
        });
  };

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
        
      </Box>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">View Tree</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getUsers.length ? (
          getUsers.map((row,i) => {
            let UPLINE;
            let DOWNLINE;
            switch(row.allow) {
              case 'PLATINUM':
                DOWNLINE = (<Button 
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.button}
                  startIcon={<VisibilityIcon />}
                  href={`/app/agent/downline/tree/${row.refcode}/${row.username}`}
                >View Downline
              </Button>)
                break;
              case 'AGENT':
                UPLINE = (<Button 
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.button}
                  startIcon={<VisibilityIcon />}
                  href={`/app/agent/upline/tree/${row.id}/${row.username}`}
                >View Agent
              </Button>);
             DOWNLINE = (<Button 
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.button}
                  startIcon={<VisibilityIcon />}
                  href={`/app/agent/downline/tree/${row.refcode}/${row.username}`}
                >View Downline
              </Button> );
                break;
              default:
                DOWNLINE = ""
            }
            return (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.username}</StyledTableCell>
              <StyledTableCell align="left">{row.first_name}</StyledTableCell>
              <StyledTableCell align="left">{row.allow}</StyledTableCell>
              <StyledTableCell align="left"> {UPLINE}{DOWNLINE}</StyledTableCell>
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
