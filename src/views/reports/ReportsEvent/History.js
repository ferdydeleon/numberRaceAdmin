import React, { useState, useEffect, useCallback } from "react";
// import { Director, View } from '@millicast/sdk'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";
import api from "../../../axios";
import Api from "../../../Api";
import CraffstreamPlayer from "./CraffstreamPlayer";
// import { ExportSheet } from 'react-xlsx-sheet';
import PrintIcon from "@material-ui/icons/Print";
import {
  Box,
  colors,
  Typography,
  Card,
  Divider,
  CardHeader,
  Grid,
  Button,
  CardContent,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ReactExport from "react-data-export";
import {
  SITEID,
  MERCHANTID,
  CURRENT_DECK_STATUS,
} from "../../../utils/constant";
import { socketAccounting } from "../../../utils/socket";
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Color from "../../../utils/colors";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Color.TableHead,
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
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 500,
  },
  ExcelButton: {
    backgroundColor: colors.orange[700],
    color: "white",
    "&:hover": {
      backgroundColor: colors.orange[800],
    },
  },
  importButton: {
    marginRight: theme.spacing(2),
  },
  exportButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function EventDeal() {
  const classes = useStyles();
  var { id, eventName, createDate } = useParams();
  const [Event, setEventDeal] = useState([]);
  const [eventData, setEventDATA] = useState([]);
  const [datatatata, setDatatata] = useState("");
  const [companyFUND, setCompanyFUND] = useState("");
  const [drawFUND, setdrawFUND] = useState("");
  const [withdrawFUND, setwithdrawFUND] = useState("");
  const [commissionFUND, setcommissionFUND] = useState("");
  const [playerPOINTS, setplayerPOINTS] = useState("");
  const [playerCOMMISSION, setplayerCOMMISSION] = useState("");

  useEffect(() => {
    const fetchData = () => {
      api
        .get(`${Api.request.URL}/api/v2/report/income/event/details?id=${id}`)
        .then((res) => {
          setEventDeal(res.data.data.data);
          setEventDATA(res.data.data.event);
          setDatatata(
            res.data.data.data
              .reduce((a, v) => (a = a + v.company_income), 0)
              .toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          );
          let row = {};
          res.data.data.event.map((val) => {
            return (row = val);
          });
          setCompanyFUND(row.last_company_fund);
          setdrawFUND(row.last_draw_fund);
          setwithdrawFUND(row.last_withdraw_fund);
          setcommissionFUND(row.last_comission_fund);
          setplayerPOINTS(row.last_total_player_points);
          setplayerCOMMISSION(row.last_total_player_comission);
        });
    };
    fetchData();
  }, [id]);

  function handleClick() {
    window.location.href = Api.history.page;
  }
  // const[daaaa, setAAAAAA] = useState([]);
  useEffect(() => {
    const ARR = {
      TOTAL_INCOME: datatatata,
    };
    Object.assign(...eventData, ARR);
  });

  const getReports = useCallback(() => {
    api
      .get(`${Api.request.URL}/api/v2/report/income/event/details?id=${id}`)
      .then((res) => {
        setEventDeal(res.data.data.data);
        setEventDATA(res.data.data.event);
        setDatatata(
          res.data.data.data
            .reduce((a, v) => (a = a + v.company_income), 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        );

        let row = {};
        res.data.data.event.map((val) => {
          return (row = val);
        });
        setCompanyFUND(row.last_company_fund);
        setdrawFUND(row.last_draw_fund);
        setwithdrawFUND(row.last_withdraw_fund);
        setcommissionFUND(row.last_comission_fund);
        setplayerPOINTS(row.last_total_player_points);
        setplayerCOMMISSION(row.last_total_player_comission);
      });
  }, [id]);

  useEffect(() => {
    socketAccounting.io.opts.query = {
      ertyuhgvbniuhgbn: MERCHANTID,
      ertyuihgh: id,
      msdfewaer: SITEID,
      usfsafsdnla: "accounting",
      isafdsafasp: "8.8.8.8",
    };
    socketAccounting.open();
    socketAccounting.on("connect", () => {
      socketAccounting.sendBuffer = [];
      // console.log('Yeyow')
    });
    socketAccounting.on("reconnecting", () => {});
    socketAccounting.on(CURRENT_DECK_STATUS, (status) => {
      // trigger api calls
      // console.log(status);
      status?.status &&
        (status.status === "DONE" ||
          status.status === "CANCEL" ||
          status.status === "LAST_CALL" ||
          status.status === "OPEN" ||
          status.status === "CLOSE") &&
        getReports();
    });

    return () => {
      socketAccounting.disconnect();
    };
  }, [id, getReports]);

  return (
    <div>
      {Api.request.username === Api.request.pagcor ? (
        <CraffstreamPlayer />
      ) : null}

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          className={classes.importButton}
          style={Api.Back_button}
          startIcon={<ArrowBackIosIcon />}
          onClick={handleClick}
        >
          Back
        </Button>
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
          {/* fruits.push("Kiwi") */}
          <ExcelSheet data={eventData} name="EVENT DETAILS">
            <ExcelColumn label="Event Name" value="event_name" />
            <ExcelColumn
              label="Company Fund"
              value={(col) =>
                col.last_company_fund === null
                  ? 0
                  : col.last_company_fund.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Withdraw Fund"
              value={(col) =>
                col.last_withdraw_fund === null
                  ? 0
                  : col.last_withdraw_fund.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Draw Fund"
              value={(col) =>
                col.last_draw_fund === null
                  ? 0
                  : col.last_draw_fund.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Commission Fund"
              value={(col) =>
                col.last_comission_fund === null
                  ? 0
                  : col.last_comission_fund.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />

            <ExcelColumn
              label="Total Player Points"
              value={(col) =>
                col.last_total_player_points === null
                  ? 0
                  : col.last_total_player_points.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Total Player Commission"
              value={(col) =>
                col.last_total_player_comission === null
                  ? 0
                  : col.last_total_player_comission.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn label="TOTAL COMPANY INCOME" value="TOTAL_INCOME" />
          </ExcelSheet>

          <ExcelSheet data={Event} name="Fight History Details">
            <ExcelColumn label="Fight #" value="fightNumber" />
            <ExcelColumn label="Arena" value="arena_name" />
            <ExcelColumn
              label="Date of Fight"
              value={(col) => col.created_date.slice(0, 10)}
            />
            <ExcelColumn
              label="Time of Fight"
              value={(col) => col.created_date.slice(11, 19)}
            />
            <ExcelColumn
              label="Meron Bet"
              value={(col) =>
                col.meronBet === null
                  ? 0
                  : col.meronBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Wala Bet"
              value={(col) =>
                col.walaBet === null
                  ? 0
                  : col.walaBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Draw Bet"
              value={(col) =>
                col.drawBet === null
                  ? 0
                  : col.drawBet.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Draw Loss"
              value={(col) =>
                col.drawLoss === null ? 0 : col.drawLoss.toLocaleString()
              }
            />
            <ExcelColumn
              label="Company Income"
              value={(col) =>
                col.company_income === null
                  ? 0
                  : col.company_income.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn
              label="Agent Commission"
              value={(col) =>
                col.ma_comission === null
                  ? 0
                  : col.ma_comission.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
            />
            <ExcelColumn label="Declare Win" value="declare_win" />
            <ExcelColumn label="Status" value="status" />
          </ExcelSheet>
        </ExcelFile>
      </Box>

      {Api.request.username === Api.request.pagcor ? (
        null
      ) : (
        <Box mt={3}>
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: "h6" }}
              title={"EVENT DETAILS:"}
              subtitle={"EVENT SSS:"}
              subheaderTypographyProps={{ variant: "h3" }}
              subheader={eventName}
              // subheader={createDate}
              // title={"EVENT DETAILS:"}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={6} wrap="wrap">
                <Grid
                  item
                  md={4}
                  sm={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  xs={12}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    DATE: {createDate}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    style={{ color: "red" }}
                  >
                    {"COMPANY INCOME"}
                  </Typography>

                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    INCOME:{" "}
                    {"PHP " + datatatata === null ? "PHP 0.00" : datatatata}
                  </Typography>
                </Grid>

                <Grid
                  item
                  md={4}
                  sm={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  xs={12}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                    style={{ color: "red" }}
                  >
                    COMPANY FUND AFTER CLOSE EVENT
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    FUND:{" "}
                    {companyFUND === null
                      ? "PHP 0.00"
                      : "PHP " +
                        companyFUND.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    DRAW FUND:{" "}
                    {drawFUND === null
                      ? "PHP 0.00"
                      : "PHP " +
                        drawFUND.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </Typography>

                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    WITHDRAW FUND:{" "}
                    {withdrawFUND === null
                      ? "PHP 0.00"
                      : "PHP " +
                        withdrawFUND.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </Typography>

                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    COMMISSION FUND:{" "}
                    {commissionFUND === null
                      ? "PHP 0.00"
                      : "PHP " +
                        commissionFUND.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </Typography>
                </Grid>

                <Grid
                  item
                  md={4}
                  sm={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  xs={12}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                    style={{ color: "red" }}
                  >
                    PLAYER FUND AFTER CLOSE EVENT
                  </Typography>

                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    TOTAL PLAYER POINTS:{" "}
                    {playerPOINTS === null
                      ? "PHP 0.00"
                      : "PHP " +
                        playerPOINTS.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    // style={{color: "red"}}
                  >
                    TOTAL PLAYER COMMISSION:{" "}
                    {playerCOMMISSION === null
                      ? "PHP 0.00"
                      : "PHP " +
                        playerCOMMISSION.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box mt={3}></Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Fight #</StyledTableCell>
              <StyledTableCell align="left">Arena</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="right">Meron Bet</StyledTableCell>
              <StyledTableCell align="right">Wala Bet</StyledTableCell>
              <StyledTableCell align="right">Draw Bet </StyledTableCell>
              <StyledTableCell align="right">Draw Loss </StyledTableCell>
              <StyledTableCell align="right">Company Income </StyledTableCell>
              <StyledTableCell align="right">Agent Commission </StyledTableCell>
              <StyledTableCell align="center">Declare Win </StyledTableCell>
              <StyledTableCell align="center">Status </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Event.length ? (
              Event.map((row, i) => {
                let DECLARWIN;
                switch (row.declare_win) {
                  case "MERON":
                    DECLARWIN = (
                      <StyledTableCell
                        style={{ color: Color.red }}
                        align="center"
                      >
                        MERON
                      </StyledTableCell>
                    );
                    break;
                  case "WALA":
                    DECLARWIN = (
                      <StyledTableCell
                        style={{ color: Color.blue }}
                        align="center"
                      >
                        WALA
                      </StyledTableCell>
                    );
                    break;
                  case "DRAW":
                    DECLARWIN = (
                      <StyledTableCell
                        style={{ color: Color.green }}
                        align="center"
                      >
                        DRAW
                      </StyledTableCell>
                    );
                    break;
                  default:
                    DECLARWIN = (
                      <StyledTableCell align="center">________</StyledTableCell>
                    );
                }
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left">
                      {row.fightNumber}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.arena_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.created_date.slice(0, 10)} <br></br>
                      {row.created_date.slice(11, 19)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.meronBet === null
                        ? "0.00"
                        : row.meronBet.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.walaBet === null
                        ? "0.00"
                        : row.walaBet.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.drawBet === null
                        ? "0.00"
                        : row.drawBet.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {row.drawLoss === null
                        ? "0.00"
                        : row.drawLoss.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.company_income === null
                        ? "0.00"
                        : row.company_income.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.ma_comission === null
                        ? "0.00"
                        : row.ma_comission.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </StyledTableCell>

                    {DECLARWIN}
                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <TableCell key={1} colSpan={8}>
                  No Record
                </TableCell>
              </StyledTableRow>
            )}
            {/* <StyledTableCell align="right"> TOTAL COMPANY INCOME</StyledTableCell>
               <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right">{datatatata}</StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell> */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
