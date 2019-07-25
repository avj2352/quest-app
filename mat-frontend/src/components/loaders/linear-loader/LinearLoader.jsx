import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import classnames from 'classnames';

const useStyles = makeStyles({
    root: {
        display: 'none'
      },
      display: {
        display: 'block'        
      }
});

const LinearLoader = (props) => {
  const classes = useStyles();

  const displayLoader = classnames(classes.root, { [classes.display]: props.display });

  return (
    <div className={displayLoader}>
      <LinearProgress />
      <br />      
    </div>
  );
};

LinearLoader.propTypes = {
    display: PropTypes.bool.isRequired
}

export default LinearLoader;