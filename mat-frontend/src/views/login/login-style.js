import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    imgLogo: {
      width: '40%',
      borderRadius: '15px'
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      // width: '12px',
      top: '22%',
      left: '100px',
      zIndex: 1,
    },
    validationText: {
      color: 'red'
    },
    progress: {
      flexGrow: 1,
      width:'100%'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));