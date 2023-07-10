import React, {useCallback, useEffect, useState } from 'react';
import Api from '../../../Api';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogContentText from '@material-ui/core/DialogContentText';
// import Paper from '@material-ui/core/Paper';
import api from '../../../axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import Slide from '@material-ui/core/Slide';
// import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
// import Tooltip from '@material-ui/core/Tooltip';
import { Card, Box, CardHeader } from '@material-ui/core';
import { useAlert } from 'react-alert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// import Snackbar from '@material-ui/core/Snackbar';
// import Typography from '@material-ui/core/Typography';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import List from '@material-ui/core/List';
// import typography from 'src/theme/typography';

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
  page: {
    '& .MuiPaginationItem-page.Mui-selected': {
      color: '#fff',
      backgroundColor: Api.paginationColor.color,
    }
  },
  dialog: {
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

const App = () => {
  const alert = useAlert();
  const classes = useStyles();
  const [backdropopen, setLoading] = React.useState(false);
  const [posts, setPosts] = useState([]);
  // const [totalPage, setTotalPage] = useState(0);
  //search function here
  /* const [Page, setPage] = useState(0); */


  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false)
    setCout(Count + 50)
    let val = Count + 50;
    // console.log("value: ",val)
    return getPosts( val);
  };

  const handleBackPage = () => {
    setCout(Count - 50)
    let val = Count - 50;
    // console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false)
      setDisAble(true)
    } else {
    }
    return getPosts( val);
  };

  // const handleClickSearch = () => {

  //   return getPosts(search,Count);
  // };

  const getPosts = useCallback(async (val) => {
    //
    setLoading(true);
    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/Users/exempted/limit/withdrawal/list?search=${''}&start=${val === undefined ? 0 : val}`
        )
        .then(res => {
          //console.log(res.data.data.data.l)
          const Updatepending1 = res.data.data.data.filter(item => item.status === 1);
          // console.log("Updatepending1",Updatepending1)
          if (Updatepending1.length) {
            console.log('yes')
            setPosts(Updatepending1);
            setLoading(false);
            setNextDisAble(false)
          } else {
            console.log('no')
            setPosts(Updatepending1);
            setLoading(false);
            setNextDisAble(true)
          }
          //console.log('res.data.data.data: ', res.data.data.data)
          //setTotalPage(res.data.DATA.total_page);
        })
        .catch(error => {
          setLoading(false);
          setPosts([])

          alert.error(error.response.data.message);
          if (error.response.data.message === 'NO DATA FOUND') {
            setNextDisAble(true)
          } else {

          }
          //   setNextDisAble(false)
          //  // alert.error(error.response.data.message);
          //   if(error.response.data.message === 'NO DATA FOUND'){
          //     setNextDisAble(false)
          //   }else{
          //   }
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  },[alert]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);



  const [user_ID, setuser_ID] = useState('');
  const [userName, setUsername] = useState('');
  const [openBlock, setOpenBlock] = React.useState(false);
  const [autoWIthdraw, setAutoWithdraw] = useState('');

  const handleClickblock = (e, id, username, status) => {
    setOpenBlock(true);
    setuser_ID(id);
    setUsername(username);
    setAutoWithdraw(status)
    // api
    // .get(`${Api.request.URL}/api/v2/Users/transaction/${id}`)
    // .then(res => {
    //   console.log(res.data.data);
    //   res.data.data.data.map((row) => (
    //     setAutoWithdraw(row.isAutoWithdraw)
    //   ))
    //   // alert.success(res.data.data);
    //   // setLoading(false);
    //   // setOpenBlock(false)
    // })
    // .catch(error => {
    //   //alert.error(error.response.data.message);
    //   setLoading(false);
    //   //setOpenBlock(false)
    // });
  };

  const handleClose = () => {
    setOpenBlock(false);
  };


  // const handleRadioChange = event => {
  //   setAutoWithdraw(event.target.value);
  // };

  const handleClickblockUnblock = (status) => {

    // console.log("type: ", type)

    const Array_AUTOWITHDRAW = {
      userId: Api.request.userID,
      playerId: user_ID,
      status: status
    };

    //  console.log('Array_AUTOWITHDRAW',Array_AUTOWITHDRAW)
    ///api/v2/Users/exempted/limit/withdrawal

    api
      .post(`${Api.request.URL}/api/v2/Users/exempted/limit/withdrawal`, Array_AUTOWITHDRAW)
      .then(res => {
        //console.log(res.data.data);
        // alert.success(res.data.data);

        setLoading(false);
        setOpenBlock(false)
        alert.success('Successfully Unexempted');
        return getPosts()

      })
      .catch(error => {
        alert.error(error.response.data.message);
        setLoading(false);
        setOpenBlock(false)
      });

  }

  return (
    <Card>


      {/* <Card>
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
      </Card> */}
      {/* 
"username": "goldagent01",
        "first_name": "Gold",
        "last_name": "Agent",
        "status": 1,
        "allow": "AGENT" */}
      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              {Api.request.username === 'testaccounting' ? '' : <StyledTableCell align="center">Action</StyledTableCell>}

            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length ? (
              posts.map((row, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">{i + 1} </StyledTableCell>

                    <StyledTableCell align="center">{row.username} </StyledTableCell>
                    <StyledTableCell align="center">{row.first_name}</StyledTableCell>
                    <StyledTableCell align="center">{row.last_name}</StyledTableCell>
                    {Api.request.username === 'testaccounting' ? '' : <StyledTableCell align="center"> <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      // startIcon={<VisibilityIcon />}
                      // href={`/app/account/agent/tree/${row.id}/${row.username}`}
                      onClick={e => handleClickblock(e, row.id, row.username, row.status)}
                    >Unexempt
                          </Button ></StyledTableCell>}
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" key={1} colSpan={7}>
                  No records found!
                </StyledTableCell>
              </StyledTableRow>
            )}


          </TableBody>
        </Table>

        <Box
          mt={2}
          display="flex" m={1} p={1} justifyContent="center"
          className={classes.root}
        >
          <Grid item xs={0}>
            <Button disabled={disable} startIcon={<ArrowBackIosIcon />} onClick={handleBackPage}> </Button >
            <Button disabled={nextdisable} startIcon={<ArrowForwardIosIcon />} onClick={handleNextPage}> </Button >
          </Grid>
          {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
        </Box>
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>


      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={openBlock}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          className={classes.dialog}
          title={'Unblock ' + userName}
        />

        <DialogContent>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to unexempt {userName}?
          </DialogContentText>
          </DialogContent>
          {/* <List className={classes.root}>
      <ListItem>
        <ListItemText primary="AUTOWITHDRAW" />
        <ListItemText primary="BLOCK" />
        {/* <ListItemText   
        onClick={() => handleClickblockUnblock(autoWIthdraw == 1 ? 'unblock' : 'block')}
        primary={autoWIthdraw == 1 ? 'UNBLOCK' : 'BLOCK'} style={{color: 'blue', cursor: 'pointer'}} /> 
      </ListItem> 
     </ListItem> 
       </List> */}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => handleClickblockUnblock(autoWIthdraw === 1 ? 0 : 1)} color="primary" autoFocus>
            Ok
          </Button>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>



    </Card>
  );
};
export default App;
