import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, ListItem, makeStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Api from '../../../Api';
import MoneyIcon from '@material-ui/icons/Money';
import MerchantAdmin from './MerchantAdmin';
import InvestorUsers from './InvestorUsers';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CardMembershipIcon from '@material-ui/icons/CardMembership';

import AutorenewIcon from '@material-ui/icons/Autorenew';
import ListIcon from '@material-ui/icons/List';
import BlockIcon from '@material-ui/icons/Block';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import LocalAtmIcon from '@material-ui/icons/LocalAtm';
// import HistoryIcon from '@material-ui/icons/History';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: '#04AA6D',
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: 'white', //theme.palette.primary.main,
    backgroundColor: '#3e4396',
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.secondary.main
    },
    '& .MuiListItemIcon-root': {
      color: 'white',
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
    // backgroundColor: '#efefef',
    // color: '#253237',
    '&:hover': {
      backgroundColor: '#3e4396',
      color: 'white',
    },
    '&:hover .MuiListItemIcon-root': {
      color: 'white',
    },

  },
  collaps: {
    backgroundColor: '#3e4396',
  },
  textColor: {
    color: '#088c3f',
  }
}));


export default function NavItem() {
  // var timeoutID;

  // function setup() {
  //   document.addEventListener("mousemove", resetTimer, false);
  //   document.addEventListener("mousedown", resetTimer, false);
  //   document.addEventListener("keypress", resetTimer, false);
  //   document.addEventListener("DOMMouseScroll", resetTimer, false);
  //   document.addEventListener("mousewheel", resetTimer, false);
  //   document.addEventListener("touchmove", resetTimer, false);
  //   document.addEventListener("MSPointerMove", resetTimer, false);

  //   startTimer();
  // }
  // setup();

  // function startTimer() {
  //   // wait 2 seconds before calling goInactive
  //   timeoutID = window.setTimeout(goInactive, 1800000);
  // }

  // function resetTimer(e) {
  //   window.clearTimeout(timeoutID);
  //   goActive();
  // }

  // function goInactive() {
  //   // do something
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('refreshTokens');
  //   localStorage.removeItem('auth_user');
  //   window.location.replace('/login');
  // }

  // function goActive() {
  //   // do something
  //   startTimer();
  //}

  // window.onload = function() {
  //   inactivityTime(); 
  // }
  // var inactivityTime = function () {
  //   var time;
  //   window.onload = resetTimer;
  //   // DOM Events
  //   document.onkeypress = resetTimer;
  //   document.onload = resetTimer;
  //   document.onmousemove = resetTimer;
  //   document.onmousedown = resetTimer; // touchscreen presses
  //   document.ontouchstart = resetTimer;
  //   document.onclick = resetTimer;     // touchpad clicks
  //   document.onkeydown = resetTimer;   // onkeypress is deprectaed
  //   document.addEventListener('scroll', resetTimer, true); // improved; see comments

  //   function logout() {
  //     alert('logout')
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refreshTokens');
  //     localStorage.removeItem('auth_user');
  //     window.location.replace('/login');
  //       //location.href = 'logout.html'
  //   }

  //   function resetTimer() {
  //       clearTimeout(time);
  //       time = setTimeout(logout, 3000)
  //       // 1000 milliseconds = 1 second
  //   }
  // };

  const classes = useStyles();
  // const [openCompany, setOpenCompany] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);
  const [openCommission, setOpenCommission] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);
  // const [openSettingPops, setOpenSettingPops] = React.useState(false);
  const [openExempted, setOpenExempted] = React.useState(false);
  const Updatepending = Api.ACCOUNTING_USER.ACCTG.filter(item => item.username === Api.request.username);

  // DASH BOARD

  //const access_histoy_fund = Updatepending.map(val => val.histoy_fund) == 1;
  // COMPANY FUND 

  // const access_dashboard = parseInt(Updatepending.map(val => val.view_dashboard)) === 1;
  // const access_company_fund = parseInt(Updatepending.map(val => val.company_fund)) === 1;
  // const access_create_fund = parseInt(Updatepending.map(val => val.create_fund)) === 1;
  // const access_histoy_fund = parseInt(Updatepending.map(val => val.histoy_fund)) === 1;
  // END  COMPANY FUND 


  //fund management
  // const access_request_points_view = parseInt(Updatepending.map(val => val.request_points_view)) === 1;
  // const access_request_withdraw_view = parseInt(Updatepending.map(val => val.request_withdraw_view)) === 1;
  // const access_top_up = parseInt(Updatepending.map(val => val.top_up)) === 1;
  // const access_withdraw = parseInt(Updatepending.map(val => val.withdraw)) === 1;

  const access_fund_management = parseInt(Updatepending.map(val => val.fund_management)) === 1;
  const access_withdraw_total = parseInt(Updatepending.map(val => val.withdraw_total)) === 1;
  const access_logs_withdrawal = parseInt(Updatepending.map(val => val.logs_withdrawal)) === 1;

  // END fund management

  // commission_management
  const access_commission_management = parseInt(Updatepending.map(val => val.commission_management)) === 1;
  const access_request_commission = parseInt(Updatepending.map(val => val.request_commission)) === 1;
  const access_withdraw_commission = parseInt(Updatepending.map(val => val.withdraw_commission)) === 1;
  const access_convert_commission = parseInt(Updatepending.map(val => val.convert_commission)) === 1;
  //END commission management

  // REPORT
  const access_report = parseInt(Updatepending.map(val => val.report)) === 1;
  const access_player_history = parseInt(Updatepending.map(val => val.player_history)) === 1;

  //AUTO CASHOUT EXEMPTED
  const access_autoCasout_exempted = parseInt(Updatepending.map(val => val.autoCasout_exempted)) === 1;
  const access_exempted_list = parseInt(Updatepending.map(val => val.exempted_list)) === 1;
  const access_exempted_user = parseInt(Updatepending.map(val => val.exempted_user)) === 1;

  // const ClickCompany = () => {
  //   setOpenCompany(!openCompany);
  // };

  const ClickReports = () => {
    setOpenReports(!openReports);
  };

  const ClickCommission = () => {
    setOpenCommission(!openCommission);
  };

  const ClickSetting = () => {
    setOpenSetting(!openSetting);
  };

  // const ClickSettingPops = () => {
  //   setOpenSettingPops(!openSettingPops);
  // };

  const ClickLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const ClickExempted = () => {
    setOpenExempted(!openExempted);
  }


  if (Api.request.groupName === 'ACCOUNTING') {

    if (Api.request.username === Api.request.pagcor) {
      return (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              PAGCOR PANEL
      </ListSubheader>
          }
          className={classes.root}>

          <ListItem button
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/reports/income">
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Income" />
          </ListItem>

  

          <Divider />
          <ListItem button onClick={ClickLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              ACCOUNTING PANEL
          </ListSubheader>
          }
          className={classes.root}
        >
          {/* DASHBOARD */}
          {/* { access_dashboard === true ?
            <ListItem
              button
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/dashboard"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem> : ''} */}


          {/* { access_company_fund === true ?
            <ListItem button onClick={ClickCompany}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Company Fund" />
              {openCompany ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse in={openCompany} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {access_create_fund === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/company/fund/create"
                >
                  <ListItemIcon>
                    <LocalAtmIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Fund" />
                </ListItem> : ''}
              {access_histoy_fund === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/company/fund/view"
                >
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="History Fund" />
                </ListItem> : ''}
            </List>
          </Collapse> */}


          {access_fund_management === true ?
            <ListItem button onClick={ClickSetting}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Fund Management" />
              {openSetting ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse in={openSetting} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
{/* 
              {access_request_points_view === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/account/request/wallet"
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Request Points" />
                </ListItem> : ''}

              {access_request_withdraw_view === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/request/withdraw"
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Request Withdraw" />
                </ListItem> : ''}
              {access_top_up === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/topup"
                >
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Top Up" />
                </ListItem> : ''}
              {access_withdraw === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/withdraw"
                >
                  <ListItemIcon>
                    <CardMembershipIcon />
                  </ListItemIcon>
                  <ListItemText primary="Withdraw" />
                </ListItem> : ''}  */}

              {access_withdraw_total === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/total/withdraw"
                >
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Total Withdrawal" />
                </ListItem> : ''}

              {access_logs_withdrawal === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/max/logs/withdraw"
                >
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logs Withdrawal" />
                </ListItem> : ''}
            </List>
          </Collapse>
          
{/* 
            <ListItem button onClick={ClickSettingPops}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="GPT" />
              {openSettingPops ? <ExpandLess /> : <ExpandMore />}
            </ListItem> 
          <Collapse in={openSettingPops} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/gpt/check-deposit/"
                >
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Auto cash in" />
                </ListItem> 

                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/gpt/check-withdraw/">
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Auto cash out" />
                </ListItem> 
            </List>
          </Collapse>  */}


          { access_commission_management === true ?
            <ListItem button onClick={ClickCommission}>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Commission Management" />
              {openCommission ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse in={openCommission} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {access_request_commission === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/account/convert/commission"
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Request" />
                </ListItem> : ''}

              {access_withdraw_commission === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/commission"
                >
                  <ListItemIcon>
                    <CardMembershipIcon />
                  </ListItemIcon>
                  <ListItemText primary="Withdraw" />
                </ListItem> : ''}

              {access_convert_commission === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/fund/manual/convert/commission/"
                >
                  <ListItemIcon>
                    <AutorenewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Convert" />
                </ListItem> : ''}
            </List>
          </Collapse>

          {access_report === true ?
            <ListItem button onClick={ClickReports}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {openReports ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}


          <Collapse in={openReports} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <ListItem
                button
                className={classes.nested}
                activeClassName={classes.active}
                component={RouterLink}
                to="/app/reports/event/"
              >
                <ListItemIcon>
                  <ViewListOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Event" />
              </ListItem>
            
     
              <ListItem
                button
                className={classes.nested}
                activeClassName={classes.active}
                component={RouterLink}
                to="/app/reports/actual/income">

                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Actual Income" />
              </ListItem>

           
              <ListItem
                button
                className={classes.nested}
                activeClassName={classes.active}
                component={RouterLink}
                to="/app/reports/booster/income">

                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Booster Income" />
              </ListItem>

              {/* {access_income_report === true ?
                <ListItem button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/reports/income">
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Income" />
                </ListItem> : ''} */}

              {/* 
            <ListItem  button
              className={classes.nested}
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/reports/draw">
              <ListItemIcon>
                <RestorePageIcon />
              </ListItemIcon>
              <ListItemText primary="Draw" />
            </ListItem> */}


              {/* <ListItem
                className={classes.nested}
                button
                activeClassName={classes.active}
                component={RouterLink}
                to="/app/reports/banker/"
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Banker" />
            </ListItem>  */}

            </List>
          </Collapse>

          {/* {Api.request.username === 'yna_navarro' ?
                <ListItem
                  button
                  //className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/account/players/"
                >
                  <ListItemIcon>
                    <SupervisedUserCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem> : ''} */}


          {access_player_history === true ?
            <ListItem
              // className={classes.nested}
              button
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/reports/player/history"
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Player History" />
            </ListItem> : ''}
          {/* {access_autoCasout_blocking === true ?
            <ListItem button onClick={Clickblock}>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary="Auto Cashout Blocking" />
              {openBlock ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse in={openBlock} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {access_block_list === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/block/list"
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Blocked List" />
                </ListItem> : ''}

              {access_block_user === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/block/view"
                >
                  <ListItemIcon>
                    <BlockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Blocked User" />
                </ListItem> : ''}
            </List>
          </Collapse> */}

          {access_autoCasout_exempted === true ?
            <ListItem button onClick={ClickExempted}>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary="Withdrawal Exemption" />
              {openExempted ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse in={openExempted} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {access_exempted_list === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/exempted/list"
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Exempted List" />
                </ListItem> : ''}

              {access_exempted_user === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/exempted/view"
                >
                  <ListItemIcon>
                    <BlockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Exempt User" />
                </ListItem> : ''}
            </List>
          </Collapse>


          {/* MOBILE */}
          <Divider />
          <ListItem button onClick={ClickLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      );
    }
  } else if (Api.request.groupName === 'STAFF') {
    return (
      <InvestorUsers />

    );
  } else {
    /* MERCHANT */
    return (
      <MerchantAdmin />
    );

  }

}

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};
