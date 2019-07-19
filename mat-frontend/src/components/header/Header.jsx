import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
//Material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
//CSS in JS
import { styles } from './header-style';
import { AppContext } from '../../common/AppContext';

const Header = props => {
    const appContext = useContext(AppContext);
    const { classes, open } = props;
    return(
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar disableGutters={!open}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {`${appContext.title} (v${appContext.version})`}
            </Typography>
            <IconButton 
            edge="end"
            color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired
};


export default withStyles(styles, { withTheme: true })(Header);