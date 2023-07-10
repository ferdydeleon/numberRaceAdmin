import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  MenuItem,
  Grid,
} from "@material-ui/core";
import Api from "../../../Api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
import { useAlert } from "react-alert";
import { fetchgamelist } from "../../../adminModel/data";
import {  fetchArena } from "../../../adminModel/arenaData";
import { createEvent } from "../../../adminModel/eventData";
import Color from "../../../utils/colors";
// import S3 from 'react-aws-s3';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-h5": {
      color: Color.green,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Create = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [listArena, setListArena] = useState([]);
  const [game, setGame] = React.useState("");
  const [gameList, setGamelist] = useState([]);
  const [disable, setDisAble] = useState(false);
  const [maxbetType, setMaxBetType] = React.useState("PLAYER");
  const [agent, setAgent] = useState();
  const [company, setCompany] = useState();
  const [form, setValues] = useState({
    eventName: "",
    videoFeederId: "",
    arenaId: "",
    startingDate: "",
    endingDate: "",
    img_url: null,
    userId: Api.request.userID,
    minBet: "100",
    maxBetting: "100000",
  });

  const handleChangeGame = (event) => {
    setGame(event.target.value);
    let gametype = {};
    gameList.map((val) => {
      return (gametype = val);
    });
    setAgent(gametype.agent);
    setCompany(gametype.company);
    setMaxBetType(gametype.bet_max_type);
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const getGamelist = await fetchgamelist();
      setGamelist(getGamelist);
      setLoading(false);
    }
    fetchData().catch(console.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const getArena = await fetchArena();
      setListArena(getArena);
      setLoading(false);
    }
    fetchData().catch(console.error);
    setLoading(false);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisAble(true);
    setLoading(true);

    async function fetchData() {
      const ArrayAddEvents = {
        id: 0,
        userId: Api.request.userID,
        gameType: game,
        arenaId: form.arenaId,
        eventName: form.eventName,
        img_url: "",
        minBet: form.minBet,
        maxBet: form.maxBetting,
        max_bet_type: maxbetType,
      };
      const results = await createEvent(ArrayAddEvents);
      setLoading(false);
      alert.success(results);
    }
    fetchData().catch(console.error);
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        autoComplete="off"
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader title="Data Entry" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  select
                  name="type"
                  label="Select Game"
                  value={game}
                  onChange={handleChangeGame}
                  variant="outlined"
                >
                  {/* <MenuItem  key={0}>Select</MenuItem>  */}
                  {gameList.map((g, i) => (
                    <MenuItem key={i} value={g.id}>
                      {g.game_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Agent"
                  name="agent"
                  onChange={(e) => setAgent(e.target.value)}
                  value={agent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  // error={errorMin ? true : false}
                  // helperText={errorMinimum}
                  label="Minimum Bet"
                  name="minBet"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{ min: "10", max: "100",step: "10", pattern: "/^[0-9\b]+$/"}}
                  defaultValue={form.minBet}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  // error={errorMax ? true : false}
                  // helperText={errorMaximun}
                  label="Maximum Bet"
                  name="maxBetting"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{ min: "100",max: "100000", step: "1000",pattern: "/^[0-9\b]+$/" }}
                  value={form.maxBetting}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Select Arena"
                  name="arenaId"
                  value={form.arenaId}
                  onChange={handleChange}
                  select
                  variant="outlined"
                >
                  {listArena.map((arena, i) => (
                    <MenuItem key={i} value={arena.id}>
                      {arena.arena_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Enter title"
                  name="eventName"
                  type="text"
                  required
                  onChange={handleChange}
                  value={form.eventName}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              disabled={disable}
              style={Api.Button_save}
              variant="contained"
              type="submit"
            >
              Save Details
            </Button>
          </Box>
        </Card>
      </form>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

Create.propTypes = {
  className: PropTypes.string,
};

export default Create;
