import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// custom
import LinearLoader from '../../../../../components/loaders/linear-loader/LinearLoader.jsx';
import { createNewTag } from '../../../../../common/async-requests';

const useStyles = makeStyles({
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

const QuestionCreateCard = (props) => {
  const classes = useStyles();  

  //state
  const [tagName, setTagName] = useState('');
  const [tagDescription, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleChange = prop => event => {
    if(event.target.value !== '') {
      setErrMsg(null);
    } else {
      setErrMsg(`Require Tag Name and Description`);
    }  
    if (event.target.name === 'name') {
        setTagName(event.target.value);
    } else {            
        setDescription(event.target.value);
    }        
  };

  const handleSubmit = () => {
    window.location.href = '#/app/editor?q=add';
  };
  
    
  // render
  return (
    <Grid item xs={12} md={12}>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
      <Typography  variant="h5" component="h2">Create New Article / Question</Typography>
      <Typography className={classes.pos} color="textSecondary">
        You can click the below button to create an Article / Question record. Or filter questions / articles based on the "groups / categories" to update / delete them.
      </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button onClick={handleSubmit} disabled={!!errMsg} variant="contained" size="medium" color="primary">Add New Question</Button>        
      </CardActions>
    </Card>
    </Grid>
  );
};

export default QuestionCreateCard;