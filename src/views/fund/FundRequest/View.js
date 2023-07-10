import React, { useState } from 'react';
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
import { Box, Button, Typography, CardHeader } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useAlert } from 'react-alert';
import Alert from '@material-ui/lab/Alert';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Api.table.head,
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

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  box: {
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
  selectype: {
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
    width: '25ch'
  }
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);
export default function CustomizedTables() {
  const classes = useStyles();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [fund, setFund] = useState([]);

  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [Page, setPage] = useState(1);

  const handleNextPage = (event, value) => {
    setPage(value);
    // console.log('handleChange: ', value);
    return FundRequest('', value, '');
  };

  const handleClickSearch = () => {
    return FundRequest(search, Page, '');
  };

  const FundRequest = async (search, page, STATUS) => {
    if (search === undefined || page === undefined) {
      search = '';
      page = 1;
      STATUS = '';
    } else {
    }
    //let accesTOken = localStorage.getItem('access');
    setLoading(true);
    try {
      await api
        .get(
          `${Api.request.URL}/admin/merchant/request/list/?page=${page}&status=${STATUS}&s=${search}`
        )
        .then(res => {
          //console.log(res.data.DATA.data);
          setFund(res.data.DATA.data);
          setTotalPage(res.data.DATA.total_page);
        })
        .catch(error => {
          alert.error(error.response.data.message);
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   FundRequest();
  // }, []);

  const [values, setValues] = useState({
    status: ''
  });
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

    /* console.log("values: ",event.target.value) */
    let STATUS = event.target.value;
    if (event.target.value === 'ALL') {
      STATUS = '';
    } else {
      STATUS = event.target.value;
    }

    return FundRequest(search, Page, STATUS);
  };

  const [statusDialog, setStatusDialog] = React.useState(false);
  const [statusRoll, setStatusRoll] = React.useState(false);
  const [pinPassword, setPinPassword] = useState(false);
  const [rowID, setRowID] = useState('');
  const [statusRequest, setStatusRequest] = useState('');
  const [note, setNote] = useState('');

  const handleClickApprove = (e, rowid) => {
    setRowID(rowid);
    setStatusDialog(true);
  };

  const handleClickRollback = (e, rowid) => {
    setRowID(rowid);
    setStatusRequest('rollback');
    setStatusRoll(true);
  };

  const handleClose = () => {
    setStatusDialog(false);
    setPinPassword(false);
    setStatusRoll(false);
  };

  const handleClickCheckPassword = () => {
    setStatusDialog(false);
    setPinPassword(true);
    setStatusRoll(false);
  };

  const [password, setPassword] = useState('');
  const handleClickSending = () => {
    if (password === String(Api.request.authorized)) {
      /*    console.log('rowID: ', rowID);
      console.log('statusRequest: ', statusRequest);
      console.log('yes'); */

      const approveRequest = {
        status: statusRequest,
        requestId: rowID,
        note: note,
        approveId: Api.request.userID
      };

      setLoading(true);
      api
        .post(`${Api.request.URL}/xyZ/merchant/request/approve`, approveRequest)
        .then(res => {
          setPinPassword(false);
          alert.success(res.data.message);

          FundRequest(setFund);
        })
        .catch(error => {
          // console.log(error.response.data.message);
          alert.error(error.response.data.message);
          // setApprove(false);
          setPinPassword(false);
        });
      setLoading(false);
    } else {
      // console.log
      alert.error('Wrong Password!');
    }
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={statusRoll}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          style={{ backgroundColor: 'rgb(243 122 7)', color: 'white' }}
          title="Fund Rollback"
        />

        <DialogContent>
          <TextField
            margin={'dense'}
            fullWidth={true}
            id="outlined-select-currency"
            label="Status"
            defaultValue={'Rollback'}
            onChange={e => setStatusRequest(e.target.value)}
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
          ></TextField>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Input Note"
            margin={'dense'}
            variant="outlined"
            multiline
            rows={4}
            name={note}
            onChange={e => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickCheckPassword} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={statusDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          style={{ backgroundColor: '#4caf50', color: 'white' }}
          title="Fund"
        />
        <DialogContent>
          <TextField
            fullWidth={true}
            id="outlined-select-currency"
            select
            label="Select Status"
            value={statusRequest}
            onChange={e => setStatusRequest(e.target.value)}
            helperText="Please select Status"
            variant="outlined"
          >
            <MenuItem value={'approve'}>APPROVE</MenuItem>
            <MenuItem value={'cancel'}>CANCEL</MenuItem>
            {/*     <MenuItem value={'rollback'}>ROLLBACK</MenuItem> */}
          </TextField>
          {statusRequest === 'approve' || statusRequest === '' ? (
            ''
          ) : (
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Input Note"
              margin={'normal'}
              variant="outlined"
              multiline
              rows={4}
              name={note}
              onChange={e => setNote(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickCheckPassword} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        open={pinPassword}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          style={{ backgroundColor: '#3f51b5', color: 'white' }}
          title="Please Enter Your Password?"
        />
        <DialogContent>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Input Password"
            variant="outlined"
            name={password}
            onChange={e => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickSending} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Box mt={3}>
          <Paper component="form" className={classes.Paperoot}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search Merchant"
              type="search"
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

          <Paper component="form" className={classes.selectype}>
            <TextField
              className={classes.TextField}
              id="standard-select-currency"
              select
              name="status"
              label="Select Status"
              value={values.status}
              onChange={handleChange}
              style={{ margin: '-1px' }}
            >
              <MenuItem key={1} value={'ALL'}>
                ALL
              </MenuItem>
              <MenuItem key={2} value={'PENDING'}>
                PENDING
              </MenuItem>
              <MenuItem key={3} value={'CANCEL'}>
                CANCEL
              </MenuItem>
              <MenuItem key={4} value={'ROLLBACK'}>
                ROLLBACK
              </MenuItem>
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
              <StyledTableCell>merchantName</StyledTableCell>
              <StyledTableCell>username</StyledTableCell>
              <StyledTableCell>requestDate</StyledTableCell>
              <StyledTableCell>approveDate</StyledTableCell>
              <StyledTableCell>request_fund</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fund.map((row, index) => {
              let STAT;
              let buttonProcess;
              switch (row.stat) {
                case 'PENDING':
                  STAT = (
                    <Alert variant="filled" severity="info">
                      PENDING
                    </Alert>
                  );
                  buttonProcess = (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<InfoIcon />}
                      onClick={e => handleClickApprove(e, row.rowid)}
                    >
                      Pending Process
                    </Button>
                  );
                  break;

                case 'APPROVE':
                  STAT = (
                    <Alert variant="filled" severity="success">
                      APPROVE
                    </Alert>
                  );
                  buttonProcess = (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<InfoIcon />}
                      onClick={e => handleClickRollback(e, row.rowid)}
                    >
                      Rollback
                    </Button>
                  );
                  break;
                case 'CANCEL':
                  STAT = (
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Note</Typography>
                          <b>{row.note}</b>
                        </React.Fragment>
                      }
                    >
                      <Alert variant="filled" severity="error">
                        CANCEL
                      </Alert>
                    </HtmlTooltip>
                  );

                  break;
                default:
                  STAT = (
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Note</Typography>
                          <b>{row.note}</b>
                        </React.Fragment>
                      }
                    >
                      <Alert variant="filled" severity="warning">
                        ROLLBACK
                      </Alert>
                    </HtmlTooltip>
                  );
              }
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.merchantCode}
                  </StyledTableCell>
                  <StyledTableCell>{row.merchantName}</StyledTableCell>
                  <StyledTableCell>{row.username}</StyledTableCell>
                  <StyledTableCell>
                    {row.requestDate.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.approveDate.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.request_fund.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell>{STAT}</StyledTableCell>
                  <StyledTableCell>{buttonProcess}</StyledTableCell>
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
