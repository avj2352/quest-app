/**
 * Actionable Badge = Cancelable Chip + Tooltip components of Material-UI
 */
import React from 'react';
import { withStyles, theme } from '@material-ui/core/styles';
import Proptypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CustomTooltip from './CustomTooltip.jsx';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';



const styles = theme => ({     
    chip: {
        margin: theme.spacing(1),
    }    
  });

const ActionableBadge = props => {

    const { classes } = props;

    // event handlers
    const handleDelete = evt => {
        props.onDelete(props.id);
    };

    return (
        <React.Fragment>
        <CustomTooltip title={props.description}>
        <Chip        
            label={props.name}
            onDelete={handleDelete}
            className={classes.chip}
            color="secondary"
        />
        </CustomTooltip>
        </React.Fragment>
    );

};


ActionableBadge.propType = {
    id: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    onDelete: Proptypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(ActionableBadge);