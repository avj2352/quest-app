import React, {useState, useContext} from 'react';
import {styles} from './admin-style';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { AppContext } from './../../common/AppContext.jsx';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleCard from '../../components/cards/Card.jsx';

const AdminLayout = props => {    
    const [open, setOpen] = useState(false);
    const { classes } = props;
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <div className={classes.root}>
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose}/>
            <main className={classNames(classes.content, { [classes.contentShift]: open })}>
              <SimpleCard/>
              <Typography component="p">Hello World !!</Typography>
          </main>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(AdminLayout);