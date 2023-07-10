import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import Color from "../../utils/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#1f2a40",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    "& .MuiListItem-button:hover": {
      backgroundColor: Color.sidebarItemhover,
      color: Color.sidebartitleColor,
    },
    "& .MuiListItem-button:active": {
      backgroundColor: "#3e4396",
      color: "#e0e0e0",
    },
    "& .MuiListItem-button:hover  .MuiListItemIcon-root": {
      color: "#e0e0e0",
    },
    "& .MuiButton-contained:hover": {
      backgroundColor: "#3e4396",
    },
    // // eto ung pagremove ng navbar kapag gusto mo ibalik delete lang to makeStyles-wrapper-2 or comment mo lang
    // '& .makeStyles-wrapper-2': {
    //   paddingLeft: '0px',
    // }
  },
  wrapper: {
    display: "flex",

    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
    "& .MuiPaper-root": {
      backgroundColor: Color.tableColor,
    },
    "& .MuiTableCell-body": {
      color: Color.tableTextColor,
    },
    "& .MuiTypography-h4": {
      color: Color.tableTextColor,
    },
    "& .MuiTypography-h5": {
      color: Color.tableTextColor,
    },
    "& .MuiInputBase-input": {
      color: Color.inputTextColor,
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: Color.labeloutLinedColor,
    },
    "& .MuiInputLabel-outlined": {
      color: Color.labeloutLinedColor,
    },
  },

  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
