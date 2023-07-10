import React, { useState, useEffect } from "react";
import { Director, View } from "@millicast/sdk";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Api from "../../../Api";
import IconButton from "@material-ui/core/IconButton";
import {
  Dialog,
  Typography,
  Card,
  Grid,
  CardContent,
  Button,
  ThemeProvider,
  Box,
  CardHeader,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAlert } from "react-alert";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import S3 from "react-aws-s3";
import { fetchArena, createNewArena } from "../../../adminModel/arenaData";

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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  loading: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    maxHeight: 600,
  },
  page: {
    "& .MuiPaginationItem-page.Mui-selected": {
      color: "#fff",
      backgroundColor: Api.paginationColor.color,
    },
  },
  dialog: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
}));

const orange = createTheme({
  palette: {
    secondary: {
      main: "#ff9800",
    },
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const alert = useAlert();
  const [posts, setPosts] = useState([]);
  const [AddArenaModal, setAddArenaModal] = useState(false);
  const [getarenaID, setGetARENAID] = useState("");
  const [EditArenaModal, setEditArenaModal] = useState(false);
  const [backdropopen, setLoading] = useState(false);

  const handleEditArenaModalClose = () => {
    setEditArenaModal(false);
  };

  const handleAddArenaModalOpen = () => {
    setAddArenaModal(true);
  };

  const handleAddArenaModalClose = () => {
    setAddArenaModal(false);
  };

  const RequestEvent = async () => {
    setLoading(true);
    try {
      const getArena = await fetchArena();
      setPosts(getArena);
      setGetARENAID(getArena[0].id);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    RequestEvent();
  }, []);

  const [valArena, setValArena] = useState({
    arena_name: "",
    typeVideo: "",
    video: "",
    streamName: "",
    streamAccountId: "",
    subscriberToken: "",
    craffstream_organization: "",
    craffstream_contentId: "",
  });

  const [yesImage, setYesImage] = React.useState(false);

  const [miliCast, setmiliCast] = React.useState(false);
  const [craffStream, setCraff] = React.useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleAddArena = (event) => {
    const value = event.target.value;

    setValArena({
      ...valArena,
      [event.target.name]: value,
    });

    if (event.target.name === "img_url") {
      setSelectedFile(event.target.files);
    } else if (event.target.name === "typeVideo") {
      if (event.target.value === "MILLICAST") {
        setmiliCast(true);
        setCraff(false);
        setYesImage(false);
        // } else if (event.target.name == 'typeVideo') {
      } else if (event.target.value === "CRAFFSTREAM") {
        setCraff(true);
        setmiliCast(false);
        setYesImage(false);
      } else if (event.target.value === "IMAGE") {
        setYesImage(true);
        setCraff(false);
        setmiliCast(false);
      } else {
        setCraff(false);
        setmiliCast(false);
        setYesImage(false);
      }
    } else {
    }
  };

  const config = {
    username: "picevensuploader",
    bucketName: "ezybetgame",
    dirName: "ArenaImage", //optional talpakanimage
    region: "ap-southeast-1",
    accessKeyId: "AKIA4WBZUBMK4OBUFSOL",
    secretAccessKey: "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",
  };

  const handleFormAddArena = (e) => {
    setAddArenaModal(false);
    setLoading(true);
    e.preventDefault();

    let arrayCreateArena;
    let arrayCreateArena1;
    if (selectedFile === null) {
      arrayCreateArena = {
        arena_name: valArena.arena_name,
        videoType: valArena.typeVideo,
        video: valArena.video,
        id: 0,
        userId: Api.request.userID,
        streamName: valArena.streamName,
        streamAccountId: valArena.streamAccountId,
        subscriberToken: valArena.subscriberToken,
        craffstream_organization: valArena.craffstream_organization,
        craffstream_contentId: valArena.craffstream_contentId,
      };
      arrayCreateArena1 = {
        arena_name: valArena.arena_name,
        createdBy: Api.request.authorized,
        dateCreated: "",
        id: getarenaID + 1,
        isVisible: 1,
        video: valArena.video,
        video_type: valArena.typeVideo,
        streamName: valArena.treamName,
        streamAccountId: valArena.streamAccountId,
        subscriberToken: valArena.subscriberToken,
        craffstream_organization: valArena.craffstream_organization,
        craffstream_contentId: valArena.craffstream_contentId,
      };
      // console.log("arrayCreateArena IFRAME: ",arrayCreateArena)
      posts.unshift(arrayCreateArena1);
      async function fetchData() {
        const results = await createNewArena(arrayCreateArena);
        setLoading(false);
        alert.success(results);
        return RequestEvent;
      }
      fetchData().catch(console.error);
      setLoading(false);
      // const results = createNewArena(arrayCreateArena);
      // if (results === "ARENA CREATED") {
      //   alert.success(results);
      //   setLoading(false);
      //   return(RequestEvent)
      // } else {
      //   alert.error(results);
      //   setLoading(false);
      // }
    } else {
      arrayCreateArena = {
        id: 0,
        userId: Api.request.userID,
        arena_name: valArena.arena_name,
        videoType: valArena.typeVideo,
        video: selectedFile[0].name,
        streamName: editstreamName,
        streamAccountId: editstreamAccountId,
        subscriberToken: editsubscriberToken,
        craffstream_organization: valArena.craffstream_organization,
        craffstream_contentId: valArena.craffstream_contentId,
      };
      arrayCreateArena1 = {
        arena_name: valArena.arena_name,
        createdBy: "ADMIN",
        dateCreated: "",
        id: getarenaID + 1,
        isVisible: 1,
        video: selectedFile[0].name,
        video_type: valArena.typeVideo,
        streamName: editstreamName,
        streamAccountId: editstreamAccountId,
        subscriberToken: editsubscriberToken,
        craffstream_organization: valArena.craffstream_organization,
        craffstream_contentId: valArena.craffstream_contentId,
      };
      let file = selectedFile[0];
      let newFileName = selectedFile[0].name;
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, newFileName)
        .then((data) => {
          console.log("data: ", data);
          posts.unshift(arrayCreateArena1);
          async function fetchData() {
            const results = await createNewArena(arrayCreateArena);
            setLoading(false);
            alert.success(results);
            return RequestEvent;
          }
          fetchData().catch(console.error);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
    // //console.log("pushAddVideo: ", pushAddVideo)
    //  //console.log("arrayCreateArena: ", arrayCreateArena)
  };

  //*************************************** EDIT ARENA ***************************************
  const [IDarena, setIDarena] = useState("");
  const [editArenaName, setEditArenaName] = useState("");
  const [editVideo, setEditVideo] = useState("");
  const [editVideoType, setEditVideoType] = useState("");

  const [editstreamName, setEditStreamName] = useState("");
  const [editstreamAccountId, setEditStreamAccountId] = useState("");
  const [editsubscriberToken, setEditSubscriberToken] = useState("");

  const [editcraffstream_organization, setCraffstreamOganization] = useState(
    ""
  );
  const [editcraffstream_contentId, setCraffStreamId] = useState("");

  const handleEditArenaModalOpen = (e, id) => {
    setIDarena(id);
    let value = {};
    posts.map((row) => {
      return row.id === id ? (value = row) : null;
    });
    //console.log(value)
    setEditArenaName(value.arena_name);
    setEditVideo(value.video);
    setEditVideoType(value.video_type);
    setEditStreamName(value.streamName);
    setEditStreamAccountId(value.streamAccountId);
    setEditSubscriberToken(value.subscriberToken);
    setCraffstreamOganization(value.craffstream_organization);
    setCraffStreamId(value.craffstream_contentId);
    setEditArenaModal(true);
  };

  const handleFormEditArena = (e) => {
    setEditArenaModal(false);
    setLoading(true);
    e.preventDefault();

    let files;
    let arrayEditArena;
    if (selectedFile === null) {
      files = editVideo;
      arrayEditArena = {
        id: IDarena,
        userId: Api.request.userID,
        arena_name: editArenaName,
        video: files,
        videoType: editVideoType,
        streamName: editstreamName,
        streamAccountId: editstreamAccountId,
        subscriberToken: editsubscriberToken,
        craffstream_organization: editcraffstream_organization,
        craffstream_contentId: editcraffstream_contentId,
      };

      async function fetchData() {
        const results = await createNewArena(arrayEditArena);
        alert.success(results);
        let sample = posts.findIndex((item) => item.id === IDarena);
        const updateArena = posts;
        updateArena[sample].arena_name = editArenaName;
        updateArena[sample].video = files;
        updateArena[sample].video_type = editVideoType;
        setPosts(updateArena);
        setLoading(false);
      }
      fetchData().catch(console.error);
      setLoading(false);
    } else {
      files = selectedFile[0].name;
      arrayEditArena = {
        id: IDarena,
        userId: Api.request.userID,
        arena_name: editArenaName,
        video: files,
        videoType: editVideoType,
      };

      let file = selectedFile[0];
      let newFileName = selectedFile[0].name;

      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        console.log("data: ", data);

        async function fetchData() {
          const results = await createNewArena(arrayEditArena);
          alert.success(results);
          let sample = posts.findIndex((item) => item.id === IDarena);
          const updateArena = posts;
          updateArena[sample].arena_name = editArenaName;
          updateArena[sample].video = files;
          updateArena[sample].video_type = editVideoType;
          setPosts(updateArena);
          setLoading(false);
        }
        fetchData().catch(console.error);
        setLoading(false);
      }).catch(err => console.error(err));
    }
    //console.log("arrayEditArena: ", arrayEditArena)
  };

  const red = createTheme({
    palette: {
      secondary: {
        main: "#f44336",
      },
    },
  });

  const [openPlayer, setOpenPlayer] = useState(false);
  const closePlayer = () => {
    setOpenPlayer(!openPlayer);
    setShowPlayer(false);
  };

  // const [getSource, setSource] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [typePlayer, setTypePlayer] = useState();
  const [titleVideo, setTItleVIdeo] = useState("");
  const [getUrl, setSrc] = useState("");

  const genSource = (
    e,
    _src,
    type,
    streamName,
    streamAccounID,
    subscriberToken
  ) => {
    setSrc(_src);
    setTypePlayer(type);
    setTItleVIdeo(streamName);
    setShowPlayer(true);
    ////console.log("theohas",theohash);

    if (type === "MILLICAST") {
      const video = document.getElementById("my-video");
      //Define callback for generate new token
      const tokenGenerator = () =>
        Director.getSubscriber({
          streamName,
          streamAccounID,
          subscriberToken,
        });

      //Create a new instance
      const play = async () => {
        const millicastView = new View(streamName, tokenGenerator, video);
        //Start connection to publisher
        try {
          await millicastView.connect();
        } catch (e) {
          console.log("Connection failed, handle error", e);
        }
      };

      play();
    } else {
    } //else
  };
  function generateIframe() {
    return { __html: getUrl };
  }
  //console.log("getSource: ",getSource)
  let PlayMedia;
  switch (typePlayer) {
    case "IMAGE":
      PlayMedia = (
        <div>
          <div style={{ height: "100%" }}>
            <img
              alt="Logo"
              src={Api.IMG.imgArena + getUrl}
              style={{ width: "100%" }}
            />
          </div>
          <div id="player"></div>
        </div>
      );
      break;
    case "IFRAME":
      PlayMedia = (
        <div>
          <div
            style={{ height: "500px" }}
            dangerouslySetInnerHTML={generateIframe()}
          ></div>
          <div id="player"></div>
        </div>
      );
      break;
    case "MILLICAST":
      PlayMedia = (
        <div style={{ height: "500px" }}>
          <video
            style={{ height: "500px", width: "100%" }}
            id="my-video"
            autoPlay
            muted
            controls
            playsInline
          ></video>{" "}
        </div>
      );
      break;
    default:
    //PlayMedia = (     <video id="my-video">sss</video>);
    //PlayMedia = (<img alt="Logo" src={Api.IMG.imgURL + getUrl} style={{ width: "100%" }} />);
  }
  // *************************************** END EDIT ARENA  ***************************************

  // console.log('editVideoType:',editVideoType)

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={showPlayer}
        onClose={closePlayer}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{titleVideo}</DialogTitle>

        <DialogContent>{PlayMedia}</DialogContent>
        <DialogActions>
          {/*<Button autoFocus onClick={closePlayer} color="primary">
              Disagree
            </Button> */}
          <Button onClick={closePlayer} style={Api.button_orange} autoFocus>
            Exit Video
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <Button
                style={Api.button_green}
                // color="primary"
                variant="contained"
                startIcon={<AddBoxIcon />}
                onClick={handleAddArenaModalOpen}
              >
                Arena
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={3}></Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Arena Name</StyledTableCell>
              <StyledTableCell align="left">Video Type</StyledTableCell>
              <StyledTableCell align="left">Play Video/Url</StyledTableCell>
              <StyledTableCell align="left">Visible</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row, i) => {
              let PlayButton;
              if (row.video_type === "") {
                PlayButton = "";
              } else {
                PlayButton = (
                  <ThemeProvider theme={red}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      onClick={(e) => {
                        genSource(
                          e,
                          row.video,
                          row.video_type,
                          row.streamName,
                          row.streamAccountId,
                          row.subscriberToken
                        );
                      }}
                    >
                      <PlayCircleFilledIcon />
                    </Button>
                  </ThemeProvider>
                );
              }
              return (
                <StyledTableRow key={i}>
                  <StyledTableCell align="left">{i + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.arena_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.video_type === "MILLICAST"
                      ? "MILLICAST"
                      : row.video_type}
                  </StyledTableCell>
                  <StyledTableCell align="left"> {PlayButton}</StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    <ThemeProvider theme={orange}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={(e) => handleEditArenaModalOpen(e, row.id)}
                      >
                        <EditOutlinedIcon />
                      </Button>
                    </ThemeProvider>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>

        <Box
          mt={2}
          display="flex"
          m={1}
          p={1}
          justifyContent="center"
          className={classes.root}
        >
          {/* <Pagination count={10} className={classes.page} /> */}
        </Box>
      </TableContainer>

      <Dialog
        // className={classes.xbutton}
        fullWidth={true}
        maxWidth="md"
        onClose={handleAddArenaModalClose}
        aria-labelledby="form-dialog-title"
        open={AddArenaModal}
      >
        <DialogTitle
          className={classes.dialog}
          id="form-dialog-title"
          onClose={handleAddArenaModalClose}
        >
          Add Arena
        </DialogTitle>
        <form onSubmit={handleFormAddArena}>
          <DialogContent dividers>
            <TextField
              variant="outlined"
              margin="dense"
              name="arena_name"
              value={valArena.arena_name}
              onChange={handleAddArena}
              required
              label="New Arena"
              type="text"
              fullWidth={true}
            />
            {miliCast === true ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="streamName"
                value={valArena.streamName}
                onChange={handleAddArena}
                required
                label="Stream Name"
                type="text"
                fullWidth={true}
              />
            ) : (
              ""
            )}
            {miliCast === true ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="streamAccountId"
                value={valArena.streamAccountId}
                onChange={handleAddArena}
                required
                label="Stream Account ID"
                type="text"
                fullWidth={true}
              />
            ) : (
              ""
            )}

            {miliCast === true ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="subscriberToken"
                value={valArena.subscriberToken}
                onChange={handleAddArena}
                required
                label="Subscriber Token"
                type="text"
                fullWidth={true}
              />
            ) : (
              ""
            )}
            {miliCast === true || yesImage === true ? (
              ""
            ) : (
              <TextField
                variant="outlined"
                margin="dense"
                name="video"
                multiline
                minRows={4}
                value={valArena.video}
                onChange={handleAddArena}
                required
                label={"Video Url"}
                type="text"
                fullWidth={true}
              />
            )}

            {craffStream === true ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="craffstream_organization"
                value={valArena.craffstream_organization}
                onChange={handleAddArena}
                label={"Organization"}
                type="text"
                fullWidth={true}
              />
            ) : (
              ""
            )}
            {craffStream === true ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="craffstream_contentId"
                value={valArena.craffstream_contentId}
                onChange={handleAddArena}
                label={"Craff Stream Key"}
                type="text"
                fullWidth={true}
              />
            ) : (
              ""
            )}

            {yesImage === true ? (
              <TextField
                fullWidth
                onChange={handleAddArena}
                margin="normal"
                name="img_url"
                type="file"
                variant="outlined"
              />
            ) : (
              ""
            )}

            <TextField
              fullWidth
              margin="dense"
              name="typeVideo"
              label="Select Type"
              value={valArena.typeVideo}
              onChange={handleAddArena}
              required
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option></option>
              <option value={"IFRAME"}>IFRAME</option>
              <option value={"THEO"}>THEO</option>
              <option value={"MILLICAST"}>MILLICAST</option>
              <option value={"CRAFFSTREAM"}>CRAFFSTREAM</option>
              <option value={"WOWZA_EMBED"}>WOWZA EMBED</option>
              <option value={"IMAGE"}>IMAGE</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleAddArenaModalClose}
              size="small"
              type="submit"
              style={Api.button_orange}
              //className={classes.button}
              //startIcon={<SaveIcon />}
            >
              Exit
            </Button>

            <Button
              variant="contained"
              size="medium"
              type="submit"
              style={Api.button_green}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={handleAddArenaModalClose}
        aria-labelledby="form-dialog-title"
        open={EditArenaModal}
      >
        <CardHeader className={classes.dialog} title="Edit Arena" />

        <form onSubmit={handleFormEditArena}>
          <DialogContent dividers>
            <TextField
              variant="outlined"
              margin="dense"
              name="arenName"
              value={editArenaName}
              onChange={(e) => setEditArenaName(e.target.value)}
              required
              label="Input Arena"
              type="text"
              fullWidth
            />
            {editVideoType === "MILLICAST" ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="streamName"
                value={editstreamName}
                onChange={(e) => setEditStreamName(e.target.value)}
                required
                label="Stream Name"
                type="text"
                fullWidth
              />
            ) : (
              ""
            )}
            {editVideoType === "MILLICAST" ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="streamAccountId"
                value={editstreamAccountId}
                onChange={(e) => setEditStreamAccountId(e.target.value)}
                required
                label="Stream Account ID"
                type="text"
                fullWidth
              />
            ) : (
              ""
            )}
            {editVideoType === "MILLICAST" ? (
              <TextField
                variant="outlined"
                margin="dense"
                name="subscriberToken"
                value={editsubscriberToken}
                onChange={(e) => setEditSubscriberToken(e.target.value)}
                required
                label="Subscriber Token"
                type="text"
                fullWidth
              />
            ) : (
              ""
            )}
            {editVideoType === "MILLICAST" || editVideoType === "IMAGE" ? (
              ""
            ) : (
              <TextField
                variant="outlined"
                multiline
                minRows={4}
                margin="dense"
                name="editVideo"
                value={editVideo}
                onChange={(e) => setEditVideo(e.target.value)}
                required
                label={"Video Url"}
                type="text"
                fullWidth
              />
            )}

            {editVideoType === "THEO" ||
            editVideoType === "WOWZA_EMBED" ||
            editVideoType === "IMAGE" ? (
              ""
            ) : (
              <TextField
                variant="outlined"
                margin="dense"
                name="streamAccountId"
                value={editcraffstream_organization}
                onChange={(e) => setCraffstreamOganization(e.target.value)}
                required
                label="Organizational"
                type="text"
                fullWidth
              />
            )}

            {editVideoType === "THEO" ||
            editVideoType === "WOWZA_EMBED" ||
            editVideoType === "IMAGE" ? (
              ""
            ) : (
              <TextField
                variant="outlined"
                margin="dense"
                name="streamAccountId"
                value={editcraffstream_contentId}
                onChange={(e) => setCraffStreamId(e.target.value)}
                required
                label="Craff Stream Key"
                type="text"
                fullWidth
              />
            )}

            {editVideoType === "IMAGE" ? (
              <TextField
                fullWidth
                onChange={handleAddArena}
                margin="normal"
                name="img_url"
                type="file"
                variant="outlined"
              />
            ) : (
              ""
            )}

            <TextField
              fullWidth
              margin="dense"
              name="typeVideo"
              label="Select Type"
              value={editVideoType}
              onChange={(e) => setEditVideoType(e.target.value)}
              required
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value={editVideoType}>{editVideoType}</option>
              <option value={"IFRAME"}>IFRAME</option>
              <option value={"THEO"}>THEO</option>
              <option value={"MILLICAST"}>MILLICAST</option>
              <option value={"CRAFFSTREAM"}>CRAFFSTREAM</option>
              <option value={"WOWZA_EMBED"}>WOWZA EMBED</option>
              <option value={"IMAGE"}>IMAGE</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              style={Api.button_orange}
              size="small"
              onClick={handleEditArenaModalClose}
              // className={classes.button}
              //startIcon={<SaveIcon />}
            >
              Exit
            </Button>

            <Button
              variant="contained"
              //color="primary"
              style={Api.button_green}
              size="small"
              type="submit"
              //  className={classes.button}
              //startIcon={<SaveIcon />}
            >
              Update
            </Button>
          </DialogActions>

          {/* ************************************************** END Update ARENA********************************************** */}
        </form>
      </Dialog>
    </div>
  );
}
