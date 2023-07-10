import React, { useEffect, useState } from "react";
import Api from "../../../Api";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useParams } from "react-router-dom";
import api from "../../../axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";

import { Card, Box, CardContent, Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import ReactExport from "react-data-export";
import PrintIcon from "@material-ui/icons/Print";
import { useCallback } from "react";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  table: {
    minWidth: 700,
  },
  field: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  text: {
    textAlign: "left",
  },
  container: {
    maxHeight: 700,
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Api.table.head,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const App = () => {
  const alert = useAlert();
  var { event_id,eventName, gameCode } = useParams();

  const classes = useStyles();
  const [backdropopen, setLoading] = React.useState(false);
  const [posts, setPosts] = useState([]);

  const [Count, setCout] = useState(0);
  const [disable, setDisAble] = useState(true);
  const [nextdisable, setNextDisAble] = useState(false);
  const handleNextPage = () => {
    setDisAble(false);
    setCout(Count + 50);
    let val = Count + 50;
    // console.log("value: ",val)
    return getPosts(val);
  };

  const handleBackPage = () => {
    setCout(Count - 50);
    let val = Count - 50;
    // console.log("value: ",val)
    if (val === 0) {
      setNextDisAble(false);
      setDisAble(true);
    } else {
    }
    return getPosts(val);
  };

  const [totalBeT, setTotalBet] = useState([]);
  const getPosts = useCallback(async (val) => {
    //
    setLoading(true);
    try {
      await api
        .get(
          `${Api.request.URL}/api/v2/report/event?event_id=${event_id}&game_type=${gameCode}`
        )
        .then((res) => {
          setPosts(res.data.data);

          const DADADA = [{
            red: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet_red.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            blue: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet_blue.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            white: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet_white.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            green: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet_green.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            pink: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet_pink.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            yellow: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet_yellow.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),

            bet: (res.data.data.reduce((a, v) => a = a +   parseFloat(v.total_bet.replaceAll(',', '')), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
   
            bankerLoss: (res.data.data.reduce((a, v) => a = a + (v.banker_loss === null ? 0: v.banker_loss), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            bankerIncome: (res.data.data.reduce((a, v) => a = a + (v.banker_income === null ? 0: v.banker_income), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            rollback: (res.data.data.reduce((a, v) => a = a + (v.rollback_points === null ? 0: v.rollback_points), 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            plasada: (res.data.data.reduce((a, v) => a = a +    typeof(v.plasada)=== "string" ? parseFloat(v.plasada.replaceAll(',', '')):v.plasada, 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            agent: (res.data.data.reduce((a, v) => a = a +    typeof(v.agent)=== "string" ? parseFloat(v.agent.replaceAll(',', '')):v.agent, 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            company: (res.data.data.reduce((a, v) => a = a +    typeof(v.company)=== "string" ? parseFloat(v.company.replaceAll(',', '')):v.company, 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
          }]

          setTotalBet(DADADA)


        })
        .catch((error) => {
          setLoading(false);
          setPosts([]);

          alert.error(error.response.data.message);
          if (error.response.data.message === "NO DATA FOUND") {
            setNextDisAble(true);
          } else {
          }
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  },[event_id,gameCode,alert]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  //   const [buttonName, setButtonName] = useState('');
  //   const [buttonName1, setButtonName1] = useState('');
  //   useEffect(() => {
  //     api
  //       .get(`${Api.request.URL}/api/v2/button/event/${event_id}`)
  //       .then((res) => {

  //         let users = {};
  //         res.data.data.data.map((row) => {
  //          return users = row;

  //     });
  //     console.log('bbb',users.button_name)
  //       });
  //   }, []);

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
              // style={{color: "red"}}
            >
              Event Name: {eventName}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        mt={3}
        display="flex"
        justifyContent="flex-end"
        style={{ marginBottom: 10 }}
      >
        <ExcelFile
          element={
            <Button
              startIcon={<PrintIcon />}
              className={classes.importButton}
              style={Api.Excel_button}
            >
              Generate Excel
            </Button>
          }
        >
          <ExcelSheet data={posts} name={eventName}>
            <ExcelColumn label="Fight #" value="fightNumber" />
            <ExcelColumn label="Total Bet Red" value="total_bet_red" />
            <ExcelColumn label="Total Bet Blue" value="total_bet_blue" />
            <ExcelColumn label="Total Bet White" value="total_bet_white" />
            <ExcelColumn label="Total Bet Green" value="total_bet_green" />
            <ExcelColumn label="Total Bet Pink" value="total_bet_pink" />
            <ExcelColumn label="Total Bet Yellow" value="total_bet_yellow" />
            <ExcelColumn label="Total Bet" value="total_bet" />
            <ExcelColumn label="Banker Loss #" value="banker_loss" />
            <ExcelColumn label="Banker Income #" value="banker_income" />
            <ExcelColumn label="Rollback Points" value="rollback_points" />
            <ExcelColumn label="Plasada" value="plasada" />
            <ExcelColumn label="Agent" value="agent" />
            <ExcelColumn label="Company" value="company" />
            <ExcelColumn label="Declare Win" value="declare_win" />
            <ExcelColumn label="Status" value="status" />
          </ExcelSheet>
          <ExcelSheet data={totalBeT} name="Fight History Details Total">
          <ExcelColumn label="Total Bet Red"  value={(col) => col.red} />
            <ExcelColumn label="Total Bet Blue" value={(col) => col.blue} />
            <ExcelColumn label="Total Bet White" value={(col) => col.white} />
            <ExcelColumn label="Total Bet Green" value={(col) => col.green} />
            <ExcelColumn label="Total Bet Pink"  value={(col) => col.pink} />
            <ExcelColumn label="Total Bet Yellow" value={(col) => col.yellow} />
            <ExcelColumn label="Total Bet" value={(col) => col.bet } />
          <ExcelColumn label="Total Banker Loss" value={(col) => col.bankerLoss} />
          <ExcelColumn label="Total Banker Income" value={(col) => col.bankerIncome} />
          <ExcelColumn label="Total Rollback Points" value={(col) => col.rollback} />
          <ExcelColumn label="Total Plasada" value={(col) => col.plasada} />
          <ExcelColumn label="Total Bet Agent" value={(col) => col.agent} />
          <ExcelColumn label="Total Company" value={(col) => col.company} />
          </ExcelSheet>

        </ExcelFile>
      </Box>

      <Card>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Fight #</StyledTableCell>
                <StyledTableCell align="center">Total Bet Red </StyledTableCell>
                <StyledTableCell align="center">Total Bet Blue</StyledTableCell>
                <StyledTableCell align="center">
                  Total Bet White
                </StyledTableCell>
                <StyledTableCell align="center">
                  Total Bet Green
                </StyledTableCell>
                <StyledTableCell align="center">Total Bet Pink</StyledTableCell>
                <StyledTableCell align="center">
                  Total Bet Yellow
                </StyledTableCell>
                <StyledTableCell align="center">Total Bet</StyledTableCell>
                <StyledTableCell align="center">Banker Loss</StyledTableCell>
                <StyledTableCell align="center">Banker Income</StyledTableCell>
                <StyledTableCell align="center">
                  Rollback Points
                </StyledTableCell>
                <StyledTableCell align="center">Plasada</StyledTableCell>
                <StyledTableCell align="center">Agent</StyledTableCell>
                <StyledTableCell align="center">Company</StyledTableCell>
                <StyledTableCell align="center">Declare Win</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length ? (
                posts.map((row, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {row.fightNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet_red}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet_blue}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet_white}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet_green}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet_pink}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet_yellow}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_bet}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.banker_loss}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.banker_income}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.rollback_points}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.plasada}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.agent}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.company}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.declare_win}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.status}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    key={1}
                    colSpan={16}
                  >
                    No records found!
                  </StyledTableCell>
                </StyledTableRow>
              )}
              <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>Total</StyledTableCell>
            <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet_red.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
            <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet_blue.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
            <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet_white.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet_green.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet_pink.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet_yellow.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   parseFloat(v.total_bet.replaceAll(',', '')), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   v.banker_loss, 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   v.banker_income, 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>

          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a + (v.rollback_points === null ? 0: v.rollback_points), 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   typeof(v.plasada)=== "string" ?parseFloat(v.plasada.replaceAll(',', '')):v.plasada, 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   typeof(v.agent)=== "string" ?parseFloat(v.agent.replaceAll(',', '')):v.agent, 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
          <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}>{(posts.reduce((a, v) => a = a +   typeof(v.company)=== "string" ?parseFloat(v.company.replaceAll(',', '')):v.company, 0)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</StyledTableCell>
            <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}></StyledTableCell>
            <StyledTableCell align="center" style={{ color: 'red', fontWeight: 600 }}></StyledTableCell>

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
            <Grid item xs={0}>
              <Button
                disabled={disable}
                startIcon={<ArrowBackIosIcon />}
                onClick={handleBackPage}
              >
                {" "}
              </Button>
              <Button
                disabled={nextdisable}
                startIcon={<ArrowForwardIosIcon />}
                onClick={handleNextPage}
              >
                {" "}
              </Button>
            </Grid>
            {/* <Pagination siblingCount={0}   count={1} className={classes.page} /> */}
          </Box>
        </TableContainer>

        <Backdrop className={classes.backdrop} open={backdropopen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Card>
    </div>
  );
};
export default App;
