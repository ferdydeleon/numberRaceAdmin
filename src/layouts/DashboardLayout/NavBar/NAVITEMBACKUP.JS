import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, Hidden, ListItem, makeStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
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
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import HistoryIcon from '@material-ui/icons/History';
import AutorenewIcon from '@material-ui/icons/Autorenew';

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
     backgroundColor: '#074c4b',
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
      backgroundColor: '#088c8a',
      color: 'white',     
    },
    '&:hover .MuiListItemIcon-root': {
      color: 'white',     
    },
   
  },
  collaps:{
    backgroundColor: '#efefef',
  },
  textColor:{
    color: '#088c3f',
      //088c3f
  }
}));


export default function NavItem() {


  const classes = useStyles();
  const [openCompany, setOpenCompany] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);
  const [openfund, setOpenFund] = React.useState(false);
  const [openCommission, setOpenCommission] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);
  const [openSettingPops, setOpenSettingPops] = React.useState(false);

 
  const Updatepending = Api.ACCOUNTING_USER.ACCTG.filter(item => item.username === Api.request.username);
  const access_dashboard = Updatepending.map(val => val.view_dashboard) == 1;
  //const access_histoy_fund = Updatepending.map(val => val.histoy_fund) == 1;
  const access_create_fund = Updatepending.map(val => val.create_fund) == 1;
  
  const access_request_points_view = Updatepending.map(val => val.request_points_view) == 1;
  const access_request_withdraw_view = Updatepending.map(val => val.request_withdraw_view) == 1;
  const access_top_up = Updatepending.map(val => val.top_up) == 1;
  const access_withdraw = Updatepending.map(val => val.withdraw) == 1;
  const access_manual_approval_payborit_auto_cashin= Updatepending.map(val => val.manual_approval_payborit_auto_cashin) == 1;

  const access_viewin_commissions_activity = Updatepending.map(val => val.viewin_commissions_activity) == 1;
  const access_withdraw_commission = Updatepending.map(val => val.withdraw_commission) == 1;
  const access_convert_commission = Updatepending.map(val => val.convert_commission) == 1;
  const access_income_report = Updatepending.map(val => val.income_report) == 1;
  const access_player_history = Updatepending.map(val => val.player_history) == 1;
  const access_roll_back_auto_cash_out = Updatepending.map(val => val.roll_back_auto_cash_out) == 1;
  const access_histoy_fund = Updatepending.map(val => val.histoy_fund) == 1;
  const access_payborit_view = Updatepending.map(val => val.payborit_view) == 1;
  //console.log("Api.ACCOUNTING_USER.ACCTG: ",Updatepending.map(val => val.access) == 1 )


  
  function getFullName(item) {
    return [item.firstname,item.lastname].join(" ");
  }
  const ClickCompany = () => {
    setOpenCompany(!openCompany);
  };

  const ClickReports = () => {
    setOpenReports(!openReports);
  };
 
  const ClickFund = () => {
    setOpenFund(!openfund);
  };

  const ClickCommission = () => {
    setOpenCommission(!openCommission);
  };

  const ClickSetting = () => {
    setOpenSetting(!openSetting);
  };

  const ClickSettingPops = () => {
    setOpenSettingPops(!openSettingPops);
  };

  const ClickLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

 if (Api.request.groupName =='ACCOUNTING') {
 
 if (Api.request.username == Api.request.pagcor ) {
  return(
    <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        PAGCOR PANEL
      </ListSubheader>
    } 
    className={classes.root}>

       <ListItem  button
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

  }else{


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
        { access_dashboard == true ? 
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
      </ListItem> : ''}

      

        <ListItem button onClick={ClickCompany}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Company Fund" />
        {openCompany ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openCompany} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          { access_create_fund == true ? 
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
          </ListItem> : '' }

          { access_histoy_fund == true ? 
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
       </Collapse>
 
   <ListItem button onClick={ClickSetting}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Fund Management" />
        {openSetting ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSetting} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {access_request_points_view == true ? 
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
         
          {access_request_withdraw_view == true ? 
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


          {access_top_up == true ? 

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
          {access_withdraw == true ? 
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
          </ListItem> : '' }
        </List>
      </Collapse>


      <ListItem button onClick={ClickSettingPops}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Payborit" />
        {openSettingPops ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSettingPops} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          {access_payborit_view == true ? 
        <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/payborit/dashboard/"
          >
            <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem> : ''}

          {access_payborit_view == true ? 
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/account/payborit/wallet/request"
          >
            
            <ListItemIcon>
            <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Auto Cash In View" />
          </ListItem>: ''}

          {access_payborit_view == true ? 
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/payborit/autocashout"
          >

            <ListItemIcon>
            <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Auto Cash Out View" />
          </ListItem> : ''}
          
          {access_manual_approval_payborit_auto_cashin == true ? 
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/payborit/cashin/request"
          >
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Pending AutoCashin" />
          </ListItem> : ''}
          {access_roll_back_auto_cash_out == true ? 
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/payborit/withdraw/request"
          >
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Rollback Withdraw Request" />
          </ListItem> : ''}
          {access_roll_back_auto_cash_out == true ? 
          <ListItem
          button
          className={classes.nested}
          activeClassName={classes.active}
          component={RouterLink}
          to="/app/account/block/view"
        >
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="User Block/Unblock" />
        </ListItem>  : ''}


        </List>
      </Collapse>


      <ListItem button onClick={ClickCommission}>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Commission Management" />
        {openCompany ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openCommission} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          { access_viewin_commissions_activity == true ?
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
          </ListItem> : '' }

 { access_withdraw_commission == true ? 
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

          { access_convert_commission ? 
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
       

    <ListItem button onClick={ClickReports}>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse className={classes.collaps}  in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
        
            {/* <ListItem  button
              className={classes.nested}
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/reports/fund">
              <ListItemIcon>
                <RestorePageIcon />
              </ListItemIcon>
              <ListItemText primary="Fund History" />
            </ListItem> */}
        {access_income_report == true ? 
            <ListItem  button
              className={classes.nested}
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/reports/income">
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Income" />
            </ListItem> : ''}

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
        {access_player_history == true ? 
            <ListItem
                className={classes.nested}
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
    }else if(Api.request.groupName == 'STAFF') {
      return (
      <InvestorUsers/>
      
      );
    } else {
      /* MERCHANT */
      return (
        <MerchantAdmin/>
      );
 
    }

}

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};
