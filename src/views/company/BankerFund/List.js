import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  withStyles,
  TableContainer,
  MenuItem,
  Paper,
  Button,
  // TablePagination,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  CardHeader,
  ThemeProvider
} from '@material-ui/core';
import api  from '../../../axios';
import Api from '../../../Api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createTheme } from '@material-ui/core/styles'
// import MuiAlert from '@material-ui/lab/Alert';
import { Search as SearchIcon } from 'react-feather';
import { useAlert } from 'react-alert';
import VisibilityIcon from '@material-ui/icons/Visibility';



// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  backColor: {
    backgroundColor: 'black',
    color: 'white'
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searcH: {
    float: 'right'
  },
  button: {
    color : theme.palette.common.white
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

const List = () => {
  const classes = useStyles();
  // const [ResponseMessage, setResponseMessage] = useState('');
  const [search, setSearch] = useState('');
  const [game, setGame] = useState('');
  //const [totalPage, setTotalPage] = useState(0);
  // const [Page, setPage] = useState(0);
  const alert = useAlert();
  // const handleNextPage = (event, value) => {
  //   setPage(value);
  //   let val = value + 1;
  //   return RequestEvent('', val);
  // };

  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleSelectGame = event => {
    setGame(event.target.value);

    return RequestEvent(search, event.target.value);
  };

  const handleClickSearch = () => {
   // let Page = 1;
    return RequestEvent(search,game);
  };

  const [posts, setPosts] = useState([]);
  const [backdropopen, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const RequestEvent = async (search,game) => {
 
    setLoading(true);
      let GAME;
      if(game==='ALL'){
        GAME = '';
      }else if(game===undefined){
        GAME = '';
      }else{
        GAME = game;
      }
    
    try {
      await api
        .get(`${Api.request.URL}/api/v2/Event?search=${search === undefined ? '' : search}&game=${GAME}`)
        .then(res => {
          //console.log("res.data.S.data: ",res.data.data.data)
          setPosts(res.data.data.data);
          //setTotalPage(res.data.data.total_query);
          setLoading(false);
        })
        .catch(error => {
          setPosts([]);
          alert.error(error.response.data.message)
          setLoading(false);
        });
    } catch (e) {
    //  setResponseMessage(e);
      console.log(e);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   RequestEvent();
  // }, []);

  const orange = createTheme({
    palette: {
      secondary: {
        main: '#ff9800'
      }
    }
  });

  const red = createTheme({
    palette: {
      secondary: {
        main: 'rgb(215 3 78)'
      }
    }
  });


  const green = createTheme({
    palette: {
      secondary: {
        main: '#1fcc13'
      }
    }
  });

  // const disable = createTheme({
  //   palette: {
  //     secondary: {
  //       main: '#819ab2'
  //     }
  //   }
  // });

 
  const [changeStatus, setOpenChangeStatus] = React.useState(false);
  const [eventID, setEventID] = React.useState(false);
  const [EventSTATUS, setStatus] = React.useState('');

  const handleChangeStatus = (e, id,status) => {
    setOpenChangeStatus(true);
    setStatus(status)
    setEventID(id);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenChangeStatus(false);
  };

  const handleChange = event => {
    setStatus(event.target.value);
  };
  const handleFormChangeStatus = e => {
    e.preventDefault();

    const status = {
      id: eventID,
      status: EventSTATUS,
      userId: Api.request.userID
    };


    console.log('CHangeStatus: ', status);
    api
      .post(`${Api.request.URL}/api/v2/Event/status`, status)
      .then(res => {
        const sample = posts.findIndex(item => item.id === eventID);
        const newArena = posts;
        newArena[sample].STATUS = EventSTATUS; 
        alert.success(res.data.message);
        setLoading(false);
        setOpenChangeStatus(false);
      })
      .catch(error => {
        alert.error(error.response.data.message);
        setLoading(false);
        setOpenChangeStatus(false);
      }); 
  };

  // const handleGetPlayers = (id,name,date,event_type)  => {
  //   const DATA = {
  //     title: name,
  //     date: date,
  //     type:event_type
  //    } 
  //   if(name === undefined){ 

  //   }else{
  //     localStorageService.setItem('event_name', DATA);
  //     window.location.href = `/app/event/deal/${id}`;
  //   }

  // };
 
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={changeStatus}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          style={{ backgroundColor: 'rgb(7 30 243)', color: 'white' }}
          title="Change Status"
        />

        <form onSubmit={handleFormChangeStatus}>
          <DialogContent>
            <TextField
              fullWidth={true}
              select
              SelectProps={{
                native: true,
              }}
              label="Select Status"
              value={EventSTATUS}
              onChange={handleChange}
              variant="outlined"
            >
              <option value={'OPEN'}>OPEN</option>
              <option value={'SHOW'}>SHOW</option>
              <option value={'CLOSE'}>CLOSE</option>
              <option value={'CANCEL'}>CANCEL</option>

            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
   

      <Card>
        <CardContent>
          <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                name="game"
                label="Select Game"
                value={game}
                onChange={handleSelectGame}
                variant="outlined"
              >
                 <MenuItem key={0} value={'ALL'}>
                  ALL
                </MenuItem>

                <MenuItem key={1} value={'SABONG'}>
                  SABONG
                </MenuItem>
                <MenuItem key={2} value={'BACCARAT'}>
                  BACCARAT
                </MenuItem>
                <MenuItem key={3} value={'DROP BALL'}> 
                  DROP BALL
                </MenuItem>
                <MenuItem key={4} value={'MONTE'}>
                  MONTE
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item md={3} xs={12}>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                type="search"
                InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                        style={{ cursor: 'pointer' }}
                        fontSize="small"
                        color="action"
                        onClick={handleClickSearch}>
                  <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
                  )
                }}
                placeholder="Search Events"
                variant="outlined"
                onChange={e => setSearch(e.target.value)}
              />
            </Box>
            </Grid>
            </Grid>
          </CardContent>
        </Card>
   
      <Box mt={3}>
        <TableContainer component={Paper}>
          <Card className={classes.root}>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                      <StyledTableCell align="left">Date</StyledTableCell>
                      <StyledTableCell align="left">Event Name</StyledTableCell>
                      <StyledTableCell align="left">Game Type</StyledTableCell>
                      <StyledTableCell align="left">Arena</StyledTableCell>
                      <StyledTableCell align="left">Agent</StyledTableCell>
                      <StyledTableCell align="left">Company</StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {posts.length ? ( 
                    posts.map((row, i) => {
                       let status;
                       let status_event;
                       if (row.STATUS === 'OPEN') {
                        status_event = (
                          <ThemeProvider theme={green}>
                            <Button 
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={classes.button}
                                onClick={e => handleChangeStatus(e, row.id,row.STATUS)}
                              > {row.STATUS}
                            </Button >
                          </ThemeProvider> );
                        
                        status = (
                          <Button 
                              variant="contained"
                              color="secondary"
                              size="small"
                              className={classes.button}
                              startIcon={<VisibilityIcon />}
                              href={`/app/event/edit/${row.id}/${row.STATUS}`}
                            >View
                          </Button >);

                      } else if (row.STATUS === 'CLOSE') { 
                        status_event = (
                          <ThemeProvider theme={red}>
                            <Button 
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={classes.button}
                                onClick={e => handleChangeStatus(e, row.id,row.STATUS)}
                              > {row.STATUS}
                            </Button >
                          </ThemeProvider> );
                            status = (
                              
                              <Button 
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  className={classes.button}
                                  href={`/app/event/edit/${row.id}/${row.STATUS}`}
                                  startIcon={<VisibilityIcon />}

                                >View
                              </Button >
                              );


                       } else if (row.STATUS === 'CANCEL') {
                        status_event = (
                          <ThemeProvider theme={orange}>
                            <Button 
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={e => handleChangeStatus(e, row.id,row.STATUS)}
                                className={classes.button}
                              > {row.STATUS}
                            </Button >
                          </ThemeProvider> );
                            status = ( 
                              <Button 
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  className={classes.button}
                                  href={`/app/event/edit/${row.id}/${row.STATUS}`}
                                  startIcon={<VisibilityIcon />}
                                >View
                              </Button >
                             );

                      } else {
                        status_event = (
                          
                          <Button size="small" variant="contained" color="secondary"   onClick={e => handleChangeStatus(e, row.id,row.STATUS)}>
                          {row.STATUS}

                        </Button>
                        );

                        status = ( 
                                  <Button 
                                      variant="contained"
                                      color="secondary"
                                      size="small"
                                      className={classes.button}
                                      href={`/app/event/edit/${row.id}/${row.STATUS}`}
                                      startIcon={<VisibilityIcon />}
                                    >View
                                  </Button >
                                );
                      }

                     // console.log("length: ",posts.length)
                      return (
                        <StyledTableRow hover key={i}>
                          <StyledTableCell align="left">{i+1}</StyledTableCell>
                          <StyledTableCell align="left">{row.created_date.slice(0, 10)} <br></br> {row.created_date.slice(11, 19)}</StyledTableCell>
                          <StyledTableCell align="left">{row.event_name}</StyledTableCell>
                          <StyledTableCell align="left">{row.game_name}</StyledTableCell>
                          <StyledTableCell align="left">{row.arena_name}</StyledTableCell>
                          <StyledTableCell align="left"> {row.agent}</StyledTableCell>
                          <StyledTableCell align="left"> {row.company}</StyledTableCell>
                          <StyledTableCell align="left">{status_event}</StyledTableCell>
                          <StyledTableCell align="left">{status}</StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                    ) : (
                      <TableRow>
                        <TableCell key={1} colSpan={9}>
                          No record found!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={totalPage}
              rowsPerPage={rowsPerPage}
              page={Page}
              onChangePage={handleNextPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}


            <Backdrop className={classes.backdrop} open={backdropopen}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Card>
        </TableContainer>
      </Box>
    </div>
  );
};

export default List;