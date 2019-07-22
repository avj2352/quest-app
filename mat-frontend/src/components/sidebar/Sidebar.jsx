/**
 * Sidebar component - Drawer API
 * PAJ - 22 March 2019
 */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import { AppContext } from './../../common/AppContext';
import { getCategoriesWithEmail } from './../../common/async-requests';
import CircularLoader from '../loaders/circular-loader/CircularLoader.jsx';
import { showIcon } from './sidebar-icons';
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

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
//Styles
import { styles } from './sidebar-style';
import smallLogo from './../../assets/icon-small.png';


const Sidebar = props => {
    const appContext = useContext(AppContext);
    // state
    const [userDetails, setUserDetails] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleMode = () => {
      appContext.toggleTheme();
    };

    const modalCloseHandler = (val) => {
      setModalOpen(val);
    };

    // destructuring
    const { classes, theme, open, handleDrawerClose } = props;

    // componentDidMount
    useEffect(() => {
      const navList = [];
      setLoading(true);
      let email;
      const details = appContext.getLocalStorageJSON('user-details');
      if (details) {
        setUserDetails(details);
        email = details.email;
      }
      getCategoriesWithEmail(email)
      .then(res => {
        console.log('Data is: ', res);
        if (res.data) {
          res.data.map( item => {
            console.log('Item detail is: ', item);
            navList.push ({ name: item.title, link: item.slug, id: item._id});
          });
        }
        setListItems(navList);
        setLoading(false);
      });      
    },[]);

    const navListItem = (listItems && listItems.length > 0) ? <React.Fragment>
      {listItems.map ((el) => {
        return (
          <ListItem key={el.id} button onClick={()=> {window.location.href = `#/app/${el.link}`}}>
            <ListItemIcon>
              {showIcon(el.link)}
            </ListItemIcon>
            <ListItemText primary={`${el.name}`} />
          </ListItem>
        );
      })}
    </React.Fragment> : <React.Fragment></React.Fragment>;

    const additionListItems = (userDetails && userDetails.premium) ? <React.Fragment>
          <ListItem button onClick={()=> {window.location.href = '#/login'}}>
            <ListItemIcon>
            {showIcon('questions')}
            </ListItemIcon>
            <ListItemText primary="Add / Edit Questions" />
          </ListItem>
            <ListItem button onClick={()=> {window.location.href = '#/login'}}>
              <ListItemIcon>
              {showIcon('groups')}
              </ListItemIcon>
            <ListItemText primary="Add / Edit Groups" />
          </ListItem>          
          <ListItem button onClick={()=> {window.location.href = '#/login'}}>
              <ListItemIcon>
              {showIcon('tags')}
              </ListItemIcon>
            <ListItemText primary="Add / Edit Tags" />
          </ListItem> 
          </React.Fragment> : <React.Fragment></React.Fragment> ;

    return (
        <div>          
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
                <ListItem>
                  <CircularLoader display = {isLoading} />
                </ListItem>                
                {navListItem}
                <Divider />      
                {additionListItems}
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