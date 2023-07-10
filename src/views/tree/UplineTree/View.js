import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button, Paper ,Box,Grid} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Api from "../../../Api";
import api from "../../../axios";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import PrintIcon from "@material-ui/icons/Print";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  importButton: {
    marginRight: theme.spacing(1),
    marginTop: 2,
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getTree, setAgentTree] = useState([]);
  const [noRecord, setNoRecord] = useState("");

  const alert = useAlert();
  var { id } = useParams();

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false)
    setCout(Count + 50)
    let val = Count + 50;
    //////console.log("value: ",val)
    return AgentTree(val);
  };

  const handleBackPage = () => {
    setCout(Count - 50)
    let val = Count - 50;
    // ////console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false)
      setDisAble(true)
    } else {
    }
    return AgentTree(val);
  };


  //console.log("Agent ID: ",id)
  const AgentTree = useCallback(async () => {
    // console.log("Agent ID: ",id)
    // api/v2/Player/agent/info/${id}
    //http://devopsenv.talpakan.com:3009/api/v2/player/downline?refcode=2
    setLoading(true);
    try {
      await api
        .get(`${Api.request.URL}/api/v2/Player/agent/info/${id}`)
        .then((res) => {
          const sorted = [...res.data.data.data].sort((a, b) => {
            return b.level - a.level;
          });
          //console.log("res.data.data.data: ",res.data.data.data.filter(e => e.level !== ''))
          // console.log("HELLOW: ",sorted.filter(e => e.level !== ''))
          setAgentTree(sorted.filter((e) => e.level !== ""));
          setNextDisAble(false)
          setLoading(false);
        })
        .catch((error) => {
          setAgentTree([]);
          setNoRecord("No Record Found!");
          setNextDisAble(true)
          alert.error(error.response.data.message);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
    // setLoading(false);
  },[id,alert]);

  useEffect(() => {
    AgentTree();
  }, [AgentTree]);

  const handleClickDownload = () => {
    document.getElementById("downloads").click();
  }


  return (
    <div>

<ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
        <ExcelSheet data={getTree} name="Downline">
          <ExcelColumn label="Username" value="username" />
          <ExcelColumn label="First Name" value="first_name" />
          <ExcelColumn label="Last Name" value="last_name" />
          <ExcelColumn
            label="Level"
            value={(col) => (col.level ===  "1" ? "PLATINUM" : "DIRECT PLAYER")}
          />
        </ExcelSheet>
      </ExcelFile>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          onClick={handleClickDownload}
          variant="contained"
          type="submit"
          startIcon={<PrintIcon />}
          style={{ height: "55px", marginBottom: "15px",backgroundColor: "green" }}
        >
          Generate Excel
        </Button>
      </Box>


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Level</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getTree.length ? (
              getTree.map((row, i) => {
                let LEVEL = "";
                if (row.level === "1") {
                  LEVEL = "PLATINUM";
                } else {
                  LEVEL = "DIRECT PLAYER";
                }
                let DOWNLINE;
                switch (row.level) {
                  case "1":
                    DOWNLINE = (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.importButton}
                        startIcon={<VisibilityIcon />}
                        href={`/app/agent/downline/tree/${row.agentId}/${row.username}`}
                      >
                        View Downline
                      </Button>
                    );
                    break;
                  case "2":
                    //   UPLINE = (<Button
                    //     variant="contained"
                    //     color="secondary"
                    //     size="small"
                    //     className={classes.importButton}
                    //     startIcon={<VisibilityIcon />}
                    //     href={`/app/agent/upline/tree/${row.agentId}/${row.username}`}
                    //   >View Agent
                    // </Button >);
                    DOWNLINE = (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.importButton}
                        startIcon={<VisibilityIcon />}
                        href={`/app/agent/downline/tree/${row.agentId}/${row.username}`}
                      >
                        View Downline
                      </Button>
                    );
                    break;
                  case "3":
                    //   UPLINE = (<Button
                    //     variant="contained"
                    //     color="secondary"
                    //     size="small"
                    //     className={classes.importButton}
                    //     startIcon={<VisibilityIcon />}
                    //     href={`/app/agent/upline/tree/${row.agentId}/${row.username}`}
                    //   >View Agent
                    // </Button >);
                    DOWNLINE = (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.importButton}
                        startIcon={<VisibilityIcon />}
                        href={`/app/agent/downline/tree/${row.refCode}/${row.username}`}
                      >
                        View Downline
                      </Button>
                    );
                    break;
                  default:
                  //   DOWNLINE = (<Button
                  //     variant="contained"
                  //     color="secondary"
                  //     size="small"

                  //     className={classes.button}
                  //     startIcon={<VisibilityIcon />}
                  //    href={`/app/agent/upline/tree/${row.agentId}/${row.username}`}
                  //   >View Agent
                  // </Button >)
                }

                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.first_name + ", " + row.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{LEVEL}</StyledTableCell>
                    <StyledTableCell align="center">{DOWNLINE}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={4}>
                  {noRecord}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box
          mt={2}
          display="flex" m={1} p={1} justifyContent="center"
          className={classes.root}
        >
          <Grid item xs={0}>
            <Button className={classes.page} disabled={disable} startIcon={<ArrowBackIosIcon />} onClick={handleBackPage}> </Button>
            <Button className={classes.page} disabled={nextdisable} startIcon={<ArrowForwardIosIcon />} onClick={handleNextPage}> </Button>
          </Grid>
          {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
        </Box>
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
