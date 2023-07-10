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
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
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
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searcH: {
    float: "right",
  },
  Generate: {
    float: "right",
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
    const classes = useRowStyles();
    const alert = useAlert();

    const handleClose = () => {
      setErrorPassword(false);
      setWrongPassword("");
      setOpenWithdraw(false);
    };

    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [password, setPassword] = React.useState("");
    const [cpoint, setCpoints] = React.useState("");
    const [NOTE, setPostNotes] = React.useState("");
    //**************************************  TOP UP LOAD    ************************************ */
    let GROUP;

    if (row.allow === "PLATINUM") {
      GROUP = (
        <TableCell
          align="left"
          style={{ color: "#ffc107", fontWeight: "bold" }}
        >
          {row.allow}
        </TableCell>
      );
     
    } else if (row.allow === "AGENT") {
      GROUP = (
        <TableCell
          align="left"
          style={{ color: "#6d4c41", fontWeight: "bold" }}
          onClick={(e) => handleClickWithdraw(e, row.id)}
        >
          {row.allow}
        </TableCell>
      );
    
    } else {
      GROUP = (
        <TableCell
          align="left"
          style={{ color: "#3949ab", fontWeight: "bold" }}
        >
          {row.allow}
        </TableCell>
      );
    }
    //************************************** Manual Withdraw  *************************************/
    const [amountPoints, setAmountPoints] = useState("");
    const [UserNameID, setUsernameID] = useState("");
    const [UserName, setUsername] = useState("");
    const [wrongPassword, setWrongPassword] = React.useState("");
    const [errorPass, setErrorPassword] = useState(false);

    const handleClickWithdraw = (e, id) => {
      setOpenWithdraw(true);
      let users = {};
      getUsers.map((row) => {
        if (row.id === id) {
          return (users = row);
        } else {
          return false;
        }
      });

      setCpoints(users.playing_points);
      setUsernameID(users.id);
      setUsername(users.username);
    };
    const handleFormSubmitWithdraw = (e) => {
      e.preventDefault();
      setLoading(true);
      if (password === String(Api.request.authorized)) {
        const ArrayWithdrawPOints = {
          playerId: UserNameID,
          userId: Api.request.userID,
          points: amountPoints,
          note: NOTE,
          internal_password: Api.request.authorized,
        };
        api.post(
            `${Api.request.URL}/api/v2/fund/manual/withdraw/`,
            ArrayWithdrawPOints
          )
          .then((res) => {
            if (res.data.message === "PLAYER BALANCE IS INSUFICCIENT") {
              setLoading(false);
              setOpenWithdraw(false);
              alert.error(res.data.message);
            } else if (
              res.data.message === "YOU'RE NOT ALLOWED TO APPROVE! USER POINTS IS INSUFFICIENT!"
            ) {
              setLoading(false);
              setOpenWithdraw(false);
              alert.error(res.data.message);
            } else {
              const sample = getUsers.findIndex(
                (item) => item.id === UserNameID
              );
              const newArena = getUsers;
              newArena[sample].playing_points = Number(cpoint) - Number(amountPoints);
              setLoading(false);
              setOpenWithdraw(false);
              alert.success(res.data.message);
            }
          })
          .catch((error) => {
            setLoading(false);
            setOpenWithdraw(false);
            alert.error(error.response.data.message);
          });
      } else {
        setErrorPassword(true);
        setWrongPassword("*Wrong Password*");
        setLoading(false);
      }
    };
    //**************************************  END manual WIthdraw     ************************************ */
    return (
      <React.Fragment>
        {/*************************************************** *With Draw Points/Commission ****************************************/}
        <Dialog
          open={openWithdraw}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <CardHeader className={classes.dialog} title="Withdraw Points" />
          <form onSubmit={handleFormSubmitWithdraw}>
            <DialogContent>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                defaultValue={UserName}
                type="text"
                InputProps={{readOnly: true,}}
                fullWidth={true}
              />
              <TextField
                InputLabelProps={{shrink: true,}}
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Points"
                type="number"
                onChange={(e) => setAmountPoints(e.target.value)}
                name="amount_points"
                fullWidth={true}
              />
              <TextField
                id="standard-number"
                InputLabelProps={{shrink: true,}}
                multiline
                autoFocus
                label="Note"
                variant="outlined"
                type="text"
                margin="dense"
                onChange={(e) => setPostNotes(e.target.value)}
                name="points"
                fullWidth
              />
              <TextField
                id="standard-number"
                InputLabelProps={{shrink: true,}}
                error={errorPass ? true : false}
                autoFocus
                variant="outlined"
                margin="dense"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                fullWidth
              />
              <Typography style={{ color: "red" }}> {wrongPassword}</Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} style={Api.button_orange}>
                Cancel
              </Button>
              <Button style={Api.button_green} type="submit">
                Withdraw
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/**************************************************** End With Draw Points/Commission ****************************************/}
        <TableRow className={classes.table}>
          <TableCell align="left">
            <Button
              color="secondary"
              size="small"
              className={classes.button}
              startIcon={<MoneyOffIcon />}
              onClick={(e) => handleClickWithdraw(e, row.id)}
            >
              Withdraw
            </Button>
          </TableCell>
          <TableCell align="left" style={{ color: "red" }}>
            {row.playing_points === null
              ? "0"
              : row.playing_points.toLocaleString()}
          </TableCell>
          <TableCell align="left">{row.username}</TableCell>
          <TableCell align="left">
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
    api.post(URL, arraySearh)
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
    return (row = [
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
    ]);
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
                <TableCell align="left" style={{ color: "white" }}>
                  Action
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Points
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Username
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
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
