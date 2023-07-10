import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import Accounting from './Accounting';
import Api from '../../../Api';
import Color from '../../../utils/colors';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
    backgroundColor: Color.sidebarColor, // backgroud color ng side bar
    color: Color.sidebartitleColor,
    '& .MuiSvgIcon-root' : {
      color: Color.iconSidebarColor,
    },
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    backgroundColor: Color.sidebarColor, // backgroud color ng side bar
    height: 'calc(100% - 64px)',
    color: Color.sidebartitleColor,
    '& .MuiSvgIcon-root' : {
      color: Color.iconSidebarColor,
    },

  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  // backgroud color ng side bar
  },
  Head:{
    backgroundColor: '#3e4396',
    color: 'white'
  },
  textColor:{
      color: Color.nameAvatarColor
      //088c3f
  },
  button_blue:{
    background: '#1F2A40',///'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',//'0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

}));

  const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
     
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={1}
        className={classes.button_blue}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          //src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.textColor}
          // color="textPrimary"
          variant="h5"
        >
          {Api.request.username}
        </Typography>
        <Typography
         className={classes.textColor}
          variant="body2"
        >
          {Api.request.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box >
        <List>
            <Accounting/> 
        </List>
      </Box>
      <Box flexGrow={1} />
      
         <Typography
          align="center"
          gutterBottom
          variant="h6"
          style={{color: Color.green}}
        >© 2023 v3.0
         {/* Power By: FVSP Inc. © 2021 v1.1 */}
        </Typography>
        {/* <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>  */}
        {/* <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            component="a"
            // href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button> 
        </Box> */}
      </Box>
  
  );

  return (
    
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
