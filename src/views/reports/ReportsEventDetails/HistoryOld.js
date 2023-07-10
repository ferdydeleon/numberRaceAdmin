import React, { useState, useEffect } from 'react';
// import { Director, View } from '@millicast/sdk'
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
import CraffstreamPlayer from './CraffstreamPlayer';
import IconButton from '@material-ui/core/IconButton';
// import { ExportSheet } from 'react-xlsx-sheet';
import PrintIcon from '@material-ui/icons/Print';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import {
  Box,
  // Dialog,
  // Checkbox,
  colors,
  Typography,
  Card,
  Divider,
  CardHeader,
  Grid,
  // ThemeProvider,
  createMuiTheme,
  Button,
  CardContent
} from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReactExport from "react-data-export";
import { SITEID, MERCHANTID, CURRENT_DECK_STATUS } from '../../../utils/constant'
import { socketAccounting } from '../../../utils/socket'
import { isEmpty } from 'lodash';
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  },


}))(MuiDialogActions);

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },

});

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

export default function EventDeal({ }) {
  const classes = useStyles();
  var { event_id, gameTpe, banka, eventName, gameCode } = useParams();
  const [Event, setEventDeal] = useState([]);
  const [backdropopen, setLoading] = useState(false);


  const [totalBet, setTotalBet] = useState('');
  const [totalBetWin, setTotalBetWin] = useState('');
  const [totalBankerIncome, setTotalBankerIncome] = useState('');
  const [totalBankerWin, setTotalBankerWin] = useState('');
  const [totalBankerLoss, setTotalBankerLoss] = useState('');
  const [totalCompanyIncome, setCompanyIncome] = useState('');
  const [totalPlasada, setPlasada] = useState('');
  const [totalAgentIncome, setAgenIncome] = useState('');

  const [totalDrawWin, setTotalDraw_win] = useState('');
  const [totalDrawLoss, setTotalDraw_los] = useState('');
  const [total_bet_meron, setTOTAL_BET_MERON] = useState('');

  const [total_bet_wala, setTOTAL_BET_WALA] = useState('');
  const [total_bet_draw, setTOTAL_BET_DRAW] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`${Api.request.URL}/api/v2/report/event?event_id=${event_id}&game_type=${gameTpe}&isBanker=${banka}`).then(res => {
      // setEventDeal(res.data.data.data)

      var Sorting = res.data.data.data.slice(0);
      Sorting.sort(function(a,b) {
          return a.fightNumber - b.fightNumber;
      });

      setEventDeal(Sorting);

      setLoading(false);
      //   setEventDATA(res.data.data.event)
      setTotalBet((res.data.data.data.reduce((a, v) => a = a + v.total_bet, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBetWin((res.data.data.data.reduce((a, v) => a = a + v.total_bet_points_win, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setPlasada((res.data.data.data.reduce((a, v) => a = a + v.plasada, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setAgenIncome((res.data.data.data.reduce((a, v) => a = a + v.agent_income, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setCompanyIncome((res.data.data.data.reduce((a, v) => a = a + v.company_income, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBankerLoss((res.data.data.data.reduce((a, v) => a = a + v.total_banker_loss, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBankerWin((res.data.data.data.reduce((a, v) => a = a + v.total_banker_win, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBankerIncome((res.data.data.data.reduce((a, v) => a = a + v.banker_income, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      setTotalDraw_win((res.data.data.data.reduce((a, v) => a = a + v.total_draw_win, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      setTotalDraw_los((res.data.data.data.reduce((a, v) => a = a + v.total_draw_loss, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))


      const sum = res.data.data.data.map((v) => v.button_total_bet === null ? 0: v.button_total_bet.includes('MERON') === false ? 0 : parseInt(v.button_total_bet.match(/MERON=([0-9]+)/)[1]), 0);
      //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
      const sum1 = sum.reduce((partialSum, a) => partialSum + a, 0);
      setTOTAL_BET_MERON(sum1)

      const sum2 = res.data.data.data.map((v) => v.button_total_bet === null ? 0:v.button_total_bet.includes('WALA') === false ? 0 : parseInt(v.button_total_bet.match(/WALA=([0-9]+)/)[1]), 0);
      //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
      const sum3 = sum2.reduce((partialSum, a) => partialSum + a, 0);
      setTOTAL_BET_WALA(sum3)

      const sum4 = res.data.data.data.map((v) => v.button_total_bet === null ? 0: v.button_total_bet.includes('DRAW') === false ? 0 : parseInt(v.button_total_bet.match(/DRAW=([0-9]+)/)[1]), 0);
      //const sum1 = res.data.data.data.reduce((partialSum, v) => partialSum +v.sum, 0);
      const sum5 = sum4.reduce((partialSum, a) => partialSum + a, 0);
      setTOTAL_BET_DRAW(sum5)


      const DADADA = [{
        TOTALBET: res.data.data.data.reduce((a, v) => a = a + v.total_bet, 0),
        TOTALPOINTS: res.data.data.data.reduce((a, v) => a = a + v.total_bet_points_win, 0),
        TOTALPLASADA: res.data.data.data.reduce((a, v) => a = a + v.plasada, 0),
        TOTALAGENTINCOME: res.data.data.data.reduce((a, v) => a = a + v.agent_income, 0),
        TOTALCOMPANY: res.data.data.data.reduce((a, v) => a = a + v.company_income, 0),
        TOTALBANKERLOSS: res.data.data.data.reduce((a, v) => a = a + v.total_banker_loss, 0),
        TOTALBANKERWIN: res.data.data.data.reduce((a, v) => a = a + v.total_banker_win, 0),
        TOTALBANKERINCOME: res.data.data.data.reduce((a, v) => a = a + v.banker_income, 0),
        TOTALmeronBET: sum1,
        TOTALwalaBET: sum3,
        TOTALdrawBET: sum5,
        TOTALDRAWLOSS: res.data.data.data.reduce((a, v) => a = a + v.total_draw_loss, 0),
        TOTALDRAWWIN: res.data.data.data.reduce((a, v) => a = a + v.total_draw_win, 0),
      }]

      setEventDATA(DADADA)


    }).catch(error => {
      console.log(error)
      setLoading(false);
    });
  }, []);


  function handleClick() {
    window.location.href = Api.history.page;
  }
  // const[daaaa, setAAAAAA] = useState([]);

  // useEffect(() => {
  //   const ARR = {
  //     TOTAL_INCOME: datatatata
  //   }
  //   Object.assign(...eventData, ARR);
  // });

  const [eventDATA, setEventDATA] = useState([]);

  function handleClickReport() {
    api.get(`${Api.request.URL}/api/v2/report/event?event_id=${event_id}&game_type=${gameTpe}&isBanker=${banka}`).then(res => {
      //setEventDeal(res.data.data.data)

      setTotalBet((res.data.data.data.reduce((a, v) => a = a + v.total_bet, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBetWin((res.data.data.data.reduce((a, v) => a = a + v.total_bet_points_win, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setPlasada((res.data.data.data.reduce((a, v) => a = a + v.plasada, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setAgenIncome((res.data.data.data.reduce((a, v) => a = a + v.agent_income, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setCompanyIncome((res.data.data.data.reduce((a, v) => a = a + v.company_income, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBankerLoss((res.data.data.data.reduce((a, v) => a = a + v.total_banker_loss, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBankerWin((res.data.data.data.reduce((a, v) => a = a + v.total_banker_win, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      setTotalBankerIncome((res.data.data.data.reduce((a, v) => a = a + v.banker_income, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      setTotalDraw_win((res.data.data.data.reduce((a, v) => a = a + v.total_draw_win, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))

      setTotalDraw_los((res.data.data.data.reduce((a, v) => a = a + v.total_draw_loss, 0)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))


    }).catch(error => {
      console.log(error)
    });
  }


  const red = createMuiTheme({
    palette: {
      secondary: {
        main: '#f44336'
      }
    }
  });


  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });



  return (
    <div >
      {Api.request.username == Api.request.pagcor ?
        <CraffstreamPlayer /> : ""}

      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button variant="contained" className={classes.importButton} style={Api.Back_button}
          startIcon={<ArrowBackIosIcon />} onClick={handleClick}>
          Back
        </Button>
        {/* <Button
                      variant="contained"
                      color="secondary"
                      style={Api.Play_button}
                      className={classes.importButton}
                      onClick={e => {
                        genSource(
                          e
                          // row.video,
                          // row.video_type
                        );
                      }}
                    >
                  <PlayCircleFilledIcon />
                </Button> */}

        <ExcelFile element={<Button startIcon={<PrintIcon />} onClick={handleClickReport} className={classes.importButton} style={Api.Excel_button}>Generate Excel</Button>}>
          <ExcelSheet data={Event} name="Fight History Details">
            <ExcelColumn label="Fight #" value="fightNumber" />
            <ExcelColumn label="Total Bet" value={(col) => col.total_bet === null ? 0 : col.total_bet.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            {gameCode === "COLOR_GAME" ? <ExcelColumn label="Total Bet Points Win" value={(col) => col.total_bet_points_win === null ? 0 : col.total_bet_points_win.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} /> : isEmpty}
            <ExcelColumn label="Plasada" value={(col) => col.plasada === null ? 0 : col.plasada.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            {Api.request.username === 'bailey_accounting' ? isEmpty :
              <ExcelColumn label="Agent Income" value={(col) => col.agent_income === null ? 0 : col.agent_income.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} />}
            {Api.request.username === 'bailey_accounting' ? isEmpty :
              <ExcelColumn label="Company Income" value={(col) => col.company_income === null ? 0 : col.company_income.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} />}
            {gameCode === "NBA" || gameCode === "SABONG" || gameCode === "NBA" || gameCode === "DOTA" ? isEmpty : <ExcelColumn label="Total Banker Loss" value={(col) => col.total_banker_loss === null ? 0 : col.total_banker_loss.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />}
            {gameCode === "NBA" || gameCode === "SABONG" || gameCode === "NBA" || gameCode === "DOTA" ? isEmpty : <ExcelColumn label="Total Banker Win" value={(col) => col.total_banker_win === null ? 0 : col.total_banker_win.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />}
            {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Banker Income" value={(col) => col.banker_income === null ? 0 : col.banker_income.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />}

            {gameCode === "SABONG" ? <ExcelColumn label="Total Meron Bet" value={(col) => col.button_total_bet === null ? 0 :
             col.button_total_bet.includes('MERON') === false ? 0: col.button_total_bet.match(/MERON=([0-9]+)/)[1]} /> : isEmpty}

            {gameCode === "SABONG" ? <ExcelColumn label="Total Wala Bet" value={(col) => col.button_total_bet === null ? 0 : col.button_total_bet.includes('WALA') === false ? 0 :
              col.button_total_bet.match(/WALA=([0-9]+)/)[1]} /> : isEmpty}

            {gameCode === "SABONG" ? <ExcelColumn label="Total Draw Bet" value={(col) => col.button_total_bet === null ? 0 : col.button_total_bet.includes('DRAW') === false ? 0 :
              col.button_total_bet.match(/DRAW=([0-9]+)/)[1]} /> : isEmpty}


            <ExcelColumn label="Declare" value={(col) => col.declare_win === null ? 0 : col.declare_win.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} />
            <ExcelColumn label="Status" value="status" />

            <ExcelColumn label="Declare Win" value="declare_win" />
            <ExcelColumn label="Status" value="status" />
          </ExcelSheet>
          {Api.request.username === 'bailey_accounting' ?
            <ExcelSheet data={eventDATA} name="Fight History Details Total">
              <ExcelColumn label="Tota Bet" value={(col) => col.TOTALBET.toLocaleString()} />
              {gameCode === "COLOR_GAME" ? <ExcelColumn label="Total Bet Win" value={(col) => col.TOTALPOINTS.toLocaleString()} /> : isEmpty}
              <ExcelColumn label="Plasada" value={(col) => col.TOTALPLASADA.toLocaleString()} />
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Total Banker Loss" value={(col) => col.TOTALBANKERLOSS.toLocaleString()} />}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Total Banker Win" value={(col) => col.TOTALBANKERWIN.toLocaleString()} />}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Banker Income" value={(col) => col.TOTALBANKERINCOME.toLocaleString()} />}
              {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA" || gameCode === "DOTA"  ? isEmpty : <ExcelColumn label="Total Draw Loss" value={(col) => col.TOTALDRAWLOSS.toLocaleString()} />}
              {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA" || gameCode === "DOTA"  ? isEmpty : <ExcelColumn label="Total Draw Win" value={(col) => col.TOTALDRAWWIN.toLocaleString()} />}
              {gameCode === "SABONG" ? <ExcelColumn label="Total Meron Bet" value={(col) => col.TOTALmeronBET.toLocaleString()} /> : isEmpty}
              {gameCode === "SABONG" ? <ExcelColumn label="Total Wala Bet" value={(col) => col.TOTALwalaBET.toLocaleString()} /> : isEmpty}
              {gameCode === "SABONG" ? <ExcelColumn label="Total Draw Bet" value={(col) => col.TOTALdrawBET.toLocaleString()} /> : isEmpty}
            </ExcelSheet> :
            <ExcelSheet data={eventDATA} name="Fight History Details Total">
              <ExcelColumn label="Tota Bet" value={(col) => col.TOTALBET.toLocaleString()} />
              {gameCode === "COLOR_GAME" ? <ExcelColumn label="Total Bet Win" value={(col) => col.TOTALPOINTS.toLocaleString()} /> : isEmpty}
              <ExcelColumn label="Plasada" value={(col) => col.TOTALPLASADA.toLocaleString()} />
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Total Banker Loss" value={(col) => col.TOTALBANKERLOSS.toLocaleString()} />}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Total Banker Win" value={(col) => col.TOTALBANKERWIN.toLocaleString()} />}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <ExcelColumn label="Banker Income" value={(col) => col.TOTALBANKERINCOME.toLocaleString()} />}
              <ExcelColumn label="Company Income" value={(col) => col.TOTALCOMPANY.toLocaleString()} />
              <ExcelColumn label="Agent Income" value={(col) => col.TOTALAGENTINCOME.toLocaleString()} />
              {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME"  || gameCode === "NBA" || gameCode === "DOTA" ? isEmpty : <ExcelColumn label="Total Draw Loss" value={(col) => col.TOTALDRAWLOSS.toLocaleString()} />}
              {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA" || gameCode === "DOTA"? isEmpty : <ExcelColumn label="Total Draw Win" value={(col) => col.TOTALDRAWWIN.toLocaleString()} />}
              {gameCode === "SABONG" ? <ExcelColumn label="Total Meron Bet" value={(col) =>  col.TOTALmeronBET.toLocaleString()} /> : isEmpty}
              {gameCode === "SABONG" ? <ExcelColumn label="Total Wala Bet" value={(col) => col.TOTALwalaBET.toLocaleString()} /> : isEmpty}
              {gameCode === "SABONG" ? <ExcelColumn label="Total Draw Bet" value={(col) => col.TOTALdrawBET.toLocaleString()} /> : isEmpty}
              {/* {gameCode ===  "SABONG" ? <ExcelColumn label="Total Wala Bet" value={(col) => col.TOTALAGENTINCOME.toLocaleString()} /> : isEmpty}
              {gameCode ===  "SABONG" ? <ExcelColumn label="Total Draw Bet" value={(col) => col.TOTALDRAWLOSS.toLocaleString()} /> : isEmpty} */}

            </ExcelSheet>}
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
        {Api.request.username === 'bailey_accounting' ?
          <Table stickyHeader className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Fight #dd</StyledTableCell>
                <StyledTableCell align="left">Total Bet</StyledTableCell>
                {gameCode === "COLOR_GAME" ? <StyledTableCell align="left">Total Bet Win</StyledTableCell> : isEmpty}

                <StyledTableCell align="left">Plasada </StyledTableCell>

                {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">Total Banker Loss </StyledTableCell>}
                {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">Total Banker Win</StyledTableCell>}
                {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">Banker Income</StyledTableCell>}

                {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA" || gameCode === "DOTA" ? isEmpty : <StyledTableCell align="left">Total Draw loss </StyledTableCell>}
                {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA"  || gameCode === "DOTA"? isEmpty : <StyledTableCell align="left">Total Draw Win</StyledTableCell>}

                {gameCode === "SABONG" ? <StyledTableCell align="left">Total Meron Bet </StyledTableCell> : isEmpty}
                {gameCode === "SABONG" ? <StyledTableCell align="left">Total Wala Bet </StyledTableCell> : isEmpty}
                {gameCode === "SABONG" ? <StyledTableCell align="left">Total Draw Bet </StyledTableCell> : isEmpty}

                <StyledTableCell align="left">Declare Win </StyledTableCell>
                <StyledTableCell align="left">Status </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Event.length ? (
                Event.map((row, i) => {
                  let TOTALMERONBET;
                  let TOTALWALABET;
                  let TOTALDRAWBET;
                  try {
                    //const TotalWlaBet = row.button_total_bet
                    var WALAREGEX = /WALA=([0-9]+)/
                    var walaMATCH = row.button_total_bet.includes('WALA') === false ? 0 : row.button_total_bet.match(WALAREGEX);
                    TOTALWALABET = parseInt(walaMATCH[1])
                    var MERONREGEX = /MERON=([0-9]+)/
                    var meronMatch = row.button_total_bet.includes('MERON') === false ? 0 : row.button_total_bet.match(MERONREGEX);
                    TOTALMERONBET = isNaN(meronMatch[1]) ? 0 : meronMatch[1]

                    var DRAWREGEX = /DRAW=([0-9]+)/
                    var drawMatch = row.button_total_bet.includes('DRAW') === false ? 0 : row.button_total_bet.match(DRAWREGEX);
                    TOTALDRAWBET = isNaN(drawMatch[1]) ? 0 : drawMatch[1]

                  } catch (error) {
                    TOTALWALABET = 0
                    TOTALMERONBET = 0
                    TOTALDRAWBET = 0
                    //console.log('error: ', error)
                  }

                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left">{row.fightNumber}</StyledTableCell>
                      {/* <StyledTableCell align="left">{row.arena_name}</StyledTableCell> */}
                      <StyledTableCell align="left">{row.total_bet === null ? "0.00" : row.total_bet.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>

                      {gameCode === "COLOR_GAME" ? <StyledTableCell align="left">{row.total_bet_points_win === null ? "0.00" : row.total_bet_points_win.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> :  isEmpty}

                      <StyledTableCell align="left">{row.plasada === null ? "0.00" : row.plasada.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>

                      {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">{row.total_banker_loss === null ? "0.00" : row.total_banker_loss.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}
                      {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">{row.total_banker_win === null ? "0.00" : row.total_banker_win.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}
                      {gameCode === "NBA" || gameCode === "SABONG" ?isEmpty : <StyledTableCell align="left">{row.banker_income === null ? "0.00" : row.banker_income.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}

                      {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "DOTA"? isEmpty : <StyledTableCell align="left">{row.total_draw_loss === null ? "0.00" : row.total_draw_loss.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} </StyledTableCell>}
                      {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "DOTA"? isEmpty : <StyledTableCell align="left">{row.total_draw_win === null ? "0.00" : row.total_draw_win.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}

                      {gameCode === "SABONG" ? <StyledTableCell align="left">{parseInt(TOTALMERONBET).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : isEmpty}
                      {gameCode === "SABONG" ? <StyledTableCell align="left">{parseInt(TOTALWALABET).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : isEmpty}
                      {gameCode === "SABONG" ? <StyledTableCell align="left">{parseInt(TOTALDRAWBET).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : isEmpty}


                      <StyledTableCell align="left">{row.declare_win}</StyledTableCell>
                      <StyledTableCell align="left">{row.status}</StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <TableCell key={1} colSpan={6}>
                    No Record
             </TableCell>
                </StyledTableRow>
              )}

              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>Total</StyledTableCell>
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBet}</StyledTableCell>
              {gameCode === "COLOR_GAME" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetWin}</StyledTableCell> : isEmpty}
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalPlasada}</StyledTableCell>

              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBankerLoss}</StyledTableCell>}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBankerWin}</StyledTableCell>}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBankerIncome}</StyledTableCell>}

              {gameCode === "DROP_BALL"  || gameCode === "COLOR_GAME" || gameCode === "NBA"|| gameCode === "DOTA"? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalDrawLoss}</StyledTableCell>}
              {gameCode === "DROP_BALL"  || gameCode === "COLOR_GAME" || gameCode === "NBA"|| gameCode === "DOTA"? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalDrawWin}</StyledTableCell>}

              {gameCode === "SABONG" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{total_bet_meron.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</StyledTableCell> : isEmpty}
              {gameCode === "SABONG" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{total_bet_wala.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</StyledTableCell> : isEmpty}
              {gameCode === "SABONG" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{total_bet_draw.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</StyledTableCell> : isEmpty}

              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}></StyledTableCell>
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}> </StyledTableCell>

            </TableBody>

          </Table>
          :
          <Table stickyHeader className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Fight #</StyledTableCell>
                <StyledTableCell align="left">Total Bet</StyledTableCell>
                {gameCode === "COLOR_GAME" ? <StyledTableCell align="left">Total Bet Win</StyledTableCell> : isEmpty}
                <StyledTableCell align="left">Plasada </StyledTableCell>
                {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">Total Banker Loss </StyledTableCell>}
                {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">Total Banker Win</StyledTableCell>}
                {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left">Banker Income</StyledTableCell>}
                <StyledTableCell align="left">Company Income </StyledTableCell>
                <StyledTableCell align="left">Agent Income </StyledTableCell>

                {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA"  || gameCode === "DOTA" ? isEmpty : <StyledTableCell align="left">Total Draw loss </StyledTableCell>}
                {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA"  || gameCode === "DOTA" ? isEmpty : <StyledTableCell align="left">Total Draw Win</StyledTableCell>}

                {gameCode === "SABONG" ? <StyledTableCell align="left">Total Meron Bet </StyledTableCell> : isEmpty}
                {gameCode === "SABONG" ? <StyledTableCell align="left">Total Wala Bet </StyledTableCell> : isEmpty}
                {gameCode === "SABONG" ? <StyledTableCell align="left">Total Draw Bet </StyledTableCell> : isEmpty}
                <StyledTableCell align="left">Declare Win </StyledTableCell>
                <StyledTableCell align="left">Status </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Event.length ? (
                Event.map((row, i) => {
                  let TOTALMERONBET;
                  let TOTALWALABET;
                  let TOTALDRAWBET;
                  // let GrandTOtalMeron;
                  try {
                    //const TotalWlaBet = row.button_total_bet
                    var WALAREGEX = /WALA=([0-9]+)/
                    var walaMATCH = row.button_total_bet.includes('WALA') === false ? 0 : row.button_total_bet.match(WALAREGEX);
                    TOTALWALABET = parseInt(walaMATCH[1])
                    var MERONREGEX = /MERON=([0-9]+)/
                    var meronMatch = row.button_total_bet.includes('MERON') === false ? 0 : row.button_total_bet.match(MERONREGEX);
                    TOTALMERONBET = isNaN(meronMatch[1]) ? 0 : meronMatch[1]


                    var DRAWREGEX = /DRAW=([0-9]+)/
                    var drawMatch = row.button_total_bet.includes('DRAW') === false ? 0 : row.button_total_bet.match(DRAWREGEX);
                     TOTALDRAWBET = isNaN(drawMatch[1]) ? 0 : drawMatch[1]
                    // console.log("TOTALMERONBET : ", isNaN(TOTALMERONBET) ? 0.00 : TOTALMERONBET); // 6
                  } catch (error) {
                    TOTALWALABET = 0
                    TOTALMERONBET = 0
                    TOTALDRAWBET = 0
                    //  console.log('error: ', error)
                  }
                  // res.data.data.data.reduce((a, v) => a = a + v.total_draw_loss, 0)).toLocaleString(undefined, {
                  //   minimumFractionDigits: 2,
                  //   maximumFractionDigits: 2
                  // }
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left">{row.fightNumber}</StyledTableCell>
                      {/* <StyledTableCell align="left">{row.arena_name}</StyledTableCell> */}
                      <StyledTableCell align="left">{row.total_bet === null ? "0.00" : row.total_bet.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>
                      {gameCode === "COLOR_GAME" ? <StyledTableCell align="left">{row.total_bet_points_win === null ? "0.00" : row.total_bet_points_win.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : ""}
                      <StyledTableCell align="left">{row.plasada === null ? "0.00" : row.plasada.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>
                      {gameCode === "NBA" || gameCode === "SABONG" ? "" : <StyledTableCell align="left">{row.total_banker_loss === null ? "0.00" : row.total_banker_loss.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}
                      {gameCode === "NBA" || gameCode === "SABONG" ? "" : <StyledTableCell align="left">{row.total_banker_win === null ? "0.00" : row.total_banker_win.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}
                      {gameCode === "NBA" || gameCode === "SABONG" ? "" : <StyledTableCell align="left">{row.banker_income === null ? "0.00" : row.banker_income.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}
                      <StyledTableCell align="left">{row.company_income === null ? "0.00" : row.company_income.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>
                      <StyledTableCell align="left">{row.agent_income === null ? "0.00" : row.agent_income.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>
                      {/* {DECLARWIN} */}
                      {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME"  || gameCode === "NBA"  || gameCode === "DOTA" ? isEmpty : <StyledTableCell align="left">{row.total_draw_loss === null ? "0.00" : row.total_draw_loss.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} </StyledTableCell>}
                      {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME"  || gameCode === "NBA"  || gameCode === "DOTA" ? isEmpty : <StyledTableCell align="left">{row.total_draw_win === null ? "0.00" : row.total_draw_win.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell>}
                      {gameCode === "SABONG" ? <StyledTableCell align="left">{parseInt(TOTALMERONBET).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : isEmpty}
                      {gameCode === "SABONG" ? <StyledTableCell align="left">{parseInt(TOTALWALABET).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : isEmpty}
                      {gameCode === "SABONG" ? <StyledTableCell align="left">{parseInt(TOTALDRAWBET).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</StyledTableCell> : isEmpty}
                      <StyledTableCell align="left">{row.declare_win}</StyledTableCell>
                      <StyledTableCell align="left">{row.status}</StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <TableCell key={1} colSpan={10}>
                    No Record
                </TableCell>
                </StyledTableRow>
              )}
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>Total</StyledTableCell>
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBet}</StyledTableCell>
              {gameCode === "COLOR_GAME" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBetWin}</StyledTableCell> : ""}
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalPlasada}</StyledTableCell>
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBankerLoss}</StyledTableCell>}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBankerWin}</StyledTableCell>}
              {gameCode === "NBA" || gameCode === "SABONG" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalBankerIncome}</StyledTableCell>}
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalCompanyIncome}</StyledTableCell>
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalAgentIncome}</StyledTableCell>

              {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME" || gameCode === "NBA" || gameCode === "DOTA"  ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalDrawLoss}</StyledTableCell>}
              {gameCode === "DROP_BALL" || gameCode === "COLOR_GAME"  || gameCode === "NBA" || gameCode === "DOTA" ? isEmpty : <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{totalDrawWin}</StyledTableCell>}

              {gameCode === "SABONG" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{total_bet_meron.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</StyledTableCell> : isEmpty}
              {gameCode === "SABONG" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{total_bet_wala.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</StyledTableCell> : isEmpty}
              {gameCode === "SABONG" ? <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}>{total_bet_draw.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</StyledTableCell> : isEmpty}

              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}></StyledTableCell>
              <StyledTableCell align="left" style={{ color: 'red', fontWeight: 600 }}> </StyledTableCell>
            </TableBody>
          </Table>}
      </TableContainer>

      <Backdrop className={classes.backdrop} open={backdropopen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
