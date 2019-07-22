import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useStyles } from './circular-loader-styles';


const CircularLoader = (props) => {

  const classes = useStyles();
  const displayLoader = classnames(classes.root, { [classes.display]: props.display });

  return (
    <div className = {displayLoader} >
      <CircularProgress className={classes.progress} />
      <Typography component="p">Loading...</Typography>
    </div>
  );
};

CircularLoader.propTypes = {
    display: PropTypes.bool.isRequired
};

export default CircularLoader;
