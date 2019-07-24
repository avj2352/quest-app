export const styles = theme => ({
  root: {
    // border: '1px solid red',
    position: 'relative',
    width: '100%',
    display: 'flex',
    marginTop: '5px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: '20px'
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
  }
});