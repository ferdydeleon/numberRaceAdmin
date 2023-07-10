import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PrintIcon from "@material-ui/icons/Print";
import {
  Box,
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import Api from "../../../Api";
import api from "../../../axios";
// import { useAlert } from 'react-alert';
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReactExport from "react-data-export";
import {eventList} from "../../../adminModel/eventData";


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
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    maxHeight: 500,
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: 2,
  },
  container: {
    maxHeight: 500,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [backdropopen, setLoading] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [noRecord, setNoRecord] = useState("");
  // const alert = useAlert();

  const [inputValue, setInputValue] = React.useState([]);
  const [listEvent, setListEvent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const results = await eventList();
      if (results === "NO DATA FOUND") {
        setListEvent([]);
      }else{
        setListEvent(results);
      }
      setLoading(false);
    }
    fetchData().catch(console.error);
  }, []);



  const [inputValuebooster, setInputValuebooster] = React.useState([]);
  const [boosterList, setBoosterList] = useState([]);
  useEffect(() => {
    setLoading(true);
    api
      .get(`${Api.request.URL}/api/v2/report//user/booster/list`)
      .then((res) => {
        setBoosterList(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setLoading(false);
        //alert.error(error.response.data.message)
      });
  }, []);

  // const [totalFight, setTotalFight] = useState('');
  const [totalBetMeron, setTotalBetMeron] = useState("");
  const [totalBetWala, setTotalBetWala] = useState("");
  const [totalBetDraw, setTotalBetDraw] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [totalCommission, setTotalComission] = useState("");
  const [totalWinAmount, setTotalWinAmount] = useState("");
  const [eventDATA, setEventDATA] = useState([]);
  const [totalBet, setTotalBET] = useState("");

  const handleClickSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    api
      .get(
        `${Api.request.URL}/api/v2/report/booster?event_id=${inputValue.id}&userId=${inputValuebooster.id}`
      )
      .then((res) => {
        //const arr = [{id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 1, name: 'one'}]
        const ids = res.data.data.map((o) => o.fightnumber);
        const filtered = res.data.data.filter(
          ({ fightnumber }, index) => !ids.includes(fightnumber, index + 1)
        );
        // console.log('filtered: ', filtered)
        setTotalBetMeron(
          res.data.data
            .reduce((a, v) => (a = a + v.total_bet_meron), 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        );

        setTotalBetWala(
          res.data.data
            .reduce((a, v) => (a = a + v.total_bet_wala), 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        );

        setTotalBetDraw(
          res.data.data
            .reduce((a, v) => (a = a + v.total_bet_draw), 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        );

        const sum4 = res.data.data.map(
          (v) => (v.income === null ? 0 : parseFloat(v.income)),
          0
        );
        //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
        const sum5 = sum4.reduce((partialSum, a) => partialSum + a, 0);
        setTotalIncome(
          sum5.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );

        const sum2 = res.data.data.map(
          (v) => (v.win_amount === null ? 0 : parseFloat(v.win_amount)),
          0
        );
        //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
        const sum3 = sum2.reduce((partialSum, a) => partialSum + a, 0);
        console.log("sum3: ", sum2);
        setTotalWinAmount(
          sum3.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );

        const sum = res.data.data.map(
          (v) => (v.comission === null ? 0 : parseFloat(v.comission)),
          0
        );
        //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
        const sum1 = sum.reduce((partialSum, a) => partialSum + a, 0);
        setTotalComission(
          sum1.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );

        const sum7 = res.data.data.map(
          (v) => (v.total_bet === null ? 0 : parseFloat(v.total_bet)),
          0
        );
        //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
        const sum8 = sum7.reduce((partialSum, a) => partialSum + a, 0);
        setTotalBET(
          sum8.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );

        // <ExcelColumn label="EventName" value={'EventName1' + 'h1' , style: {font: {sz: "24", bold: true}}} />
        // <ExcelColumn label="Username" value="Username1" />
        // <ExcelColumn label="Fight #" value="fightnumber1" />
        // <ExcelColumn label="Total Bet Meron" value="total_bet_meron1" />
        // <ExcelColumn label="Total Bet Wala" value="total_bet_wala1" />
        // <ExcelColumn label="Total Bet Draw" value="total_bet_draw1" />
        // <ExcelColumn label="Total Bet" value="total_bet1" />
        // <ExcelColumn label="Win Amount" value="win_amount1" />
        // <ExcelColumn label="Income" value="income1" />
        // <ExcelColumn label="Commission" value="comission1" />

        //   const DADADA = [
        //     {
        //         columns: [
        //             {title: "EventName", width: {wpx: 80}},//pixels width
        //             {title: "Username", width: {wch: 40}},//char width
        //             {title: "Fight #", width: {wpx: 90}},
        //         ],
        //         data: [
        //             [
        //                 {value: "H1", style: {font: {sz: "24", bold: true}}},
        //                 {value: "Bold", style: {font: {bold: true}}},
        //                 {value: "Red", style: {fill: {patternType: "solid", fgColor: {rgb: "FFFF0000"}}}},
        //             ],

        //         ]
        //     }
        // ];

        const DADADA = [
          {
            EventName1: inputValue.eventname,
            Username1: inputValuebooster.name,
            fightnumber1: filtered.length,
            total_bet_meron1: res.data.data.reduce(
              (a, v) => (a = a + v.total_bet_meron),
              0
            ),
            total_bet_wala1: res.data.data.reduce(
              (a, v) => (a = a + v.total_bet_wala),
              0
            ),
            total_bet_draw1: res.data.data.reduce(
              (a, v) => (a = a + v.total_bet_draw),
              0
            ),
            total_bet1: sum8,
            income1: sum5,
            win_amount1: sum3,
            comission1: sum1,
          },
        ];

        // console.log(DADADA)
        setEventDATA(DADADA);
        setGetUsers(res.data.data);

        setLoading(false);

        // console.log('dito3: ', res.data.data)
        // console.log(res.data.data.push(DADADA))
      })

      .catch((error) => {
        setGetUsers([]);
        setNoRecord("No Record Found!");
        // alert.error(error.response.data.message);
        setLoading(false);
      });
  };

  // function handleClickReport() {

  //   api.get(`${Api.request.URL}/api/v2/report/booster?event_id=${inputValue.id}&userId=${inputValuebooster.id}`)
  //     .then(res => {

  //       const ids = res.data.data.map(o => o.fightnumber)
  //       const filtered = res.data.data.filter(({ fightnumber }, index) => !ids.includes(fightnumber, index + 1))
  //       // console.log('filtered: ', filtered)

  //       setTotalBetMeron((res.data.data.reduce((a, v) => a = a + v.total_bet_meron, 0)).toLocaleString(undefined, {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 2
  //       }))

  //       setTotalBetWala((res.data.data.reduce((a, v) => a = a + v.total_bet_wala, 0)).toLocaleString(undefined, {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 2
  //       }))

  //       setTotalBetDraw((res.data.data.reduce((a, v) => a = a + v.total_bet_draw, 0)).toLocaleString(undefined, {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 2
  //       }))

  //       const sum4 = res.data.data.map((v) => v.income === null ? 0 : parseFloat(v.income), 0)
  //       //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
  //       const sum5 = sum4.reduce((partialSum, a) => partialSum + a, 0);

  //       const sum2 = res.data.data.map((v) => v.win_amount === null ? 0 : parseFloat(v.win_amount), 0);
  //       //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
  //       const sum3 = sum2.reduce((partialSum, a) => partialSum + a, 0)

  //       const sum = res.data.data.map((v) => v.comission === null ? 0 : parseFloat(v.comission), 0)
  //       //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
  //       const sum1 = sum.reduce((partialSum, a) => partialSum + a, 0);

  //       const sum7 = res.data.data.map((v) => v.total_bet === null ? 0 : parseFloat(v.total_bet), 0)
  //       //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
  //       const sum8 = sum7.reduce((partialSum, a) => partialSum + a, 0);

  //       const DADADA =[ {
  //         EventName1: inputValue.eventname,
  //         Username1: inputValuebooster.name,
  //         fightnumber1: filtered.length,
  //         total_bet_meron1: res.data.data.reduce((a, v) => a = a + v.total_bet_meron, 0),
  //         total_bet_wala1: res.data.data.reduce((a, v) => a = a + v.total_bet_wala, 0),
  //         total_bet_draw1: res.data.data.reduce((a, v) => a = a + v.total_bet_draw, 0),
  //         total_bet1: sum8,
  //         income1: sum5,
  //         win_amount1: sum3,
  //         comission1: sum1
  //       }]

  //       // console.log(DADADA)
  //       setEventDATA(DADADA)
  //       setLoading(false);

  //     }).catch(error => {
  //       setGetUsers([]);
  //       setNoRecord('No Record Found!');
  //       // alert.error(error.response.data.message);
  //       setLoading(false);
  //     });

  // }

  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={handleClickSearch}>
            <Grid container spacing={3}>
              <Grid item md={3} xs={12}>
                <Autocomplete
                  id="combo-box-demo"
                  fullWidth={true}
                  options={listEvent}
                  getOptionLabel={(option) =>
                    option.event_name === null ? "" : option.event_name
                  }
                  onChange={(a, b) =>
                    b === null
                      ? ""
                      : setInputValue({ id: b.id, eventname: b.event_name })
                  }
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Event Name"
                      required={true}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Autocomplete
                  id="combo-box-demo"
                  fullWidth={true}
                  options={boosterList}
                  getOptionLabel={(option) =>
                    option.username === null ? "" : option.username
                  }
                  onChange={(a, b) =>
                    b === null
                      ? ""
                      : setInputValuebooster({ id: b.userId, name: b.username })
                  }
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Booster Name"
                      required={true}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Button
                  fullWidth={true}
                  color="primary"
                  variant="contained"
                  margin="normal"
                  type="submit"
                  style={{ height: "55px" }}
                >
                  Filter
                </Button>
              </Grid>
              <Grid item md={3} xs={12}>
                <ExcelFile
                  element={
                    <Button
                      fullWidth={true}
                      color="primary"
                      variant="contained"
                      startIcon={<PrintIcon />}
                      style={{ height: "55px", backgroundColor: "orange" }}
                      // onClick={handleClickReport}
                    >
                      Generate Excel
                    </Button>
                  }
                >
                  <ExcelSheet data={getUsers} name={"Booster Income "}>
                    <ExcelColumn label="Fight #" value="fightnumber" />
                    <ExcelColumn
                      label="Total Bet Meron"
                      value="total_bet_meron"
                    />
                    <ExcelColumn
                      label="Total Bet Wala"
                      value="total_bet_wala"
                    />
                    <ExcelColumn
                      label="Total Bet Draw"
                      value="total_bet_draw"
                    />
                    <ExcelColumn label="Total Bet" value="total_bet" />
                    <ExcelColumn label="Win Amount" value="win_amount" />
                    <ExcelColumn label="Income" value="income" />
                    <ExcelColumn label="Commission" value="comission" />
                    <ExcelColumn label="Declare Win" value="declare_win" />
                  </ExcelSheet>

                  <ExcelSheet data={eventDATA} name="Total">
                    <ExcelColumn label="EventName" value="EventName1" />
                    <ExcelColumn label="Username" value="Username1" />
                    {/* <ExcelColumn label="Fight #" value="fightnumber1" /> */}
                    <ExcelColumn
                      label="Total Bet Meron"
                      value="total_bet_meron1"
                    />
                    <ExcelColumn
                      label="Total Bet Wala"
                      value="total_bet_wala1"
                    />
                    <ExcelColumn
                      label="Total Bet Draw"
                      value="total_bet_draw1"
                    />
                    <ExcelColumn label="Total Bet" value="total_bet1" />
                    <ExcelColumn label="Win Amount" value="win_amount1" />
                    <ExcelColumn label="Income" value="income1" />
                    <ExcelColumn label="Commission" value="comission1" />
                  </ExcelSheet>
                </ExcelFile>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Box mt={3}>
        <TableContainer component={Paper} className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Fight#</StyledTableCell>
                <StyledTableCell align="left">Total Bet Meron</StyledTableCell>
                <StyledTableCell align="left">Total Bet Wala</StyledTableCell>
                <StyledTableCell align="left">Total Bet Draw</StyledTableCell>
                <StyledTableCell align="left">Total Bet</StyledTableCell>
                <StyledTableCell align="left">Amount Win</StyledTableCell>
                <StyledTableCell align="left">Income</StyledTableCell>
                <StyledTableCell align="left">Commission</StyledTableCell>
                <StyledTableCell align="left">Declare Win</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getUsers.length ? (
                getUsers.map((row, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.fightnumber}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.total_bet_meron === null
                          ? 0
                          : row.total_bet_meron.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.total_bet_wala === null
                          ? 0
                          : row.total_bet_wala.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.total_bet_draw === null
                          ? 0
                          : row.total_bet_draw.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.total_bet === null
                          ? 0
                          : row.total_bet.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.win_amount === null
                          ? 0
                          : row.win_amount.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.income === null ? 0 : row.income.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.comission === null
                          ? 0
                          : row.comission.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.declare_win}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableRow>
                  <StyledTableCell key={1} colSpan={10}>
                    {noRecord}
                  </StyledTableCell>
                </TableRow>
              )}
              {getUsers.length ? (
                <TableRow>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  ></StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalBetMeron}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalBetWala}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalBetDraw}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalBet}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalWinAmount}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalIncome}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    {totalCommission}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "red", fontWeight: 600 }}
                  ></StyledTableCell>
                </TableRow>
              ) : (
                null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
