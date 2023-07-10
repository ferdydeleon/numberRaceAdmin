import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'src/components/Logo';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Api from '../../Api';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: Api.table.head,
    ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
  
      '& .makeStyles-root-8':{
         width: '15%'
       }
      }
  },
  avatar: {
    width: 60,
    height: 60
  },
  paper: {
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  // const [notifications] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  // const handleToggle = () => {
  //   setOpen(prevOpen => !prevOpen);
  // };
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const Logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const gotMyAccount = () => {
    window.location.href = '/app/account';
  };
  if (
    Api.request.username === undefined ||
    Api.request.superAdmin === undefined
  ) {
  
    window.location.href = '/';
  } else {
    
    return (
      <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
        <Toolbar>
          <Logo /> 
          {/* <Typography>PRE PROD</Typography> */}
          {/* <RouterLink to="/">
            <Logo />
          </RouterLink> */}
          <Box flexGrow={1} />
          <Hidden mdDown>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={gotMyAccount}>
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={Logout}>
                          <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">Logout</Typography>
                        </MenuItem>
                        {/* <MenuItem onClick={gotMyAccount}><AccountCircleIcon />  Profile</MenuItem> */}
                        {/* <MenuItem onClick={gotMyAccount}>My account</MenuItem> */}
                    {/*     <MenuItem onClick={Logout}>
                          <ExitToAppIcon /> Logout
                        </MenuItem> */}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
