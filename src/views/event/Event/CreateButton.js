import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  TextField,
  makeStyles,
  Toolbar,
  AppBar,
  Divider,
  IconButton,
  Typography,
  Box,
  CardContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Color from "../../../utils/colors";
import Api from "../../../Api";
import { fetchEvent } from "../../../adminModel/data";
import api from "../../../axios";
import { useAlert } from "react-alert";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: Color.tableColor,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateButton({ status, handleClose, buttonID }) {
  const classes = useStyles();
  const alert = useAlert();
  const [yesJackPot, setYesJakpot] = React.useState(false);
  const [yesDraw, setYesDraw] = React.useState(false);
  const [sequence, setSequence] = useState([]);
  const [colorButton, setColorButton] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonLabel, setButtonLabel] = React.useState([]);

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

  const fetchData = useCallback(async () => {
    //setLoading(true);
    try {
      const results = await fetchEvent(buttonID);
      if (results === "NO DATA FOUND") {
        console.log(results.length);
        //setLoading(false);
      } else {
        let Sequence = results.map((elem) =>
          elem.sequence === null ? 0 : elem.sequence
        );
        setSequence(Sequence);
        //setLoading(false);
      }
    } catch (e) {
      //setLoading(false);
      console.log(e);
    }
  }, [buttonID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    } else {
      console.log("ERROR Button!");
    }
  };

  const handleFormSubmitCreateButton = (e) => {
    e.preventDefault();
    let sequenceNo;
    if (form.sequence === "") {
      sequenceNo = "0";
    } else {
      sequenceNo = form.sequence;
    }

    let uniqueChars = [buttonLabel];
    let jacpotlabel =
      yesJackPot === true ? `['${buttonLabel}']` : `[${uniqueChars}]`;

     const ArrayCreateButton = {
        event: buttonID,
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
      //setLoading(true);
      api
        .post(`${Api.request.URL}/api/v2/Button`, ArrayCreateButton)
        .then((res) => {
          setYesJakpot("");
          setYesDraw("");
          handleClose()
          //setLoading(false);
          alert.success(res.data.message);
        })
        .catch((error) => {
          alert.error(error.response.data.message);
          setYesJakpot("");
          setYesDraw("");
         // setLoading(false);
        });

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

  return (
    <div>
      <Dialog
        fullScreen
        open={status}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Exit
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent>
          <form onSubmit={handleFormSubmitCreateButton}>
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
                  </Grid>
                )}
              </Grid>
            )}

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
            </Grid>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </Box>
          </form>
        </CardContent>
      </Dialog>
    </div>
  );
}

export default CreateButton;
