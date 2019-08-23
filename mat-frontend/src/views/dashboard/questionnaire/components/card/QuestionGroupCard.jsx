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
// Custom
import SimpleBadge from '../../../../../components/badges/SimpleBadge.jsx';
import CircularBadge from '../../../../../components/badges/CircularBadge.jsx';

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

const QuestionGroupCard = props => {
    const { classes } = props;

    const filterUsingGroup = () => {
        console.log('Filtering Questions on Group: ', props.id);
        props.onFilter(props.title, props.list);
    }

    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.row}>
                      <Typography variant="h5" component="h2">{props.title}</Typography>
                      <CircularBadge count={props.count} />
                    </div>
                    <Typography className={classes.pos} component="p">
                        {props.description}
                    </Typography>     
                    
                </CardContent>
                <CardActions className={classes.action}>
                  <Fab disabled={props.count === 0} className={classes.fab} size="small" color="primary" aria-label="Group" onClick={filterUsingGroup}>
                    <FilterIcon/>
                  </Fab>                  
                </CardActions>
            </Card>          
        </Grid>
    );
}

QuestionGroupCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  list: PropTypes.array,
  onFilter: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(QuestionGroupCard);