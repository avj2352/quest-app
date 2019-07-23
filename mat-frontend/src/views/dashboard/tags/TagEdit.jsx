import React from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
// CSS
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { styles } from './tag-edit-style';

const TagEdit = props => {

    const { classes } = props;
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Typography className={classes.headerText} variant="h5" color="inherit" noWrap>Create / Update Tags
            </Typography>
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <Paper className={classes.paper}>md=12</Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>md=6</Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>md=6</Paper>
                    </Grid>                    
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(TagEdit);