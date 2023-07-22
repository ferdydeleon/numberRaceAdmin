import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Card,
  CardActions,
  Table,
  TableHead,
  TableBody,
  makeStyles,
  withStyles,
  TableCell,
  TableRow,
  Container,
  Box,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Page from "src/components/Page";
import { fetchEvent } from "../../../adminModel/data";
import { deleteButton } from "../../../adminModel/eventData";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import QueueIcon from "@material-ui/icons/Queue";
import Color from "../../../utils/colors";
import CreateButton from "./CreateButton";
import { useAlert } from "react-alert";
import Api from "../../../Api";

const useStyles = makeStyles((theme) => ({
  root: {
    background: Color.MainBackground,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: Color.white,
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

function ManageButton() {
  const classes = useStyles();
  const alert = useAlert();
  var { buttonID } = useParams();
  const [listButton, setButton] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sequence, setSequence] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchEvent(buttonID);
      if (results === "NO DATA FOUND") {
        setButton([]);
        setLoading(false);
      } else {
        let Sequence = results.map((elem) =>
        elem.sequence === null ? 0 : elem.sequence
      );
      setSequence(Sequence);
        setButton(results);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [buttonID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [openForm, setOpenForm] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenForm(!openForm);
    if (openForm === true) {
      // fetchData()
    }
  };

  const handleRemoveButton = (e, buttonId) => {
    e.preventDefault();
    async function fetchDataDelete() {
      const ArrayDelete = {
        event: buttonID,
        buttonId: buttonId,
        userId: Api.request.userID,
      };
      const results = await deleteButton(ArrayDelete);
      alert.success(results);
      setLoading(false);
      fetchData();
    }
    fetchDataDelete().catch(console.error);
  };

  return (
    <Page className={classes.root} title="Update Event">
      <Container maxWidth="lg">
        <Box mt={3}>
          <Card>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<QueueIcon />}
                onClick={handleClickOpenDialog}
              >
                Create Button
              </Button>
            </CardActions>
            <Divider />

            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Button Name</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {listButton.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        style={{
                          color: Color.green,
                          background: row.button_color,
                          boxShadow: "#bfbfc9 0px 1px 1px 1px",
                        }}
                      >
                        {row.button_name}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        startIcon={<DeleteForeverRoundedIcon />}
                        onClick={(e) => handleRemoveButton(e, row.id)}
                      >
                        Remove
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Box>
      </Container>
      <CreateButton
        status={openForm}
        handleClose={handleClickOpenDialog}
        buttonID={buttonID}
        sequence={sequence}
      />

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Page>
  );
}

export default ManageButton;
