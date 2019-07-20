/**
 * Sidebar component - Drawer API
 * PAJ - 22 March 2019
 */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Components
import { AppContext } from './../../common/AppContext';
// import SimpleModal from './../simple-modal/SimpleModal';
// Material
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import InfoIcon from '@material-ui/icons/Info';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
//Styles
import { styles } from './sidebar-style';
import smallLogo from './../../assets/icon-small.png';


const Sidebar = props => {
    const appContext = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleMode = () => {
      appContext.toggleTheme();
    }
    const modalCloseHandler = (val) => {
      setModalOpen(val);
    }    
    const { classes, theme, open, handleDrawerClose } = props;
    return(
        <div>
          {/* <SimpleModal open={!!modalOpen} handleClose={modalCloseHandler.bind(false)} /> */}
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={
              {
                paper: classes.drawerPaper,
              }
            }>
            <div className={classes.drawerHeader}>
              <Avatar alt="app-logo" src={smallLogo} 
                      className={classes.avatar}>
              </Avatar>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>            
              <ListItem button onClick={toggleMode}>
                <ListItemIcon>
                    <SwapHorizIcon />
                </ListItemIcon>
                <ListItemText primary="Toggle Mode" />
              </ListItem>
              
              <ListItem button onClick={modalCloseHandler.bind(true)}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>            
            </List>          
          </Drawer>
        </div>
    );
};

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Sidebar);