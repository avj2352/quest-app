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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
//CSS in JS
import { styles } from './header-style';
import { AppContext } from '../../common/AppContext';

const Header = props => {
    const appContext = useContext(AppContext);
    const { classes, open } = props;
    return(
        <AppBar          
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
            
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
            </div>

            <IconButton edge="end" color="inherit" className={classes.sideButton}>
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