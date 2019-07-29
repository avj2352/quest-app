/**
 * Tag Update Modal Screen
 */
import React, {useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//custom
import LinearLoader from './../../../components/loaders/linear-loader/LinearLoader.jsx';
import { updateTagByName } from './../../../common/async-requests';

export const useStyles = makeStyles(theme => ({    
    validationText: {
      color: 'red'
    }    
  }));


const GroupUpdateModal = props => {
    
    const classes = useStyles();
    // ref
    const nameTextRef = useRef(null);
    const descriptionTextRef = useRef(null);
    const modalRef = useRef(null);
    
    //state
    const [groupTitle, setGroupTitle] = useState(null);
    const [groupSlug, setGroupSlug] = useState(null);
    const [groupDescription, setGroupDescription] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [tagId, setTagId] = useState(props.id);
    const [errMsg, setErrMsg] = useState(null);

    const handleClose = (data)=>{
        props.onModalClose(false, 'cancel');
    };

    const handleCheckboxChange = (evt) => {
      setChecked(evt.target.value);
    }

    const handleSubmit = () => {
        setLoading(true);
        if(groupTitle && groupDescription) {
          updateTagByName({name: props.name, newName: groupTitle, description: groupDescription})
          .then( res => {
            setLoading(false);            
            props.onModalClose(false, 'success');
          }, err => {
            setLoading(false);
            console.log('Error updating tag record: ', err);
            props.onModalClose(false, 'failure');
          });          
        }
    };

    const handleChange = prop => event => {        
        if(event.target.value !== '') {
            setErrMsg(null);
        } else {
            setErrMsg(`Require Tag Name and Description`);
        }
        if (event.target.name === 'name') {
          setGroupTitle(event.target.value);
          setGroupDescription(event.target.value);
        } else {            
        }        
    };

    const errorMsgText = <Typography className={classes.validationText} component="p">
                            {errMsg}
                        </Typography>;
    
    // render
    return (
        <Dialog
        ref={modalRef}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Update Tag Details"}</DialogTitle>
        <DialogContent>
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
            defaultValue = {props.name}
            autoFocus
            onBlur={handleChange()}/>
        <TextField            
            margin="normal"
            required            
            id="slug"
            label="slug (lowercase)"
            name="slug"
            defaultValue = {props.slug}
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
            defaultValue = {props.description}
            onBlur={handleChange()}/>
        <div className={classes.checkBoxContent}>
            <Checkbox
            checked={props.premium}
            onChange={handleCheckboxChange}
            inputProps={{
            'aria-label': 'primary checkbox',
            }} />    
            <Typography className={classes.checkBoxText} variant="button" component="em">
                Check if the Group is only for Premium Users
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={!!errMsg} onClick={handleSubmit} variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={handleClose.bind('cancel')} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
};

GroupUpdateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    onModalClose: PropTypes.func.isRequired
}

export default GroupUpdateModal;