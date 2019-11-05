/* eslint-disable camelcase */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {AccountCircle} from '@material-ui/icons';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import {logOut} from '../actions/user.action';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {loggedIn,user} = props;
  const {full_name, avatar, username} = user || {};
  const {handleLogOut} = props;
  console.log(props);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    loggedIn?
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton  href="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeRoundedIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {full_name}
          </Typography>
          { (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                  {avatar? <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar} />:
                            <AccountCircle />}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem ><a className="reset-link-style" href="/upload-avatar">Update Avatar</a></MenuItem>
                <MenuItem ><a className="reset-link-style" href="/update-profile">Edit Profile</a></MenuItem>
                <MenuItem><a className="reset-link-style" href="/reset-password">Edit Password</a></MenuItem>
                <MenuItem><a className="reset-link-style" href="/logout">Log Out</a></MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  :null);
}
const mapStateToProps = state =>({
    user: state.user.user,
    loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleLogOut: logOut
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar);