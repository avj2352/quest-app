/**
 * Simple Badge = Chip + Tooltip components of Material-UI
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

const SimpleBadge = props => {

    const { classes } = props;    

    return(
        <React.Fragment>
        <CustomTooltip title={props.description}>
        <Chip
                      avatar={<Avatar>{props.name.substring(0,1).toUpperCase()}</Avatar>}                      
                      label={props.name}
                      clickable                      
                      className={classes.chip}
                      color="primary"        
                      deleteIcon={<DoneIcon />}/>
        </CustomTooltip>
        </React.Fragment>
    );

};


SimpleBadge.propType = {
    name: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(SimpleBadge);