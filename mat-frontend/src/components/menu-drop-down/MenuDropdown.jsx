/**
 * MenuDropdown component
 * Holds logic to get userProfile and Display Menu icons accordingly
 */
import React, {useState, useContext, useEffect } from 'react';
// Material
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Stars';
import ExitIcon from '@material-ui/icons/MeetingRoom';
import InvertIcon from '@material-ui/icons/InvertColors';
import TouchIcon from '@material-ui/icons/TouchApp';
// custom
import { AppContext } from '../../common/AppContext';

//StyledMenu
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  



const MenuDropDown = props => {
    //context
    const appContext = useContext(AppContext);
    //states
    const [isLoggedIn, setLogin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [userAnchorEl, setUserAnchorEl] = React.useState(null);
    const [loginAnchorEl, setLoginAnchorEl] = React.useState(null);

    // Event handlers
    const handleUserMenuClick = (event)=>{
        setUserAnchorEl(event.currentTarget);
    };
    
    const handleUserMenuClose = ()=>{
        setUserAnchorEl(null);
    };

    const handleLoginMenuClick = event => {
        setLoginAnchorEl(event.currentTarget);
    };

    const handleLoginMenuClose = _ => {
        setLoginAnchorEl(null);
    };

    const toggleMode = () => {
        appContext.toggleTheme();
    }

    const logout = () => {
        window.location.href = '#/login';
    }
    
    //componentDidMount
    useEffect(()=>{
        const userData = appContext.getLocalStorageJSON('user-details');
        if(userData) {
            setUserDetails(userData);
            setLogin(true);
        }
    },[]);

    return (
        // 
        <React.Fragment>
            { isLoggedIn ?
            <AccountCircle onClick={handleUserMenuClick}/> :
            <MoreIcon onClick={handleLoginMenuClick}/> }
        
        {/* LoginMenu Button Menu Items */}
        <StyledMenu id="customized-menu" anchorEl={loginAnchorEl} keepMounted open={Boolean(loginAnchorEl)} onClose={handleLoginMenuClose}>
            <StyledMenuItem onClick = {logout}>
                <ListItemIcon>
                    <TouchIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
            </StyledMenuItem>            
        </StyledMenu>
        
        {/* UserAccount Button Menu Items */}
        <StyledMenu id="customized-menu" anchorEl={userAnchorEl} keepMounted open={Boolean(userAnchorEl)} onClose={handleUserMenuClose}>
            <StyledMenuItem>
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={`${userDetails.name}`} />
            </StyledMenuItem>
            <StyledMenuItem onClick = {toggleMode}>
                <ListItemIcon>
                    <InvertIcon/>
                </ListItemIcon>
                <ListItemText primary="Dark/Light mode" />
            </StyledMenuItem>
            <StyledMenuItem>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary={`Role: ${userDetails.role}`} />
            </StyledMenuItem>
            <StyledMenuItem onClick = {logout}>
                <ListItemIcon>
                    <ExitIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </StyledMenuItem>
        </StyledMenu>

        </React.Fragment>
    );
}

export default MenuDropDown; 