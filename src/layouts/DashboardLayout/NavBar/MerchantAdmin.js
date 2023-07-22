import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Divider, ListItem, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewListIcon from "@material-ui/icons/ViewList";
import EventIcon from "@material-ui/icons/Event";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import FlagIcon from "@material-ui/icons/Flag";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import EventNoteIcon from "@material-ui/icons/EventNote";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "#04AA6D",
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: "white", //theme.palette.primary.main, .MuiPaper-root
    backgroundColor: "#3e4396",
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.secondary.main,
    },
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
    // backgroundColor: '#efefef',
    // color: '#253237',
    "&:hover": {
      backgroundColor: "#3e4396",
      color: "white",
    },
    "&:hover .MuiListItemIcon-root": {
      color: "white",
    },
  },
  collaps: {
    //backgroundColor: "#efefef",
  },
  textColor: {
    color: "#088c3f",
    //088c3f
  },
}));

export default function NavItem() {
  const classes = useStyles();

  const [openEvent, setOpenEvent] = React.useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);
  const ClickEvent = () => {
    setOpenEvent(!openEvent);
  };

  const ClickAccount = () => {
    setOpenAccount(!openAccount);
  };

  const ClickLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader className={classes.textColor} component="div" id="nested-list-subheader">
      //     ADMIN PANEL
      //   </ListSubheader>
      // }
      className={classes.root}
    >
      <ListItem button onClick={ClickEvent}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Event Management" />
        {openEvent ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        className={classes.collaps}
        in={openEvent}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            //to="/app/event/list"
            to="/app/event/list/view"
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>

          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/event/create"
          >
            <ListItemIcon>
              <QueuePlayNextIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>

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
          </ListItem>

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
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={ClickAccount}>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Users Management" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        className={classes.collaps}
        in={openAccount}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
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
          </ListItem>
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
          </ListItem>

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
          </ListItem>

          {/* <ListItem
          button
          className={classes.nested}
          activeClassName={classes.active}
          component={RouterLink}
          to="/app/player/agent/tree/"
        >
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Agent Tree Dev" />
        </ListItem>  */}
        </List>
      </Collapse>

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
      </ListItem>

      {/* <ListItem button onClick={ClickReports}>
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

      {/* <ListItem  button
              className={classes.nested}
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/reports/income">
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Income" />
            </ListItem> */}

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
            </ListItem>  

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
            </ListItem>             


          </List>
        </Collapse> */}

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
      </ListItem>

      {/*  
      <ListItem button onClick={ClickTip}>
        <ListItemIcon>
          <DoneAllIcon />
        </ListItemIcon>
        <ListItemText primary="Tip Management" />
        {openTip ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openTip} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <ListItem
              button
              className={classes.nested}
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/tip/event"
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Tip Report" />
            </ListItem> 

        <ListItem
              button
              className={classes.nested}
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/tip/withdraw"
            >
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Tip Withdraw" />
            </ListItem> 
        </List>
      </Collapse> 


 <ListItem button onClick={ClickBanker}>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Management" />
        {openBanker ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBanker} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

        <ListItem
        className={classes.nested}
              button
              activeClassName={classes.active}
              component={RouterLink}
              to="/app/search/account/"
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="User Account" />
            </ListItem> 


          <ListItem
            button
            className={classes.nested}
            activeClassName={classes.active}
            component={RouterLink}
            to="/app/banker/bet/"
          >
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Event Status" />
          </ListItem>

          </List>
        </Collapse>*/}

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

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};
