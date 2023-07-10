import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, ListItem, makeStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ViewListIcon from '@material-ui/icons/ViewList';
import Api from '../../../Api';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FlagIcon from '@material-ui/icons/Flag';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


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
  collaps: {
    backgroundColor: '#efefef',
  },
  textColor: {
    color: '#088c3f',
    //088c3f
  }
}));

export default function InvestorUsers() {
  const classes = useStyles();
  const [openEvent, setOpenEvent] = React.useState(false);

  const [openAccount, setOpenAccount] = React.useState(false);
  const [openSettingPops, setOpenSettingPops] = React.useState(false);

  const ClickEvent = () => {
    setOpenEvent(!openEvent);
  };


  const ClickAccount = () => {
    setOpenAccount(!openAccount);
  };

  const ClickLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const ClickSettingPops = () => {
    setOpenSettingPops(!openSettingPops);
  };

  const Updatepending = Api.STAFF_USER.STAFF.filter(item => item.username === Api.request.username);
  const access_create_event = parseInt(Updatepending.map(val => val.create_event)) === 1;
  const access_create_arena = parseInt(Updatepending.map(val => val.create_arena)) === 1;
  const access_viewing_event_fight = parseInt(Updatepending.map(val => val.viewing_event_fight)) === 1;
  const access_create_user = parseInt(Updatepending.map(val => val.create_user)) === 1;
  const access_viewing_Users = parseInt(Updatepending.map(val => val.viewing_Users)) === 1;
  const access_viewing_agent_tree = parseInt(Updatepending.map(val => val.viewing_agent_tree)) === 1;
  const access_viewing_player_history = parseInt(Updatepending.map(val => val.viewing_player_history)) === 1;
  const access_create_announcement = parseInt(Updatepending.map(val => val.create_announcement)) === 1;
  const access_viewing_event_list = parseInt(Updatepending.map(val => val.viewing_event_list)) === 1;

  if (Api.request.groupName === 'STAFF') {

    if (Api.request.username === Api.request.payborit) {

      return (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {Api.request.username === Api.request.payborit ? "PAYBORIT PANEL" : "STAFF PANEL"}
            </ListSubheader>
          }
          className={classes.root}
        >

          <ListItem button onClick={ClickSettingPops}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Payborit" />
            {openSettingPops ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSettingPops} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                activeClassName={classes.active}
                component={RouterLink}
                to="/app/payborit/view"
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Auto Cash In" />
              </ListItem>

              <ListItem
                button
                className={classes.nested}
                activeClassName={classes.active}
                component={RouterLink}
                to="/app/payborit/autocashout"
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Auto Cash Out" />
              </ListItem>


            </List>

          </Collapse>

          <Divider />
          <ListItem button onClick={ClickLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>


          {/* MOBILE */}
          {/* <Hidden lgUp>
      <Divider />
      <ListItem button onClick={ClickLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Hidden> */}
        </List>
      );

    } else {


      return (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              STAFF PANEL
      </ListSubheader>
          }
          className={classes.root}
        >
          {access_viewing_event_list === true ?
            <ListItem button onClick={ClickEvent}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Event Management" />
              {openEvent ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse in={openEvent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {access_viewing_event_list === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/event/list"
                >
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="List" />
                </ListItem> : ''}

              {access_create_event === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/event/create"
                >
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
                </ListItem> : ''}

              {access_create_arena === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/arena"
                >
                  <ListItemIcon>
                    <FlagIcon />
                  </ListItemIcon>
                  <ListItemText primary="Arena" />
                </ListItem> : ''
              }

              {access_viewing_event_fight === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/event/view"
                >
                  <ListItemIcon>
                    <EventNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Event Fight" />
                </ListItem> : ''
              }
            </List>
          </Collapse>
          {access_viewing_Users=== true ?
            <ListItem button onClick={ClickAccount}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Users Management" />
              {openAccount ? <ExpandLess /> : <ExpandMore />}
            </ListItem> : ''}
          <Collapse className={classes.collaps} in={openAccount} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {access_create_user === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/account/create/user/"
                >
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create User" />
                </ListItem> : ''
              }
              {access_viewing_Users === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/account/players/"
                >
                  <ListItemIcon>
                    <SupervisedUserCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem> : ''
              }

              {access_viewing_agent_tree === true ?
                <ListItem
                  button
                  className={classes.nested}
                  activeClassName={classes.active}
                  component={RouterLink}
                  to="/app/account/myplayers/"
                >
                  <ListItemIcon>
                    <PeopleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Agent Tree" />
                </ListItem> : ''
              }
            </List>
          </Collapse>
          {access_create_announcement === true ?
            <ListItem
              button
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/announcement/view"
            >
              <ListItemIcon>
                <AnnouncementIcon />
              </ListItemIcon>
              <ListItemText primary="Announcement" />
            </ListItem> : ''
          }

          {access_viewing_player_history === true ?
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


          <Divider />
          <ListItem button onClick={ClickLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>


          {/* MOBILE */}
          {/* <Hidden lgUp>
      <Divider />
      <ListItem button onClick={ClickLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Hidden> */}
        </List>
      );

    }
  }





}

InvestorUsers.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};
