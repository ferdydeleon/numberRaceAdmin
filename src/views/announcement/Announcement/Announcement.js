import React, { useEffect, useState } from "react";
import Api from "../../../Api";
import PropTypes from "prop-types";
import api from "../../../axios";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Color from '../../../utils/colors';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  head: {
    backgroundColor: Color.headColor,
    color:  Color.tableTextColor,
  },
  textColor:{
    color:  Color.tableTextColor,
  }

}));

const typeAnnounce = [
  { id: 1,type: 'PLATINUM'},
  { id: 2,type: 'AGENT'},
  { id: 3,type: 'PLAYER'},
  { id: 4,type: 'All'},
]

const NewAnnouncement = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [postAnounce, setPostAnouncement] = useState("");
  const [typePlayer, setAnnounceTo] = useState("");
  //console.log("typePlayer: ",typePlayer)
  const [announcementToPlatinum, setAnnounceToPlatinum] = useState("");
  const [announcementToAgent, setAnnounceToAgent] = useState("");
  const [announcementToPlayer, setAnnounceToPlayer] = useState("");
  const [announcementToAll, setAnnounceToAll] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let announce;

    if (typePlayer === 1) {
      announce = {
        type: typePlayer,
        announcement: postAnounce,
        userId: Api.request.userID,
      };
      setAnnounceToPlatinum(postAnounce);
    } else if (typePlayer === 2) {
      announce = {
        type: typePlayer,
        announcement: postAnounce,
        userId: Api.request.userID,
      };
      setAnnounceToAgent(postAnounce);
    } else if (typePlayer === 3) {
      announce = {
        type: typePlayer,
        announcement: postAnounce,
        userId: Api.request.userID,
      };
      setAnnounceToPlayer(postAnounce);
    } else {
      announce = {
        type: 4,
        announcement: postAnounce,
        userId: Api.request.userID,
      };
      setAnnounceToAll(postAnounce);
    }

    api
      .post(`${Api.request.URL}/api/v2/announcement/`, announce)
      .then((res) => {
        alert.success(res.data.message);
        ////console.log(res.data.message)
      })
      .catch((error) => {
        alert.error(error.response.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`${Api.request.URL}/api/v2/announcement/`)
      .then((res) => {
        let row = {};
        res.data.data.data.map((val) => {
            return (row = val);
        });
          setAnnounceToPlatinum(row.platinum);
          setAnnounceToAgent(row.agent);
          setAnnounceToPlayer(row.player);
          setAnnounceToAll(row.all);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert.error(error.response.data.message);
      });
  }, [alert]);




  return (
    <Grid container spacing={3}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item md={6} xs={12}>
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardHeader
              /*  subheader="Manage the notifications" */
              title="Create Announcement"
            />
            <Divider />
            <CardContent>
        
              <TextField
                fullWidth={true}
                id="outlined-select-currency"
                select
                label="Announcement To"
                name="type"
                onChange={(e) => setAnnounceTo(e.target.value)}
                variant="outlined"
              >
                {typeAnnounce.map((row) =>(
                    <MenuItem key={row.id} value={row.id}>{row.type}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                margin="normal"
                id="outlined-multiline-static"
                label="Announcement"
                multiline
                minRows={4}
                defaultValue="Message Here"
                name="postAnounce"
                onChange={(e) => setPostAnouncement(e.target.value)}
                variant="outlined"
              />
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button type="submit" variant="contained" style={Api.Button_save}>
                Post Announcement
              </Button>
            </Box>
          </Card>
        </form>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader
            margin="normal"
            className={classes.head}
            title={"PLATINUM ANNOUNCEMENT"}
          />
          <Divider />
          <CardContent  className={classes.textColor}>{announcementToPlatinum}</CardContent>
          <Divider />
        </Card>
        <Box mt={1}></Box>
        <Card>
          <CardHeader
            margin="normal"
            className={classes.head}
            title={"AGENT ANNOUNCEMENT"}
          />
          <Divider />
          <CardContent  className={classes.textColor}>{announcementToAgent}</CardContent>
          <Divider />
        </Card>
        <Box mt={1}></Box>
        <Card>
          <CardHeader
            margin="normal"
            className={classes.head}
            title={"PLAYER ANNOUNCEMENT"}
          />
          <Divider />
          <CardContent  className={classes.textColor}>{announcementToPlayer}</CardContent>
          <Divider />
        </Card>
        <Box mt={1}></Box>
        <Card>
          <CardHeader
            margin="normal"
            className={classes.head}
            title={"ALL ANNOUNCEMENT"}
          />
          <Divider />
          <CardContent  className={classes.textColor}>{announcementToAll}</CardContent>
          <Divider />
        </Card>
      </Grid>
    </Grid>
  );
};

NewAnnouncement.propTypes = {
  className: PropTypes.string,
};

export default NewAnnouncement;
