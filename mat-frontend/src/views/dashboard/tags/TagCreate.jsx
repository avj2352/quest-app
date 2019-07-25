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
import LinearLoader from './../../../components/loaders/linear-loader/LinearLoader.jsx';
import { createNewTag } from './../../../common/async-requests';

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

const TagCreate = (props) => {
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
    setLoading(true);
    if(tagName && tagDescription) {
      createNewTag({name: tagName.toLowerCase(), description: tagDescription})
      .then( res => {
        setLoading(false);            
        props.onCreateTag('success');
      }, err => {
        setLoading(false);
        console.log('Error updating tag record: ', err);
        props.onCreateTag('failure');
      });          
    }
  };

  const errorMsgText = <Typography className={classes.validationText} component="p">
                            {errMsg}
                        </Typography>;
    
  // render
  return (
    <Grid item xs={12} md={12}>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
      <Typography  variant="h5" component="h2">Create New Tag</Typography>
      <Typography className={classes.pos} color="textSecondary">
        Provide name and description of the tag. The description will be seen as a tooltip
      </Typography>
      {errorMsgText}
      <LinearLoader display={isLoading}/>
      <TextField            
            margin="normal"
            required            
            id="name"
            label="Tag Name"
            name="name"
            defaultValue = {tagName}
            autoFocus
            onBlur={handleChange()}/>
          <TextField            
            margin="normal"
            required
            fullWidth
            name="description"
            label="Provide Description"
            type="description"
            defaultValue = {tagDescription}
            id="description"            
            onBlur={handleChange()}/>
      </CardContent>
      <CardActions className={classes.action}>
        <Button onClick={handleSubmit} disabled={!!errMsg} variant="contained" size="medium" color="primary">Create Tag</Button>        
      </CardActions>
    </Card>
    </Grid>
  );
};

TagCreate.propTypes = {
  onCreateTag: PropTypes.func.isRequired
}

export default TagCreate;