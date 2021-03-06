import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// custom
import LinearLoader from './../../../components/loaders/linear-loader/LinearLoader.jsx';
import { createNewGroup } from './../../../common/async-requests';

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
  checkBoxContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
  },
  checkBoxText: {
    position: 'relative',
    top: '10px'
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

const GroupCreate = (props) => {
  const classes = useStyles();

  // state
  const [groupTitle, setGroupTitle] = useState('');
  const [groupSlug, setGroupSlug] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isChecked, setCheckBox] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');


  // event handlers
  const handleCheckboxChange = name => event => {
    setCheckBox(event.target.checked);
  };

  const handleChange = prop => event => {
    if(event.target.value !== '') {
      setErrMsg(null);
    } else {
      setErrMsg(`Please fill in missing fields`);
    }  
    if (event.target.name === 'title') {
        setGroupTitle(event.target.value);
    } else if (event.target.name === 'slug') {
        setGroupSlug(event.target.value.toLowerCase());
    } else {            
        setGroupDescription(event.target.value);
    }        
  };

  const handleSubmit = () => {
    setLoading(true);
    if(groupTitle && groupDescription && groupSlug) {
        console.log('Input data is: ', groupTitle, groupSlug, groupDescription, isChecked);
        createNewGroup({name:groupTitle, slug: groupSlug.toLowerCase(), description: groupDescription, premium: isChecked})
        .then(res => {
          setLoading(false);
          props.onCreateGroup('success');
        }, err => {
          setLoading(false);
          props.onCreateGroup('failure');
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
      <Typography  variant="h5" component="h2">Create New Group / Category</Typography>
      <Typography className={classes.pos} color="textSecondary">
        All Fields are required to be filled in*
      </Typography>
      {errorMsgText}
      <LinearLoader display={isLoading}/>
        <TextField            
            margin="normal"
            required            
            id="title"
            label="Group Title"
            name="title"
            defaultValue = {groupTitle}
            autoFocus
            onBlur={handleChange()}/>
        <TextField            
            margin="normal"
            required            
            id="slug"
            label="slug (lowercase)"
            name="slug"
            defaultValue = {groupSlug}
            autoFocus
            onBlur={handleChange()}/>
        <TextField            
            margin="normal"
            required
            fullWidth
            id="description"            
            name="description"
            label="Provide Description"
            type="description"
            defaultValue = {groupDescription}
            onBlur={handleChange()}/>
        <div className={classes.checkBoxContent}>
            <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange('checkedA')}        
            inputProps={{
            'aria-label': 'primary checkbox',
            }} />    
            <Typography className={classes.checkBoxText} variant="button" component="em">
                Check if the Group is only for Premium Users
            </Typography>        
        </div>
      </CardContent>
      <CardActions className={classes.action}>
        <Button onClick={handleSubmit} disabled={!!errMsg} variant="contained" size="medium" color="primary">Create Group</Button>        
      </CardActions>
    </Card>
    </Grid>
  );
};

GroupCreate.propTypes = {
  onCreateGroup: PropTypes.func.isRequired
}

export default GroupCreate;