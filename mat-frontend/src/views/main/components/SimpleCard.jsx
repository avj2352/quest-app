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
import SimpleBadge from '../../../components/badges/SimpleBadge.jsx';
import { showIcon } from './../../../components/sidebar/sidebar-icons';

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
    titleRow: {
      display: 'flex'
    },
    titleIcon: {
      // border: '1px solid red',
      marginTop: '3px',
      color: 'orange',
      paddingRight: '10px',      
      position: 'relative',      
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

const SimpleCard = props => {
    const { classes } = props;
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();

    // event handlers
    const handleClick = () => {
      props.onClick({id: props.id });
    };
    
    // render icon
    const icon = props.slug ? <div className={classes.titleIcon}>{showIcon(props.slug)}</div> : <React.Fragment></React.Fragment>;

    // renders
    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.titleRow}>
                      { icon }
                      <Typography variant="h5" component="h2">{props.title}</Typography>
                    </div>
                    <Typography className={classes.pos} component="p">
                        {`${props.content.substring(0,50)}....`}
                    </Typography>
                    {/* <SimpleBadge name={props.name} description={props.description} /> */}
                </CardContent>
                <CardActions className={classes.action}>
                <Button onClick={handleClick} size="medium" color="primary">Details</Button>                
                </CardActions>
            </Card>          
        </Grid>
    );
}

SimpleCard.propTypes = {
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagList: PropTypes.array,
    selectedTags: PropTypes.array,
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired    
};

export default withStyles(styles, { withTheme: true })(SimpleCard);;