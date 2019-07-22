import React from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
// CSS
import { withStyles } from '@material-ui/core/styles';
import { styles } from './tag-edit-style';

const TagEdit = props => {

    const { classes } = props;
    return (
        <div className = {classes.root} >
            <CssBaseline />
            <Typography className={classes.headerText} variant="h5" color="inherit" noWrap>Create / Update Tags</Typography>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(TagEdit);