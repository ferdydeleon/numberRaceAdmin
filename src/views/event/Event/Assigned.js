import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  MenuItem,
} from "@material-ui/core";
import { fetchdeclaratorList } from "../../../adminModel/data";
import Api from "../../../Api";
import api from "../../../axios";
import { useAlert } from "react-alert";

function Assigned({ status, handleClose, assignedID }) {
  const alert = useAlert();
  const [assignID, setAssignedUsername] = useState("");

  const [listUsername, setlistUsername] = useState([]);
  useEffect(() => {
    //setLoading(true);
    async function fetchData() {
      // You can await here
      const declaratorList = await fetchdeclaratorList();
      setlistUsername(declaratorList);
      //setLoading(false);
    }
    fetchData().catch(console.error);
  }, []);

  const handleChange = (event) => {
    setAssignedUsername(event.target.value);
  };

  const handleFormAssigned = (e, removeId) => {
    e.preventDefault();
    let assignArray;
    if (removeId === undefined) {
      assignArray = {
        event: assignedID,
        userId: assignID,
        type: "CREATE",
      };
    } else {
      assignArray = {
        event: assignedID,
        userId: removeId,
        type: "DELETE",
      };
      //setAssigned()
    }
    api
      .post(`${Api.request.URL}/api/v2/Event/user/assign`, assignArray)
      .then((res) => {
        handleClose();
        alert.success(res.data.message);
      })
      .catch((error) => {
        handleClose();
        alert.error(error.response.data.message);
        // setLoading(false);
        // setOpenAssigned(false);
      });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={status}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CardHeader title="Assigned Declarator" />
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
            <Button onClick={handleClose}>Exit</Button>
            <Button style={Api.button_green} type="submit">
              Assign
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Assigned;
