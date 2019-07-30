import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
// Icons
import LiveHelp from '@material-ui/icons/LiveHelp';
// Custom
import CustomTooltip from './CustomTooltip.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    // border: '1px solid red',
    display: 'inline-block'    
  },
  margin: {
    margin: theme.spacing(1),    
  }  
}));

const CircularBadge = props => {
  const classes = useStyles();

  const displayBadge = () => {
    if (props.count > 0) {
      return <Badge color="secondary" badgeContent={props.count} className={classes.margin}>
          <LiveHelp />
      </Badge>    
    } else {
      return <Badge color="secondary" variant="dot" className={classes.margin}>
        <LiveHelp />
      </Badge>
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <CustomTooltip title={`${props.count} questions / articles in this group`}>
        <div>
          {displayBadge()}
        </div>
        </CustomTooltip>
      </div>      
    </div>
  );
};

CircularBadge.propTypes = {
  count: PropTypes.number.isRequired
};


export default CircularBadge;