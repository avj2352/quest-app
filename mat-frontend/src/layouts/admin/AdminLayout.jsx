import React, {useState, useContext} from 'react';
import { SnackbarProvider } from 'notistack';

import {styles} from './admin-style';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { AppContext } from './../../common/AppContext.jsx';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleCard from '../../components/cards/Card.jsx';
import { routeMap } from './admin-model';

const AdminLayout = props => {    
    const [open, setOpen] = useState(false);
    const { classes } = props;
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getRoutes = () => {
        if( props && props.location) {
          return routeMap(props.location.pathname, props.location.search);
        } else {
          return null;
        }              
    };

    return (
        <SnackbarProvider maxSnack={3}>
            <div className={classes.root}>
                <CssBaseline />
                <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
                <Sidebar open={open} handleDrawerClose={handleDrawerClose}/>
                <main className={classNames(classes.content, { [classes.contentShift]: open })}>
                    {getRoutes()}                
            </main>
            </div>
        </SnackbarProvider>
    );
}

export default withStyles(styles, { withTheme: true })(AdminLayout);