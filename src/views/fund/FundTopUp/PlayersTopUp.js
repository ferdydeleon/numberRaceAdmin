import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../../axios";
import Api from "../../../Api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import { useAlert } from "react-alert";
import {
  Box,
  CardHeader,
  Card,
  Grid,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import NumberFormat from "react-number-format";
const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  importButton: {
    margincenter: theme.spacing(1),
  },
  exportButton: {
    margincenter: theme.spacing(1),
  },
  searcH: {
    float: "center",
  },
  Generate: {
    float: "center",
    marginTop: "7px",
  },
  head: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
  dialog: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
}));

function createData(
  index,
  id,
  refcode,
  username,
  first_name,
  last_name,
  playing_points,
  comission_points,
  allow
) {
  return {
    index,
    id,
    refcode,
    username,
    first_name,
    last_name,
    playing_points,
    comission_points,
    allow,
  };
}

export default function CollapsibleTable() {
  function Row(props) {
    const { row } = props;
    //const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const alert = useAlert();

    const handleClose = () => {
      setWrongPassword("");
      setErrorPassword(false);
      setPostLoad(false);
      //setViewAgent(false);
    };

    const [postload, setPostLoad] = React.useState(false);
    const [PlatinumID, setPlatinumID] = React.useState("");
    const [postPoints, setPostPoints] = React.useState("");
    const [TypeMOP, setTypeMOP] = useState("");
    const [password, setPassword] = React.useState("");
    const [fname, setFname] = React.useState("");
    const [cpoint, setCpoints] = React.useState("");
    const [NOTE, setPostNotes] = React.useState("");
    const [wrongPassword, setWrongPassword] = React.useState("");
    const [errorPass, setErrorPassword] = useState(false);

    const Updatepending = Api.ACCOUNTING_USER.ACCTG.filter(
      (item) => item.username === Api.request.username
    );
    const access_top_up_directPlayer =
      parseInt(Updatepending.map((val) => val.top_up_directPlayer)) === 1;

    const handleClickLoad = (e, id, fname, lname, Cpoint, username) => {
      // let fullName = fname + ' ' + lname;
      setPostLoad(true);
      setPlatinumID(id);
      //console.log('usernameID: ', id);
      setFname(username);
      setCpoints(Cpoint);
    };

    //**************************************  TOP UP LOAD    ************************************ */
    const handleSubmitLoad = (e) => {
      e.preventDefault();
      setLoading(true);
      //console.log("authorized: ", password === String(Api.request.authorized))
      if (password === String(Api.request.authorized)) {
        setPostLoad(false);
        const LOAD = {
          playerId: PlatinumID,
          userId: Api.request.userID,
          points: postPoints,
          paid: TypeMOP,
          note: NOTE,
          // internal_password: 'talpakandotcom'
        };
        //console.log('LOAD: ', LOAD);
        const sample = getUsers.findIndex((item) => item.id === PlatinumID);
        const newArena = getUsers;
        api
          .post(`${Api.request.URL}/api/v2/fund/manual/load/`, LOAD)
          .then((res) => {
            //console.log(res.data)
            if (res.data.message === "YOUR BALANCE IS INSUFICCIENT") {
              alert.error(res.data.message);
              setLoading(false);
            } else {
              //console.log(res.data.message)
              alert.success(res.data.message);
              newArena[sample].playing_points =
                Number(cpoint) + Number(postPoints);
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            // console.log("error",error.response.request.status)
            setWrongPassword("");
            alert.error(error.response.data.message);

            //  console.log("error",error)status
            //  console.log("request",error.response.request.responseText)
            //   alert.error(error.response.data.message);
          });
        // }
      } else {
        setErrorPassword(true);
        setWrongPassword("*Wrong Password*");
        //alert.error('Wrong Password!');
        setLoading(false);
      }
    };

    let GROUP;
    let TopUpBotton;
    if (row.allow === "PLATINUM") {
      GROUP = (
        <TableCell
          align="center"
          style={{ color: "#ffc107", fontWeight: "bold" }}
        >
          {row.allow}
        </TableCell>
      );
      TopUpBotton = (
        <Button
          size="large"
          color="primary"
          startIcon={<MonetizationOnIcon />}
          onClick={(e) =>
            handleClickLoad(
              e,
              row.id,
              row.first_name,
              row.last_name,
              row.playing_points,
              row.username
            )
          }
        >
          Top Up
        </Button>
      );
    } else if (row.allow === "AGENT") {
      GROUP = (
        <TableCell
          align="center"
          style={{ color: "#6d4c41", fontWeight: "bold" }}
        >
        {row.allow} 
        </TableCell>
      );

      TopUpBotton = (
        <Button
          size="large"
          color="primary"
          disabled={true}
          // startIcon={<MonetizationOnIcon />}
          // onClick={e =>
          //   handleClickLoad(
          //     e,
          //     row.id,
          //     row.first_name,
          //     row.last_name,
          //     row.playing_points,
          //     row.username
          //   )
          // }
        >
          Top Up
        </Button>
      );
    } else {
      GROUP = (
        <TableCell
          align="center"
          style={{ color: "#3949ab", fontWeight: "bold" }}
        >
          {row.allow}
        </TableCell>
      );
      TopUpBotton = (
        <Button
          size="large"
          color="primary"
          disabled={true}
          // startIcon={<MonetizationOnIcon />}
          // onClick={e =>
          //   handleClickLoad(
          //     e,
          //     row.id,
          //     row.first_name,
          //     row.last_name,
          //     row.playing_points,
          //     row.username
          //   )
          // }
        >
          Top Up
        </Button>
      );
    }
    //**************************************  END TOP UP LOAD    ************************************ */

    // let FNAME = (<Typography variant="h4" style={{color: "red"}}>{fname}</Typography>)

    return (
      <React.Fragment>
        <Dialog
          open={postload}
          fullWidth={true}
          maxWidth={"xs"}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CardHeader className={classes.dialog} title={`Load To (${fname})`} />

          {/************************************************** TOP LOAD FORM ****************************************************/}
          <form onSubmit={handleSubmitLoad}>
            <DialogContent>
              {/* <TextField
                id="standard-helperText"
                defaultValue={fname}
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                variant="filled"
                margin="dense"
              /> */}
              {/* 
<NumberFormat
        thousandsGroupStyle="thousand"
        
        // prefix="$"
        decimalSeparator="."
        customInput={TextField}
        displayType="input"
        type="text"
        thousandSeparator={true}
        allowNegative={true} 
        name="points"
        fullWidth
        onChange={e => setPostPoints(e.target.value)}
        /> */}

              <TextField
                id="standard-number"
                InputLabelProps={{
                  shrink: true,
                }}
                required={true}
                autoFocus
                label="Points"
                type="number"
                margin="dense"
                onChange={(e) => setPostPoints(e.target.value)}
                name="points"
                fullWidth
              />

              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                required={true}
                select
                name="type"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Mode Of Payment"
                onChange={(e) => setTypeMOP(e.target.value)}
              >
                <MenuItem key={1} value={"PAID"}>
                  PAID
                </MenuItem>
                <MenuItem key={2} value={"UNPAID"}>
                  UNPAID
                </MenuItem>
              </TextField>

              <TextField
                id="standard-number"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={4}
                autoFocus
                label="Note"
                type="text"
                margin="dense"
                onChange={(e) => setPostNotes(e.target.value)}
                name="noted"
                fullWidth
              />

              <TextField
                id="standard-number"
                InputLabelProps={{
                  shrink: true,
                }}
                error={errorPass ? true : false}
                margin="dense"
                label="Password"
                type="password"
                required={true}
                /* helperText={valid} */
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                fullWidth
              />

              <Typography style={{ color: "red" }}> {wrongPassword}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={Api.button_orange}>
                Cancel Load
              </Button>
              <Button type="submit" style={Api.button_green}>
                Send Load
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <TableRow className={classes.table}>
          <TableCell align="center">
            {access_top_up_directPlayer === true ? (
              <Button
                size="large"
                color="primary"
                startIcon={<MonetizationOnIcon />}
                onClick={(e) =>
                  handleClickLoad(
                    e,
                    row.id,
                    row.first_name,
                    row.last_name,
                    row.playing_points,
                    row.username
                  )
                }
              >
                Top Up
              </Button>
            ) :TopUpBotton }
          </TableCell>
          <TableCell align="center" style={{ color: "red" }}>
            {row.playing_points === null
              ? "0"
              : row.playing_points.toLocaleString()}
          </TableCell>
          <TableCell align="center">{row.username}</TableCell>
          <TableCell align="center">
            {row.first_name} {row.last_name}
          </TableCell>
          {GROUP}
        </TableRow>
      </React.Fragment>
    );
  }
  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [noRecord, setNoRecord] = useState("");
  const alert = useAlert();

  const handleClickSearch = () => {
    setLoading(true);
    const arraySearh = {
      username: search,
    };
    let URL = "";
    URL = `${Api.request.URL}/api/v2/users/search/player/`;
    api
      .post(URL, arraySearh)
      .then((res) => {
        setGetUsers(res.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setNoRecord("No Record Found!");
        alert.error(error.response.data.message);
        setLoading(false);
      });
  };

  let row = [];
  getUsers.map((value, index) => {
   return row = [
      ...row,
      createData(
        index,
        value.id,
        value.refcode,
        value.username,
        value.first_name,
        value.last_name,
        value.playing_points,
        value.comission_points,
        value.allow
      ),
    ];
  });

  
  const classes = useRowStyles();

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
                        style={{ cursor: "pointer" }}
                        onClick={handleClickSearch}
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Username"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table id="emp" aria-label="collapsible table">
            <TableHead>
              <TableRow className={classes.head}>
                {/* <TableCell align="center" style={{ color: 'white' }}>
                  #
                </TableCell>  */}
                <TableCell align="center" style={{ color: "white" }}>
                  Action
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Points
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Username
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Name
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.length ? (
                row.map((row, i) => {
                  return <Row key={i} row={row} />;
                })
              ) : (
                <TableRow>
                  <TableCell key={1} colSpan={8}>
                    {noRecord}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Backdrop className={classes.backdrop} open={backdropopen}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </TableContainer>
      </Box>
    </div>
  );
}
