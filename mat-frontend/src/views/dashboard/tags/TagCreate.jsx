import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  }  
});

const TagCreate = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  //state
  const [tagName, setTagName] = useState('');
  const [description, setDescription] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = prop => event => {
    if(event.target.value !== '') {
        setErrMsg('');
    }
    if (event.target.name === 'email') {            
        setTagName(event.target.value);
    } else {            
        setDescription(event.target.value);
    }        
};

  return (
    <Grid item xs={12} md={12}>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
      <Typography  variant="h5" component="h2">Create New Tag</Typography>
      <Typography className={classes.pos} color="textSecondary">
        Provide name and description of the tag. The description will be seen as a tooltip
      </Typography>
      <TextField            
            margin="normal"
            required            
            id="name"
            label="Tag Name"
            name="name"            
            autoFocus
            onBlur={handleChange()}/>
          <TextField            
            margin="normal"
            required
            fullWidth
            name="description"
            label="Provide Description"
            type="description"
            id="description"            
            onBlur={handleChange()}/>
      </CardContent>
      <CardActions className={classes.action}>
        <Button variant="contained" size="medium" color="primary">Create Tag</Button>
        <Button size="medium" color="primary">Cancel</Button>
      </CardActions>
    </Card>
    </Grid>
  );
};

export default TagCreate;