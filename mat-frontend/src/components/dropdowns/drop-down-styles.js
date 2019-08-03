export const styles = theme => ({
    root: {
      // border: '1px solid red',
      position: 'relative',
      width: '100%',
      display: 'flex',
      marginTop: '15px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexGrow: 1,
      paddingBottom: '20px'
    },  
    dropDown: {
      display: 'flex',
      width: '100%'
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 175,
    },
    cardContent: {
      width: '90%',
      marginTop: '30px',
      alignSelf: 'center'
    },
    paper: {
      padding: theme.spacing(6),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 175,
      },
      cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        textAlign: 'left',
        marginBottom: 12,
      },
      action: {
        display: 'flex',
        // border: '1px solid red',
        justifyContent: 'flex-end'
      },
      validationText: {
        color: 'red'
      }
  });