import deepPurple from '@material-ui/core/colors/deepPurple';

export const drawerWidth = 240;

export const styles = theme => ({    
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    avatar: {
      border: '2px solid white',
      backgroundColor: deepPurple[500],
    },   
});