import React from 'react';
import PropTypes from 'prop-types';
// Material
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { useSnackbar } from 'notistack';
// Custom
import SimpleBadge from './../../../components/badges/SimpleBadge.jsx';

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

const TagCard = props => {
    const { classes } = props;
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();

    //snackbar with prompt
    // add multiple actions to one snackbar
    const action = (key) => (
      <React.Fragment>
          <Button onClick={() =>{ 
            closeSnackbar(key);
            props.onDelete({id: props.id, name: props.name, description: props.description}); 
            }}>
              {'Yes'}
          </Button>
          <Button onClick={() => { closeSnackbar(key); }}>
              {'No'}
          </Button>
      </React.Fragment>
    );

    const editTag = () => {
      props.onEdit({id: props.id, name: props.name, description: props.description});
    };

    const deleteTag = () => {
      enqueueSnackbar(`Are you sure you want to delete this tag?`, {variant: 'warning', action});
    }

    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">{props.name}</Typography>
                    <Typography className={classes.pos} component="p">
                        {props.description}
                    </Typography>
                    <SimpleBadge name={props.name} description={props.description} />
                </CardContent>
                <CardActions className={classes.action}>
                  <Fab className={classes.fab} size="small" color="primary" aria-label="Update" onClick={editTag}>
                    <EditIcon/>
                  </Fab>
                  <Fab className={classes.fab} size="small" aria-label="Delete" onClick={deleteTag}>
                    <DeleteIcon/>
                  </Fab>                    
                </CardActions>
            </Card>          
        </Grid>
    );
}

TagCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(TagCard);;