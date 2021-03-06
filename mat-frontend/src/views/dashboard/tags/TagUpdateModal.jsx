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


const TagUpdateModal = props => {
    
    const classes = useStyles();
    // ref
    const nameTextRef = useRef(null);
    const descriptionTextRef = useRef(null);
    const modalRef = useRef(null);
    
    //state
    const [tagName, setTagName] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [tagDescription, setTagDescription] = useState(null);
    const [tagId, setTagId] = useState(props.id);
    const [errMsg, setErrMsg] = useState(null);

    const handleClose = (data)=>{
        props.onModalClose(false, 'cancel');
    };

    const handleSubmit = () => {
        setLoading(true);
        if(tagName && tagDescription) {
          updateTagByName({name: props.name, newName: tagName.toLowerCase(), description: tagDescription})
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
            setTagName(event.target.value);
        } else {            
            setTagDescription(event.target.value);
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
            {errorMsgText}
            <LinearLoader display={isLoading}/>
        <TextField
            margin="normal"
            required
            ref={nameTextRef}
            defaultValue={props.name}
            label="Tag Name"
            name="name"            
            autoFocus                 
            onBlur={handleChange()}/>
          <TextField            
            margin="normal"
            required
            ref={descriptionTextRef}
            fullWidth
            name="description"
            label="Provide Description"
            type="description"
            defaultValue={props.description}
            id="description"            
            onBlur={handleChange()}/>
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

TagUpdateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired
}

export default TagUpdateModal;