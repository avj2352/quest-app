import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
// CSS
import { withStyles } from '@material-ui/core/styles';
import { styles } from './group-edit-styles';
// Custom
import GroupCreate from './GroupCreate.jsx';

const GroupView = props => {
    const handleGroupCreate = () => {
        console.log('Handler called');
    }
    const { classes } = props;
    return (
        <div className = {classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <GroupCreate onCreateTag={handleGroupCreate}/>
                </Grid>
            </div>            
        </div>
        
    );
};

export default withStyles(styles, { withTheme: true })(GroupView);