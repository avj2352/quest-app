import React from 'react';
import PropTypes from 'prop-types';
// Materials
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import FilterIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';

const styles = theme => ({
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
    chip: {
        margin: theme.spacing(1),
    },
    row: {
      // border:'1px solid red',
      justifyContent: 'space-between',
      display: 'flex',
      width: '100%'
    },
    pos: {
      textAlign: 'left',
      marginBottom: 12,
      fontSize: 18
    },
    action: {
      display: 'flex',
      // border: '1px solid red',
      justifyContent: 'flex-end'
    },
    fab: {
      margin: '0 10px'
    }
  });

const QuestionFilterCard = props => {
    const { classes } = props;
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();

    // add multiple actions to one snackbar
    const action = (key) => (
      <React.Fragment>
          <Button onClick={() =>{ 
            closeSnackbar(key);
            props.onDelete(props.id);
            }}>
              {'Yes'}
          </Button>
          <Button onClick={() => { closeSnackbar(key); }}>
              {'No'}
          </Button>
      </React.Fragment>
    );

    const handleEdit = () => {        
        props.onEdit(props.id);
    }

    const handleDelete = () => {        
      enqueueSnackbar(`Are you sure you want to delete this question / article ?`, {variant: 'warning', action});
    }

    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.row}>
                      <Typography variant="h5" component="h2">{props.title}</Typography>                      
                    </div>
                    <Typography className={classes.pos} component="p">{props.type}</Typography>
                    
                </CardContent>
                <CardActions className={classes.action}>
                  <Fab disabled={props.count === 0} className={classes.fab} size="small" color="primary" aria-label="Group" onClick={handleEdit}>
                    <EditIcon/>
                  </Fab>
                  <Fab disabled={props.count === 0} className={classes.fab} size="small" aria-label="Group" onClick={handleDelete}>
                    <DeleteIcon/>
                  </Fab>
                </CardActions>
            </Card>          
        </Grid>
    );
}

QuestionFilterCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,   
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(QuestionFilterCard);