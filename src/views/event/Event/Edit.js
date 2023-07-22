import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider, Grid, CardContent } from "@material-ui/core";
import { findEventByID,updateEvent } from "../../../adminModel/eventData";
import { useAlert } from "react-alert";
import Api from "../../../Api";

function Edit({ status, handleClose, eventID }) {

  const alert = useAlert();

  const [EventName, setEventName] = useState("");
  const [GameID, setGameType] = useState(0);
  const [GameName, setGameName] = useState("");
  const [Arena, setArenaName] = useState("");
  const [ArenaID, setArenaID] = useState(0);
  const [Agent, setAgent] = useState("");
  const [Company, setCompany] = useState("");
  const [minBet, setMinBet] = useState("");
  const [maxBet, setMaxBet] = useState("");
  //const [EventImage, setEventImage] = useState(null);
  //const [EventImageName, setEventNameImage] = useState(null);
   const [betmaxtype, setBetMaxType] = useState("");

  useEffect(() => {
    if (status !== false) {
      async function fetchData() {
        const results = await findEventByID(eventID);
        if (results === "NO DATA FOUND") {
          console.log(results);
          // setPosts([]);
        } else {
          let row = {};
          results.map((val) => {
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
        }
      }
      fetchData().catch(console.error);
    }
  }, [eventID, status]);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    //setLoading(true);
    async function fetchDataDelete() {
      const ArrayEvent = {
        id: eventID,
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
      const results = await updateEvent(ArrayEvent);
      //setLoading(false);
      handleClose()
      alert.success(results)
    }
    fetchDataDelete().catch(console.error);

  };


  return (
    <div>
      <Dialog
     
        open={status}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <Divider/>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                margin="normal"
                label="Select Game"
                select
                SelectProps={{ native: true }}
                variant="outlined"
                defaultValue={GameName}
              >
                <option value={GameID}>{GameName}</option>
              </TextField>
            </Grid>

            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Agent Share"
                  margin="normal"
                  name="Agent"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => setAgent(e.target.value)}
                  value={Agent}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Company Share"
                  margin="normal"
                  name="Company"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => setCompany(e.target.value)}
                  value={Company}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Minimum Bet"
                  name="minBet"
                  required
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={minBet}
                  onChange={(e) => setMinBet(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Maximum Bet"
                  fullWidth
                  name="maxBet"
                  required
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={maxBet}
                  onChange={(e) => setMaxBet(parseInt(e.target.value))}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Select Arena"
                  margin="normal"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  onChange={(e) => setArenaID(e.target.value)}
                  defaultValue={Arena}
                >
                  <option value={ArenaID}>{Arena}</option>
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Event Name"
                  margin="normal"
                  name="EventName"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setEventName(e.target.value)}
                  value={EventName}
                />
              </Grid>
            </Grid>
            <Divider />
            <DialogActions>
              <Button color="primary" variant="contained" onClick={handleClose}>
                Close
              </Button>
              <Button color="primary"  variant="contained" type="submit">
                Update
              </Button>
            </DialogActions>
          </form>
        </CardContent>
      </Dialog>
    </div>
  );
}

export default Edit;
