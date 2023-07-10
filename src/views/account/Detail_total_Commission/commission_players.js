import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import api from "../../../axios";
// import ListItem from '@material-ui/core/ListItem';
import Api from "../../../Api";
import { useAlert } from "react-alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Box, Grid, Button } from "@material-ui/core";
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
  },
  container: {
    maxHeight: 500,
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  //const [playerType, setTypePlayer] = useState('');
  const alert = useAlert();
  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);

  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 100);
    let val = Count + 100;
    //console.log("value: ",val)
    return RequestUsers(val);
  };

  const handleBackPage = () => {
    setCout(Count - 100);
    let val = Count - 100;
    // console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return RequestUsers(val);
  };

  const RequestUsers = useCallback(async (val) => {
    setLoading(true);
    try {
      let URL = "";
    
      // http://devopsenv.talpakan.com:3009/api/v2/Users?search=&group=&start=50
      URL = `${Api.request.URL}/api/v2/Users?search=${""}&group=${""}&start=${
        val === undefined ? 0 : val
      }`;
      //}
      await api
        .get(URL)
        .then((res) => {
          let idArr = ["ACCOUNTING", "STAFF", "SUPER_ADMIN"];
          let data = res.data.data.data.filter(
            (item) => !idArr.includes(item.group_name)
          );
          //console.log(data);
          setGetUsers(data);

          // console.log(res.data.data.data.filter(x => x.group_name === 'ACCOUNTING' ).forEach(x => res.data.data.data.splice(res.data.data.data.indexOf(x), 1)));

          setNextDisAble(false);
          setLoading(false);
        })
        .catch((error) => {
          setGetUsers([]);
          alert.error(error.response.data.message);
          if (error.response.data.message === "NO DATA FOUND") {
            setNextDisAble(true);
          } else {
          }
          setLoading(false);
        });
    } catch (e) {
      alert.error("Could not send request Error: Network Error");
      setLoading(false);
    }
    // setLoading(false);
  }, [alert]);
  useEffect(() => {
    RequestUsers();
  }, [RequestUsers]);

  const [downloads, setDownloads] = useState([]);
  const handleClickDownload = () => {
    //return getDownload(search, group,paid, status,Count, startingDate, endingDate);
    api
      .get(`${Api.request.URL}/api/v2/Users/download/all?search=${""}&group=${""}`)
      .then(res => {
        setLoading(false);

        const result = res.data.data.data.filter(
          (x) => x.group_name === "DIRECT_PLAYER" || x.group_name === "AGENT" || x.group_name === "PLATINUM" 
        );
        setDownloads(result);
        document.getElementById("downloads").click()
      })
      .catch(error => {

        alert.error(error.response.data.message);
        setLoading(false);

      });
  };

  return (
    <div>
      <ExcelFile element={<Button id="downloads" fullWidth={true}></Button>}>
        <ExcelSheet data={downloads} name="Employees">
          <ExcelColumn label="Username" value="username" />
          <ExcelColumn
            label="Usertype "
            value={(col) =>
              col.group_name === "AGENT" ? "DIRECT_PLAYER" : col.group_name
            }
          />
          <ExcelColumn label="Commission" value="comission_points" />
          <ExcelColumn
            label="Status "
            value={(col) =>
              col.active === 1 ? "Activate" :"Deactivate"
            }
          />
        </ExcelSheet>
      </ExcelFile>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Button
            fullWidth={true}
            color="primary"
            onClick={handleClickDownload}
            variant="contained"
            type="submit"
            //startIcon={<PrintIcon />}
            style={{ height: "55px", marginBottom: 5 }}
            // className={classes.ExcelButton}
          >
            Generate Excel
          </Button>
        </Grid>
        
      </Grid>

      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader ria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">User Type</StyledTableCell>
              <StyledTableCell align="left">Commission</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {getUsers.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{row.username}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.group_name === "AGENT"
                    ? "DIRECT_PLAYER"
                    : row.group_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.comission_points.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="left">{row.active === 1 ? "Active": "Deactive"}</StyledTableCell>
              </StyledTableRow>
            ))}
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
          <Grid>
            <Button
              className={classes.page}
              disabled={disable}
              startIcon={<ArrowBackIosIcon />}
              onClick={handleBackPage}
            >
              {" "}
            </Button>
            <Button
              className={classes.page}
              disabled={nextdisable}
              startIcon={<ArrowForwardIosIcon />}
              onClick={handleNextPage}
            >
              {" "}
            </Button>
          </Grid>
          {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
        </Box>

        <Backdrop className={classes.backdrop} open={backdropopen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </TableContainer>
    </div>
  );
}
