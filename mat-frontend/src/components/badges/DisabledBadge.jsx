import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const DisabledBadge = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip variant="outlined" color="secondary" label={`/${props.value}`} className={classes.chip} />
    </div>
  );
};


DisabledBadge.propTypes = {
  value: PropTypes.string.isRequired  
};

export default DisabledBadge;