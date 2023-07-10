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
import BlockIcon from '@material-ui/icons/Block';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  CardHeader,
  Divider,
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
import api  from '../../../axios';
import { useAlert } from 'react-alert';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

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



const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
  },dialog:{
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [noRecord, setNoRecord] = useState('');
  const [openBlock, setOpenBlock] = React.useState(false);
  const alert = useAlert();

  const handleClickSearch = () => {
    console.log(search)
    setLoading(true);

       api.get(`${Api.request.URL}/api/v2/Users/exempted/limit/withdrawal/list?search=${search}&start=${0}`)
        .then(res => {
          // console.log(res.data.data);
          setGetUsers(res.data.data.data);
          
          setLoading(false);
        })
        .catch(error => {
          setNoRecord('No Record Found!');
          alert.error(error.response.data.message);
          setLoading(false);
        });
  };



  const [user_ID, setuser_ID] = useState('');
  const [userName, setUsername] = useState('');
  
  const [autoWIthdraw, setAutoWithdraw] = useState('');

  const handleClickblock = (e, id,username,block) => {
    setOpenBlock(true);
    setuser_ID(id);
    setUsername(username);

    setAutoWithdraw(block)

    // api
    // .get(`${Api.request.URL}/api/v2/Users/transaction/${id}`)
    // .then(res => {
    //   console.log(res.data.data);
    //   res.data.data.data.map((row) => (
    //     setAutoWithdraw(row.isAutoWithdraw)
    //   ))

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
  //  setLoading(true);
   // e.preventDefault();
      console.log("type: ", status)

    const ArrayParam= {
      userId: Api.request.userID,
      playerId: user_ID,
      status: status
    };

   // {userId=0, playerId=0,status=0}

    // http://devopsenv.talpakan.com:3009/api/v2/Users/exempted/limit/withdrawal
    // -paramt -

  //  console.log('Array_AUTOWITHDRAW',Array_AUTOWITHDRAW)
    api
        .post(`${Api.request.URL}/api/v2/Users/exempted/limit/withdrawal`, ArrayParam)
        .then(res => {
          console.log(res.data.data);

          const sample = getUsers.findIndex(item => item.id === user_ID);
              const newArena = getUsers;
              newArena[sample].status = status;


          alert.success(res.data.data);

          setLoading(false);
          setOpenBlock(false)
     
        })
        .catch(error => {
          alert.error(error.response.data.message);
          setLoading(false);
          setOpenBlock(false)
        });


  }

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
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getUsers.length ? (

          getUsers.map((row,i) => {
            return (


            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.username}</StyledTableCell>
              <StyledTableCell align="left">{row.first_name}</StyledTableCell>
              <StyledTableCell align="left">{row.allow}</StyledTableCell>
              <StyledTableCell align="left"><Button 
                              variant="contained"
                              color="secondary"
                              size="small"
                              className={classes.button}
                              startIcon={<BlockIcon />}
                              //disabled={row.isAutoWithdraw == 1 ? true:false}

                             // href={`/app/account/agent/tree/${row.id}/${row.username}`}
                             onClick={e => handleClickblock(e, row.id,row.username,row.status)}
                            >{row.status === 1 ? 'Unexempt' : 'Exempt'}
                          </Button >
                          </StyledTableCell>
                          
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


    <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          open={openBlock}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CardHeader
           className={classes.dialog}
            title={'Block '+userName}
          />
            <DialogContent>
            <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to {autoWIthdraw === 1 ? 'Unexempt' : 'Exempt'} {userName}?
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
    <Divider/>
    <DialogActions>
    <Button  onClick={() => handleClickblockUnblock(autoWIthdraw === 1 ? 0 : 1)} color="primary" autoFocus>
            Ok
          </Button>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
         
        </DialogActions>
  </Dialog>



    <Backdrop className={classes.backdrop} open={backdropopen}>
            <CircularProgress color="inherit" />
          </Backdrop>
    </div>
  );
}
