import React, { useState, useEffect,useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TableCell,
  MenuItem,
  Divider,
  Grid,
  TextField,
  CardHeader,
  Card,
  CardContent,
  makeStyles,
  withStyles,
  CardActions,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import api from "../../../axios";
import Api from "../../../Api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import QueueIcon from "@material-ui/icons/Queue";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { useAlert } from "react-alert";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import S3 from "react-aws-s3";
import Color from "../../../utils/colors";
// import { rest } from 'lodash';
// import { Refresh } from '@material-ui/icons';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { fetchdeclaratorList, fetchEvent } from "../../../adminModel/data";


const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  table: {
    minWidth: 650,
  },
  appBar: {
    position: "relative",
    backgroundColor: Color.tableColor,
    color: theme.palette.common.white,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    color: theme.palette.common.white,
  },
  dialog: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
}));

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Edit = (props) => {
  const classes = useStyles();
  const alert = useAlert();

  //*************************************** start Fetch Event List  *********************************************** *//
  const [EventName, setEventName] = useState("");
  const [GameID, setGameType] = useState(0);
  const [GameName, setGameName] = useState("");
  const [Arena, setArenaName] = useState("");
  const [ArenaID, setArenaID] = useState(0);
  const [Agent, setAgent] = useState("");
  const [Company, setCompany] = useState("");
  //const [EventImage, setEventImage] = useState(null);
  //const [EventImageName, setEventNameImage] = useState(null);
  const [minBet, setMinBet] = useState("");
  const [maxBet, setMaxBet] = useState("");
  const [betmaxtype, setBetMaxType] = useState("");

  var { id, status } = useParams();

  const [disable, setDisAble] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${Api.request.URL}/api/v2/event/${id}`)
      .then((res) => {
        setLoading(false);
        let row = {};
        res.data.data.data.map((val) => {
          return (row = val);
        });
        setEventName(row.event_name);
        setGameType(row.game_type);
        setGameName(row.game_name);
        setArenaName(row.arena_name);
        setArenaID(row.arena_id);
        setAgent(row.agent);
        setCompany(row.company);
        setMinBet(row.minBet);
        setMaxBet(row.maxBet);
        setBetMaxType(row.bet_max_type);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  //*************************************** End Fetch Event List  *********************************************** *//

  //*************************************** End Fetch Event List  *********************************************** *//
  const [sueccesBar, setSuccessbar] = React.useState(false);
  const [errorBar, setErrorbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ResponseMessage, setResponseMessage] = useState("");
  // const [GameEvent, setGameEvent] = useState('');

  const config = {
    username: "picevensuploader",
    bucketName: "ezybetgame",
    dirName: "ButtonImage", //optional talpakanimage
    region: "ap-southeast-1",
    accessKeyId: "AKIA4WBZUBMK4OBUFSOL",
    secretAccessKey: "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",
  };

  const handleFormSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const ArrayEvent = {
      id: id,
      userId: Api.request.userID,
      gameType: GameID,
      arenaId: ArenaID,
      eventName: EventName,
      img_url: "",
      minBet: minBet,
      maxBet: maxBet,
      max_bet_type: betmaxtype,
      // bet_max_type:
    };

    api
      .post(`${Api.request.URL}/api/v2/Event`, ArrayEvent)
      .then((res) => {
        setResponseMessage(res.data.message);
        setSuccessbar(true);
        setLoading(false);
      })
      .catch((error) => {
        /* error.response.data.message */
        setResponseMessage(error.response.data.message);
        setErrorbar(true);
        setLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessbar(false);
    setOpenAssigned(false);
    setErrorbar(false);
  };
  //*************************************** End Fetch Event List  *********************************************** *//

  const [gameList, setGamelist] = useState([]);

  useEffect(() => {
    api
      .get(`${Api.request.URL}/api/v2/Game`)
      .then((res) => {
        setGamelist(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeGame = (event) => {
    setGameType(event.target.value);
    let gametype = {};
    // gameList.map(val => {
    //   if (val.id === event.target.value)
    //   return (gametype = val);
    //   //return (videoFeeder = arena);
    // });
    setAgent(gametype.agent);
    setCompany(gametype.company);
  };

  const [listArena, setListArena] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${Api.request.URL}/api/v2/Arena`)
      .then((res) => {
        setLoading(false);
        setListArena(res.data.data.data);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setListArena([]);
        // alert.error('No Arena Found');
      });
  }, []);

  const [listUsername, setlistUsername] = useState([]);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      // You can await here
      const declaratorList = await fetchdeclaratorList();
      setlistUsername(declaratorList);
      setLoading(false);
    }
    fetchData().catch(console.error);
  }, []);

  // ************************************** Start api/v2/button/event/ **************************************

  const [listButton, setButton] = useState([]);
  const [sequence, setSequence] = useState([]);
  //const [idButton, setGetButtonID] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchEvent(id);
      if (results === "NO DATA FOUND") {
        //console.log(results.length);
        setButton([]);
        setLoading(false);
      } else {
        let Sequence = results.map((elem) =>
          elem.sequence === null ? 0 : elem.sequence
        );
        setButton(results);
        setSequence(Sequence);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ************************************** END api/v2/button/event/ **************************************

  const handleDisable = () => {
    setDisAble(!disable);
  };

  // ************************************** end point ng naka assigned na user**************************************

  const [assigned, setAssigned] = useState([]);

  const AssignedDeclarator = useCallback(async () => {
    try {
      await api
        .get(`${Api.request.URL}/api/v2/Event/assign/user/${id}`)
        .then((res) => {
          //  setLoading(false)
          setAssigned(res.data.data.data);
          // console.log(res.data.data.data)
        })
        .catch((error) => {
          setLoading(false);
          setAssigned([]);
          // alert.error(error.response.data.message)
        });
    } catch (e) {
      // setLoading(false);
      //console.log(e);
    }
  }, [id]);

  useEffect(() => {
    AssignedDeclarator();
  }, [AssignedDeclarator]);

  const [assignID, setAssignedUsername] = useState("");
  const handleFormAssigned = (e, removeId) => {
    e.preventDefault();
    let assignArray;
    // let IdDelete = removeId;
    if (removeId === undefined) {
      assignArray = {
        event: id,
        userId: assignID,
        type: "CREATE",
      };
    } else {
      assignArray = {
        event: id,
        userId: removeId,
        type: "DELETE",
      };
      //setAssigned()
    }

    api
      .post(`${Api.request.URL}/api/v2/Event/user/assign`, assignArray)
      .then((res) => {
        // const sample = posts.findIndex(item => item.id === eventID);
        // const newArena = posts;
        // newArena[sample].STATUS = EventSTATUS;
        setLoading(false);
        setOpenAssigned(false);
        alert.success(res.data.message);
        return AssignedDeclarator();
      })
      .catch((error) => {
        alert.error(error.response.data.message);
        setLoading(false);
        setOpenAssigned(false);
      });
  };

  /// END **********************************************

  // ************************************** Start Create Button  **************************************
  const [open, setOpen] = React.useState(false);
  const [yesJackPot, setYesJakpot] = React.useState(false);
  const [yesDraw, setYesDraw] = React.useState(false);
  const [yesImage, setYesImage] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [colorButton, setColorButton] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonLabel, setButtonLabel] = React.useState([]);
  const handleChange = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "isJackpot") {
      setYesJakpot(!yesJackPot);
      console.log(!yesJackPot);
      if (event.target.value === "1") {
        switch (colorButton.toUpperCase()) {
          case "RED":
            setButtonName("RED_JACKPOT");
            setButtonLabel("RED JACKPOT");
            break;
          case "BLUE":
            setButtonName("BLUE_JACKPOT");
            setButtonLabel("BLUE JACKPOT");
            break;
          case "GREEN":
            setButtonName("GREEN_JACKPOT");
            setButtonLabel("GREEN JACKPOT");
            break;
          case "YELLOW":
            setButtonName("YELLOW_JACKPOT");
            setButtonLabel("YELLOW JACKPOT");
            break;
          case "PINK":
            setButtonName("PINK_JACKPOT");
            setButtonLabel("PINK JACKPOT");
            break;
          case "WHITE":
            setButtonName("WHITE_JACKPOT");
            setButtonLabel("WHITE JACKPOT");
            break;
          default:
            setButtonName("");
            setButtonLabel([]);
        }
      } else {
        setButtonName("");
        setButtonLabel([]);
      }
    } else if (event.target.name === "isDraw") {
      setYesDraw(!yesDraw);
    } else if (event.target.name === "button_color") {
      if (yesJackPot === true) {
        switch (event.target.value.toUpperCase()) {
          case "RED":
            setButtonName("RED_JACKPOT");
            setButtonLabel("RED JACKPOT");
            break;
          case "BLUE":
            setButtonName("BLUE_JACKPOT");
            setButtonLabel("BLUE JACKPOT");
            break;
          case "GREEN":
            setButtonName("GREEN_JACKPOT");
            setButtonLabel("GREEN JACKPOT");
            break;
          case "YELLOW":
            setButtonName("YELLOW_JACKPOT");
            setButtonLabel("YELLOW JACKPOT");
            break;
          case "PINK":
            setButtonName("PINK_JACKPOT");
            setButtonLabel("PINK JACKPOT");
            break;
          case "WHITE":
            setButtonName("WHITE_JACKPOT");
            setButtonLabel("WHITE JACKPOT");
            break;
          default:
            setButtonName("");
            setButtonLabel([]);
        }
      } else {
        setButtonName("");
        setButtonLabel([]);
      }

      setColorButton(event.target.value);
    } else if (event.target.name === "img_url") {
      setSelectedFile(event.target.files);
      setYesImage(!yesImage);
    } else {
      setAssignedUsername(event.target.value);
    }
  };

  const [form, setValues] = useState({
    event: "",
    button_color: "",
    isJackpot: "",
    jackpot_price: "",
    isDraw: "",
    draw_price: "",
    img_url: null,
    isImgShow: "",
    comission: "",
    sequence: "",
    userId: Api.request.userID,
  });

  const handleFormSubmitCreateButton = (e) => {
    e.preventDefault();
    let sequenceNo;
    if (form.sequence === "") {
      sequenceNo = "0";
    } else {
      sequenceNo = form.sequence;
    }
    /// //console.log('addbutton: ', img_url);
    if (form.img_url === null) {
      let uniqueChars = [buttonLabel];
      let jacpotlabel =
        yesJackPot === true ? `['${buttonLabel}']` : `[${uniqueChars}]`;
      const ArrayCreateButton = {
        event: id,
        button_color: colorButton,
        button_name: buttonName.toLocaleUpperCase(),
        isJackpot: form.isJackpot,
        jackpot_price: form.jackpot_price,
        isDraw: form.isDraw,
        draw_price: form.draw_price,
        img_url: "",
        isImgShow: form.isImgShow,
        comission: form.comission,
        sequence: sequenceNo,
        button_label: jacpotlabel,
        userId: Api.request.userID,
      };
      //console.log("ArrayCreateButton: ", ArrayCreateButton);
      setLoading(true);
      api
        .post(`${Api.request.URL}/api/v2/Button`, ArrayCreateButton)
        .then((res) => {
          //listButton.unshift(pushButton);
          setYesImage("");
          setYesJakpot("");
          setYesDraw("");
          setLoading(false);
          setOpen(false);
          alert.success(res.data.message);
          return fetchData();
        })
        .catch((error) => {
          alert.error(error.response.data.message);
          setYesImage("");
          setYesJakpot("");
          setYesDraw("");
          setLoading(false);
          setOpen(false);
        });
    } else {
      const ArrayCreateButton = {
        event: id,
        button_color: colorButton,
        button_name: buttonName,
        isJackpot: form.isJackpot,
        jackpot_price: form.jackpot_price,
        isDraw: form.isDraw,
        draw_price: form.draw_price,
        img_url: selectedFile[0].name,
        isImgShow: form.isImgShow,
        comission: form.comission,
        sequence: sequenceNo,
        userId: Api.request.userID,
      };
      setOpen(false);
      console.log("ArrayCreateButton IMAGE: ", ArrayCreateButton);
      let file = selectedFile[0];
      let newFileName = selectedFile[0].name;
      console.log("config: " + config);
      //setOpen(false);
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        console.log("data: ", data);
        if (data.status === 204) {
          api
            .post(`${Api.request.URL}/api/v2/Button`, ArrayCreateButton)
            .then((res) => {
              setYesImage("");
              setYesJakpot("");
              setYesDraw("");
              setLoading(false);
              setOpen(false);
              //console.log("create new Button111")
              alert.success(res.data.message);
              ////console.log("create new Button")
              //window.location.reload(false);
              return fetchData();
            })
            .catch((error) => {
              alert.error(error.response.data.message);
              setYesImage("");
              setYesJakpot("");
              setYesDraw("");
              setLoading(false);
              setOpen(false);
            });
          console.log("success");
        } else {
          console.log("Fail");
        }
      });
    }
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const [openassigned, setOpenAssigned] = React.useState(false);
  const handleClickOpenAssigned = () => {
    setOpenAssigned(true);
  };

  const handleCloseDialog = () => {
    setYesImage("");
    setYesJakpot("");
    setYesDraw("");
    setOpen(false);
  };

  const jakcpotPrice = (
    <TextField
      fullWidth
      label="Jackpot Price"
      margin="normal"
      name="jackpot_price"
      defaultValue={0}
      type="text"
      inputProps={{ min: "1", max: "100", step: "5" }}
      variant="outlined"
      onChange={handleChange}
    />
  );

  const drawPrice = (
    <TextField
      fullWidth
      label="Draw Price"
      margin="normal"
      name="draw_price"
      defaultValue={0}
      onChange={handleChange}
      inputProps={{ min: "1", max: "100", step: "5" }}
      type="text"
      variant="outlined"
    />
  );

  // const IMAGE = (
  //   <TextField
  //     fullWidth
  //     id="filled-select-currency-native"
  //     select
  //     label="Show Image"
  //     margin="normal"
  //     name="isImgShow"
  //     onChange={handleChange}
  //     SelectProps={{
  //       native: true,
  //     }}
  //     variant="outlined"
  //   >
  //     <option value={0}>No</option>
  //     <option value={1}>Yes</option>
  //   </TextField>
  // );
  // ************************************** END Create Button **************************************

  // ************************************** Start Default  Button Confirmation **************************************
  const [openDefault, setShowDefault] = React.useState(false);
  const [confirmButton, setConfirmButton] = useState([]);

  const handleClickOpenDefault = () => {
    setShowDefault(true);

    api
      .get(`${Api.request.URL}/api/v2/Button/default/${GameID}`)
      .then((res) => {
        setConfirmButton(res.data.data.data);
      })
      .catch((error) => {
        alert.error(error.response.data.message);
      });
  };

  const handleCloseDefault = () => {
    setShowDefault(false);
  };

  const handleSaveDefaultButton = () => {
    setShowDefault(false);

    const ArrayData = {
      event: id, //required
      game_type: GameID, //required
      userId: Api.request.userID,
    };
    api
      .post(`${Api.request.URL}/api/v2/Button/default/`, ArrayData)
      .then((res) => {
        alert.success(res.data.message);
        return fetchData();
      })
      .catch((error) => {
        //console.log("handleSaveDefaultButton: error",error.response.data)
        alert.error(error.response.data.message);
      });
  };
  // ************************************** END Default Button  Confirmation**************************************
  const red = createTheme({
    palette: {
      secondary: {
        main: "rgb(206, 17, 38)",
      },
    },
  });

  const handleRemoveButton = (e, buttonId) => {
    const ArrayDelete = {
      event: id,
      buttonId: buttonId,
      userId: Api.request.userID,
    };

    setLoading(true);
    api
      .post(`${Api.request.URL}/api/v2/Button/delete/`, ArrayDelete)
      .then((res) => {
        setLoading(false);

        alert.success(res.data.message);
        return fetchData();
      })
      .catch((error) => {
        alert.error(error.response.data.message);
      });
  };

  let VALSttus;
  if (status === "SHOW") {
    VALSttus = true;
  } else if (status === "CANCEL") {
    VALSttus = true;
  } else if (status === "CLOSE") {
    VALSttus = true;
  } else {
    VALSttus = false;
  }

  const handleClick = () => {
    window.location.href = Api.history.page;
  };

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <Button
              onClick={VALSttus === true ? null : handleDisable}
              color="primary"
              variant="contained"
              aria-label="settings"
            >
              <EditIcon />
            </Button>
          }
        />

        <Divider />
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <Grid item xs={12}>
              <TextField
                disabled={disable}
                fullWidth={true}
                margin="normal"
                label="Select Game"
                defaultValue={GameName}
                select
                SelectProps={{ native: true }}
                onChange={handleChangeGame}
                variant="outlined"
              >
                <option value={GameID}>{GameName}</option>
                {gameList.map((g, i) => (
                  <option key={i} value={g.id}>
                    {g.game_name}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  fullWidth
                  required
                  label="Agent Share"
                  margin="normal"
                  name="Agent"
                  type="text"
                  onChange={(e) => setAgent(e.target.value)}
                  value={Agent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  fullWidth
                  required
                  label="Company Share"
                  margin="normal"
                  name="Company"
                  type="text"
                  onChange={(e) => setCompany(e.target.value)}
                  value={Company}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  // inputProps={{ min: "10", max: "100",step: "10", pattern: "/^[0-9\b]+$/"}}
                  // error={errorMin ? true : false}
                  // helperText={errorMinimum}
                  fullWidth
                  label="Minimum Bet"
                  name="minBet"
                  required
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={minBet}
                  onChange={(e) => setMinBet(parseInt(e.target.value))}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  // inputProps={{ min: "1000",max: "20000", step: "1000",pattern: "/^[0-9\b]+$/" }}
                  // error={errorMax ? true : false}
                  // helperText={errorMaximun}
                  label="Maximum Bet"
                  fullWidth
                  name="maxBet"
                  required
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={maxBet}
                  onChange={(e) => setMaxBet(parseInt(e.target.value))}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  fullWidth={true}
                  label="Select Arena"
                  margin="normal"
                  onChange={(e) => setArenaID(e.target.value)}
                  required
                  defaultValue={Arena}
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  <option value={ArenaID}>{Arena}</option>
                  {listArena.map((arena, i) => (
                    <option key={i} value={arena.id}>
                      {arena.arena_name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  fullWidth
                  required
                  label="Event Name"
                  margin="normal"
                  name="EventName"
                  onChange={(e) => setEventName(e.target.value)}
                  value={EventName}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item md={6} xs={12}>
                <TextField
                  disabled={disable}
                  fullWidth={true}
                  onChange={e => setEventImage(e.target.files)}
                  margin="normal"
                  name="EventImage"
                  type="file"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <img alt="Logo" src={EventImageName===null ? '':Api.IMG.imgURL + EventImageName} style={{ width: "100%" }} />
              </Grid> */}
            </Grid>
            <Divider />

            <DialogActions>
              <Button
                variant="contained"
                style={Api.button_orange}
                startIcon={<ArrowBackIosIcon />}
                onClick={handleClick}
              >
                Back
              </Button>
              <Button
                disabled={disable}
                style={Api.button_green}
                variant="contained"
                type="submit"
              >
                Update details
              </Button>
            </DialogActions>
          </form>
        </CardContent>
      </Card>

      <Box mt={3}></Box>

      <Card>
        <CardActions>
          <Button
            onClick={VALSttus === true ? null : handleClickOpenDefault}
            variant="contained"
            color="primary"
          >
            Default Button
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<QueueIcon />}
            onClick={VALSttus === true ? null : handleClickOpenDialog}
          >
            Create Button
          </Button>
        </CardActions>
        <Divider />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">Button Name</StyledTableCell>
                  {/* <StyledTableCell align="center">Button Color</StyledTableCell> */}
                  <StyledTableCell align="center">Image</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {listButton.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        style={{
                          background: row.button_color,
                          boxShadow: "#bfbfc9 0px 2px 2px 1px",
                        }}
                      >
                        {row.button_name}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <img
                        alt="Logo"
                        src={
                          "https://ezybetgame.s3.ap-southeast-1.amazonaws.com/ButtonImage/" +
                          row.img_url
                        }
                        style={{ width: "25%", height: "50px" }}
                      />{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <ThemeProvider theme={red}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: Color.red,
                            color: Color.white,
                            boxShadow: "#bfbfc9 0px 2px 2px 1px",
                          }}
                          onClick={
                            VALSttus === true
                              ? null
                              : (e) => handleRemoveButton(e, row.id)
                          }
                          startIcon={<DeleteForeverRoundedIcon />}
                          // onClick={e => handleRemoveButton(e, row.id)}
                        >
                          {" "}
                          Remove{" "}
                        </Button>
                      </ThemeProvider>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Box mt={3}></Box>
      <Card>
        <CardActions>
          <Button
            color="primary"
            startIcon={<QueueIcon />}
            variant="contained"
            onClick={handleClickOpenAssigned}
          >
            Assigned
          </Button>
        </CardActions>
        <Divider />
        <CardContent>
          {/* <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeAssigned}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
          </RadioGroup> 
        </FormControl>*/}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <TableHead style={{ backgroundColor: Color.tableColor }}>
                <StyledTableRow>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="center">
                    Date Assigned
                  </StyledTableCell>
                  <StyledTableCell align="center">Username</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {assigned.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">{i + 1}</StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      {row.createdDate.slice(0, 10)}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <ThemeProvider theme={red}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={
                            VALSttus === true
                              ? null
                              : (e) => handleFormAssigned(e, row.id)
                          }
                          startIcon={<DeleteForeverRoundedIcon />}
                          // onClick={e => handleFormAssigned(e, row.id)}
                        >
                          {" "}
                          Remove
                        </Button>
                      </ThemeProvider>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={openassigned}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader className={classes.dialog} title="Assigned Declarator" />
        <form onSubmit={handleFormAssigned}>
          <DialogContent>
            <TextField
              required
              fullWidth={true}
              id="outlined-select-currency"
              select
              label="Select Declarator Only"
              value={assignID}
              onChange={handleChange}
              variant="outlined"
            >
              {listUsername.map((row, i) => (
                <MenuItem key={i} value={row.id}>
                  {row.username}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <Box display="flex" justifyContent="flex-end" p={1}></Box>
          <Divider />

          <DialogActions>
            <Button onClick={handleClose} style={Api.button_orange}>
              Exit
            </Button>
            <Button style={Api.button_green} type="submit">
              Assign
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/************************************** Start Dialog CREATE BUTTON { **************************************/}
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              // style={{backgroundColor: '#223129'}}
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography variant="h6" className={classes.title}>
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        <CardContent>
          <form onSubmit={handleFormSubmitCreateButton}>
            {/* <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  margin="normal"
                  name="img_url"
                  type="file"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {yesImage ? IMAGE : false}
              </Grid>
            </Grid> */}

            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  defaultValue={colorButton}
                  onChange={handleChange}
                  label="Button Color"
                  margin="normal"
                  name="button_color"
                  variant="outlined"
                  inputProps={{ style: { textTransform: "uppercase" } }}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Button Name"
                  margin="normal"
                  name="button_name"
                  value={buttonName}
                  type="text"
                  onChange={(e) => setButtonName(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {yesDraw === true ? null : (
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="filled-select-currency-native"
                    select
                    margin="normal"
                    label="Jackpot"
                    name="isJackpot"
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </TextField>
                </Grid>

                <Grid item md={6} xs={12}>
                  {yesJackPot === false ? null : jakcpotPrice}
                </Grid>
              </Grid>
            )}

            {yesJackPot === true ? null : (
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Draw"
                    margin="normal"
                    name="isDraw"
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </TextField>
                </Grid>
                {yesDraw === false ? null : (
                  <Grid item md={6} xs={12}>
                    {drawPrice}
                    {/* {yesDraw ? drawPrice : false} */}
                  </Grid>
                )}
              </Grid>
            )}

            <Grid container spacing={1}>
              {yesDraw === true ? null : (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Comission"
                    margin="normal"
                    name="comission"
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </TextField>
                </Grid>
              )}
              {yesDraw === true ? null : (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    defaultValue={"taken " + sequence}
                    label="Sequence"
                    margin="normal"
                    name="sequence"
                    type="text"
                    variant="outlined"
                  />
                </Grid>
              )}

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => setButtonLabel(e.target.value)}
                  label="Button Label"
                  value={buttonLabel}
                  margin="normal"
                  name="button_label"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Button Label"
                    margin="normal"
                    name="button_label"
                    onChange={(e) => setButtonLabel(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    <option value={"RED JACKPOT"}>RED JACKPOT</option>
                    <option value={"BLUE JACKPOT"}>BLUE JACKPOT</option>
                    <option value={"GREEN JACKPOT"}>GREEN JACKPOT</option>
                    <option value={"YELLOW JACKPOT"}>YELLOW JACKPOT</option>
                    <option value={"PINK JACKPOT"}>PINK JACKPOT</option>
                    <option value={"WHITE JACKPOT"}>WHITE JACKPOT</option>
                  </TextField>
                </Grid> */}
            </Grid>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button style={Api.Button_save} variant="contained" type="submit">
                Create
              </Button>
            </Box>
          </form>
        </CardContent>
      </Dialog>
      {/************************************** END Dialog CREATE BUTTON { **************************************/}

      {/************************************** COnFIRMATION FOR DEFAULT BUTTON  **************************************/}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openDefault}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <CardHeader className={classes.dialog} title="Default Button" />
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Button Name</StyledTableCell>
                <StyledTableCell align="center">Button Color</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {confirmButton.length ? (
                confirmButton.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <StyledTableCell align="center">
                        {row.button_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.button_color}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.img_url}
                      </StyledTableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <StyledTableCell key={1} colSpan={3}>
                    No record found!
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={handleCloseDefault}
            variant="outlined"
            style={Api.button_orange}
          >
            Exit
          </Button>
          <Button
            onClick={handleSaveDefaultButton}
            variant="outlined"
            style={Api.button_green}
          >
            Use Button
          </Button>
        </DialogActions>
      </Dialog>

      {/************************************** END COnFIRMATION FOR DEFAULT BUTTON  **************************************/}

      <Snackbar open={errorBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {ResponseMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={sueccesBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {ResponseMessage}
        </Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Edit;
