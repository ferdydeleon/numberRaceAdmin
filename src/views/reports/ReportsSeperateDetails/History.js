import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import api from '../../../axios';
import Api from '../../../Api';
import PrintIcon from '@material-ui/icons/Print';
import {
  Box,
  colors,
  Typography,
  Card,
  Button,
  CardContent
} from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 900,
  },
  ExcelButton: {
    backgroundColor: colors.orange[700],
    color: 'white',
    '&:hover': {
      backgroundColor: colors.orange[800],
    },

  },
  importButton: {
    marginRight: theme.spacing(2)
  },
  exportButton: {
    marginRight: theme.spacing(2)
  }, backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
}))

export default function EventDeal() {
  const classes = useStyles();
  var { eventId, eventName } = useParams();
  const [Event, setEventDeal] = useState([]);
  const [backdropopen, setLoading] = useState(false);
  const [totalBetMeron, setTotalBetMeron] = useState('');
  const [totalBetWala, setTotalBetWala] = useState('');
  const [totalBetDraw, setTotalBetDraw] = useState('');
  const [totalBetBooster, setTotalBetBooster] = useState('');
  const [totalBetPlayer, setTotalBetPlayer] = useState('');
  const [totalBet, setTotalBet] = useState('');
  const [totalPlasada, setTotalPlasada] = useState('');
  const [totalPlayerPlasada, setTotalPlayerPlasada] = useState('');
  const [totalAgentIncome, setTotalAgentIncome] = useState('');
  const [totalAgentIncomePlayer, setTotalAgentIncomePlayer] = useState('');
  const [totalCompanyIncome, setTotalCompanyIncome] = useState('');
  const [totalCompanyIncomePlayer, setTotalCompanyIncomePlayer] = useState('');
  const [EventSEPERATE, setEventSEPERATE] = useState([]);
  const [totalFight, setTotalFight] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`${Api.request.URL}/api/v2/report/booster/income?event_id=${eventId}`).then(res => {
      var Sorting = res.data.data.slice(0);
      Sorting.sort(function (a, b) {
        return a.fightNumber - b.fightNumber;
      });
      setEventDeal(Sorting);
      const ids = res.data.data.map(o => o.fightnumber)
      const filtered = res.data.data.filter(({ fightnumber }, index) => !ids.includes(fightnumber, index + 1))
      setTotalFight(filtered.length)
      setTotalBetMeron((res.data.data.reduce((a, v) => a = a + v.total_bet_meron, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBetWala((res.data.data.reduce((a, v) => a = a + v.total_bet_wala, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBetDraw((res.data.data.reduce((a, v) => a = a + v.total_bet_draw, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBetBooster((res.data.data.reduce((a, v) => a = a + v.total_bet_booster, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBetPlayer((res.data.data.reduce((a, v) => a = a + v.total_bet_player, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBet((res.data.data.reduce((a, v) => a = a + v.total_bet, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      const sum = res.data.data.map((v) => v.plasada === null ? 0 : parseInt(v.plasada), 0)
      const sum1 = sum.reduce((partialSum, a) => partialSum + a, 0);
      setTotalPlasada(sum1.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      const sum2 = res.data.data.map((v) => v.player_plasada === null ? 0 : parseInt(v.player_plasada), 0)
      const sum3 = sum2.reduce((partialSum, a) => partialSum + a, 0);
      setTotalPlayerPlasada(sum3.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      const sum4 = res.data.data.map((v) => v.agent_income === null ? 0 : parseInt(v.agent_income), 0)
      const sum5 = sum4.reduce((partialSum, a) => partialSum + a, 0);
      setTotalAgentIncome(sum5.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      const sum6 = res.data.data.map((v) => v.agent_income_player_bet === null ? 0 : parseInt(v.agent_income_player_bet), 0)
      const sum7 = sum6.reduce((partialSum, a) => partialSum + a, 0);
      setTotalAgentIncomePlayer(sum7.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      const sum8 = res.data.data.map((v) => v.company_income === null ? 0 : parseInt(v.company_income), 0)
      const sum9 = sum8.reduce((partialSum, a) => partialSum + a, 0);
      setTotalCompanyIncome(sum9.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      const sum10 = res.data.data.map((v) => v.company_income_player_bet === null ? 0 : parseInt(v.company_income_player_bet), 0)
      const sum11 = sum10.reduce((partialSum, a) => partialSum + a, 0);
      setTotalCompanyIncomePlayer(sum11.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      const EvenSeperate = [{
        TOTALFIGHT: filtered.length,
        TOTALBETMERON: res.data.data.reduce((a, v) => a = a + v.total_bet_meron, 0),
        TOTALBETWALA: res.data.data.reduce((a, v) => a = a + v.total_bet_wala, 0),
        TOTALBETDRAW: res.data.data.reduce((a, v) => a = a + v.total_bet_draw, 0),
        TOTALBETBOOSTER: res.data.data.reduce((a, v) => a = a + v.total_bet_booster, 0),
        TOTALBETPLAYER: res.data.data.reduce((a, v) => a = a + v.total_bet_player, 0),
        TOTALBET: res.data.data.reduce((a, v) => a = a + v.total_bet, 0),
        TOTALBETPLASADA: sum1,
        TOTALBETPLAYERPLASADA: sum3,
        TOTALBETAGENTINCOME: sum5,
        TOTALBETAGENTINCOMEPLAYERBET: sum7,
        TOTALBETCOMPANYINCOME: sum9,
        TOTALBETCOMPANYPLAYER: sum11
      }]
      // console.log('EvenSeperate:', EvenSeperate)
      setEventSEPERATE(EvenSeperate)
      setLoading(false);

    }).catch(error => {
      console.log(error)
      setLoading(false);
    });
  }, [eventId]);


  function handleClick() {
    window.location.href = Api.history.page;
  }

  return (
    <div >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button variant="contained" className={classes.importButton} style={Api.Back_button}
          startIcon={<ArrowBackIosIcon />} onClick={handleClick}>
          Back
        </Button>


        <ExcelFile element={<Button fullWidth={true}
          color="primary"
          variant="contained"
          startIcon={<PrintIcon />}
          style={{ height: '55px', backgroundColor: 'orange' }}>Generate Excel</Button>}>
          <ExcelSheet data={Event} name={'Seperate Income ' + eventName}>
            <ExcelColumn label="Fight #" value="fightnumber" />
            <ExcelColumn label="Total Bet Meron" value="total_bet_meron" />
            <ExcelColumn label="Total Bet Wala" value="total_bet_wala" />
            <ExcelColumn label="Total Bet Draw" value="total_bet_draw" />
            <ExcelColumn label="Total Bet" value={(col) => col.total_bet_meron + col.total_bet_wala} />
            <ExcelColumn label="Plasada" value="plasada" />
            <ExcelColumn label="Agent Income" value="agent_income" />
            <ExcelColumn label="Company Income" value="company_income" />
            <ExcelColumn label="Total Bet-Booster" value="total_bet_booster" />
            <ExcelColumn label="Total Bet-Player" value="total_bet_player" />
            <ExcelColumn label="Actual Plasada" value="player_plasada" />
            <ExcelColumn label="Actual Agent Income" value="agent_income_player_bet" />
            <ExcelColumn label="Actual Company Income" value="company_income_player_bet" />
            <ExcelColumn label="Declare Win" value="declare_win" />
          </ExcelSheet>

          <ExcelSheet data={EventSEPERATE} name={'TOTAL SEPERATE INCOME'}>
            {/* <ExcelColumn label="Fight #" value={(col) => col.TOTALFIGHT} /> */}
            <ExcelColumn label="Total Bet Meron" value={(col) => col.TOTALBETMERON === null ? 0 : col.TOTALBETMERON.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            <ExcelColumn label="Total Bet Wala" value={(col) => col.TOTALBETWALA === null ? 0 : col.TOTALBETWALA.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            <ExcelColumn label="Total Bet Draw" value={(col) => col.TOTALBETDRAW === null ? 0 : col.TOTALBETDRAW.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            <ExcelColumn label="Total Bet" value={(col) => col.TOTALBET === null ? 0 : col.TOTALBET.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            <ExcelColumn label="Plasada" value={(col) => col.TOTALBETPLASADA === null ? 0 : col.TOTALBETPLASADA.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />

            <ExcelColumn label="Agent Income" value={(col) => col.TOTALBETAGENTINCOME === null ? 0 : col.TOTALBETAGENTINCOME.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />

            <ExcelColumn label="Company Income" value={(col) => col.TOTALBETCOMPANYINCOME === null ? 0 : col.TOTALBETCOMPANYINCOME.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />


            <ExcelColumn label="Total Bet-Booster" value={(col) => col.TOTALBETBOOSTER === null ? 0 : col.TOTALBETBOOSTER.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            <ExcelColumn label="Total Bet-Player" value={(col) => col.TOTALBETPLAYER === null ? 0 : col.TOTALBETPLAYER.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />

            <ExcelColumn label="Actual Plasada" value={(col) => col.TOTALBETPLAYERPLASADA === null ? 0 : col.TOTALBETPLAYERPLASADA.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />

            <ExcelColumn label="Actual Agent Income" value={(col) => col.TOTALBETAGENTINCOMEPLAYERBET === null ? 0 : col.TOTALBETAGENTINCOMEPLAYERBET.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />

            <ExcelColumn label="Actual Company Income" value={(col) => col.TOTALBETCOMPANYPLAYER === null ? 0 : col.TOTALBETCOMPANYPLAYER.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />

          </ExcelSheet>
        </ExcelFile>

      </Box>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            // style={{color: "red"}}
            >Event Name: {eventName}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={3}></Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Fight #</StyledTableCell>
              <StyledTableCell align="left">Total Bet Meron</StyledTableCell>
              <StyledTableCell align="left">Total Bet Wala</StyledTableCell>
              <StyledTableCell align="left">Total Bet Draw</StyledTableCell>
              <StyledTableCell align="left">Total Bet</StyledTableCell>
              <StyledTableCell align="left">Plasada</StyledTableCell>
              <StyledTableCell align="left">Agent Income</StyledTableCell>
              <StyledTableCell align="left">Company Income</StyledTableCell>
              <StyledTableCell align="left">Total Bet-Booster</StyledTableCell>
              <StyledTableCell align="left">Total Bet-Player</StyledTableCell>
              <StyledTableCell align="left">Actual Plasada</StyledTableCell>
              <StyledTableCell align="left">Actual Agent Income</StyledTableCell>
              <StyledTableCell align="left">Actual Company Income</StyledTableCell>
              <StyledTableCell align="left">Declare Win</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Event.length ? (
              Event.map((row, i) => {
                return (
                  <StyledTableRow hover key={i}>
                    <StyledTableCell align="left">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">{row.fightnumber}</StyledTableCell>
                    <StyledTableCell align="left">{row.total_bet_meron}</StyledTableCell>
                    <StyledTableCell align="left">{row.total_bet_wala}</StyledTableCell>
                    <StyledTableCell align="left">{row.total_bet_draw}</StyledTableCell>
                    <StyledTableCell align="left">{row.total_bet_meron + row.total_bet_wala}</StyledTableCell>
                    <StyledTableCell align="left">{row.plasada}</StyledTableCell>
                    <StyledTableCell align="left">{row.agent_income}</StyledTableCell>
                    <StyledTableCell align="left">{row.company_income}</StyledTableCell>
                    <StyledTableCell align="left">{row.total_bet_booster}</StyledTableCell>
                    <StyledTableCell align="left">{row.total_bet_player}</StyledTableCell>
                    <StyledTableCell align="left">{row.player_plasada}</StyledTableCell>
                    <StyledTableCell align="left">{row.agent_income_player_bet}</StyledTableCell>
                    <StyledTableCell align="left">{row.company_income_player_bet}</StyledTableCell>
                    <StyledTableCell align="left">{row.declare_win}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell key={1} colSpan={15}>
                  No record found!
                        </TableCell>
              </TableRow>
            )}
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>TOTAL</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalFight}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetMeron}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetWala}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetDraw}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBet}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalPlasada}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalAgentIncome}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalCompanyIncome}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetBooster}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetPlayer}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalPlayerPlasada}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalAgentIncomePlayer}</StyledTableCell>
            <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalCompanyIncomePlayer}</StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
