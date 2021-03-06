export const drawerWidth = 240;

export const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    // border: '1px solid blue',
    width: '100%',
    position:'relative',
    top:'5vh',
    left:'-4vw',
    display:'flex',
    justifyContent:'center',
    // alignItems: 'center',
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -190,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
      left:'-6vw',
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

});