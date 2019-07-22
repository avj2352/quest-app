import React from 'react';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

const NotFound = props => {
    return (
        <React.Fragment>
            <WarningIcon/>
            <Typography component="p">Sorry!! Not cookie for you!</Typography>
        </React.Fragment>
    );
}

export default NotFound;