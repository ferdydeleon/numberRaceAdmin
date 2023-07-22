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
  CardContent,
} from "@material-ui/core";
import Page from "src/components/Page";
import { getAssignedDeclarator } from "../../../adminModel/eventData";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import QueueIcon from "@material-ui/icons/Queue";
import Color from "../../../utils/colors";

// import { useAlert } from "react-alert";
// import Api from "../../../Api";
import Assigned from "./Assigned";

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

function ManageAssigned() {
  const classes = useStyles();
 // const alert = useAlert();
  var { assignedID } = useParams();
  const [assigned, setAssigned] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await getAssignedDeclarator(assignedID);
      if (results === "NO DATA FOUND") {
        setAssigned([]);
        setLoading(false);
      } else {
        setAssigned(results);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [assignedID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [openForm, setOpenForm] = useState(false);
  const handleClickOpenAssigned = () => {
    setOpenForm(!openForm);
    if(openForm === true){
      fetchData()
    }
  };

//   const handleFormAssigned = (e,buttonId) => {
//     e.preventDefault();
//     async function fetchDataDelete() {
//         let assignArray;
//         if (removeId === undefined) {
//           assignArray = {
//             event: id,
//             userId: assignID,
//             type: "CREATE",
//           };
//         } else {
//           assignArray = {
//             event: id,
//             userId: removeId,
//             type: "DELETE",
//           };
//           //setAssigned()
//         }
      
//       const results = await deleteButton(ArrayDelete);
//       alert.success(results);
//       setLoading(false);
//        fetchData();
//     }
//     fetchDataDelete().catch(console.error);
//   };



  return (
    <Page className={classes.root} title="Update Event">
      <Container maxWidth="lg">
        <Box mt={3}>
         
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
                      {row.createdDate.slice(0, 10)}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                         // onClick={ (e) => handleFormAssigned(e, row.id)}
                          startIcon={<DeleteForeverRoundedIcon />}
                          // onClick={e => handleFormAssigned(e, row.id)}
                        >
                          Remove
                        </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
        </Box>
      </Container>

      <Assigned 
        status={openForm}
        handleClose={handleClickOpenAssigned}
        assignedID={assignedID}

      />

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

    </Page>
  );
}

export default ManageAssigned;
