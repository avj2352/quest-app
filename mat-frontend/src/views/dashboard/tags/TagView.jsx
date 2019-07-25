/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// Material
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
// Custom
import TagCreate from './TagCreate.jsx';
import TagCard from './TagCard.jsx';
import CircularLoader from './../../../components/loaders/circular-loader/CircularLoader.jsx';
import { getAllTags, deleteTagById } from './../../../common/async-requests';
import TagUpdateModal from './TagUpdateModal.jsx';
// CSS
import { styles } from './tag-edit-style';

const TagView = props => {
    const { classes } = props;

    //state
    const [tagDetails, setTagDetails] = useState(null);
    const [tagValue, setTagValue] = useState({id:'', name: '', description: ''});
    const [isLoading, setLoading] = useState(false);
    const [isModal, setModal] = useState(false);
    //snackBar
    const { enqueueSnackbar} = useSnackbar();
    
    
    const handleTagCreate = (action) => {
        console.log('Action was a: ', action);
        if(action === 'success') {
            enqueueSnackbar(`Tag record created !`, {variant: 'info'});
            refreshTagDetails();
        } else if (action === 'failure') {
            enqueueSnackbar(`Error creating Tag record...`, {variant: 'error'});
        }        
    }

    const handleModalClose = (state, action) => {
        console.log('Action was a: ', action);
        if(action === 'success') {
            enqueueSnackbar(`Tag record updated !`, {variant: 'info'});
            refreshTagDetails();
        } else if (action === 'failure') {
            enqueueSnackbar(`Error updating Tag record...`, {variant: 'error'});
        }
        setModal(state);
    }

    const refreshTagDetails = () => {
        setLoading(true);
        getAllTags()
        .then(res => {
            setTagDetails(res.data);
            setLoading(false);
            enqueueSnackbar(`Tags loaded successfully !`, {variant: 'success'});
        }, err => {
            console.log('Error loading tags', err);
            enqueueSnackbar(`Error loading tags, Please refresh page`, {variant: 'error'});
        });              
    };


    const handleTagEdit = (data) => {
        console.log('Selected Tag detail is: ', data);
        setTagValue(data);
        setModal(true);
    }

    const handleTagDelete = (data) => {
        setLoading(true);
        const deletePromise = deleteTagById(data.id);
        const allTagsPromise = getAllTags();
        deletePromise.then(res => allTagsPromise, err => {
            setLoading(false);
            console.log('Error deleting tag: ', err);
            enqueueSnackbar(`Error deleting Tag: ${data.name}, Please refresh page`, {variant: 'error'});
        }).then(res => {
            setLoading(false);
            setTagDetails(res.data);
            enqueueSnackbar(`Showing new data`, {variant: 'success'});
        }, err => {

        });
        console.log('Tag to be deleted: ', data);        
    }

    // render tagCard list
    const tagCardList = tagDetails && tagDetails.map((el, index) => {
        return (
            <TagCard key={index} id={el._id} name={el.name} description={el.description} onEdit={handleTagEdit} onDelete={handleTagDelete} />
        );
    });

    //componentDidMount
    useEffect(()=>{
         refreshTagDetails();
    },[]);

    //render
    return (
        <div className={classes.root}>            
            <CssBaseline />                
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <TagCreate onCreateTag={handleTagCreate}/>
                    <Grid item xs={12} md={12}>
                        <CircularLoader display={isLoading}/>
                    </Grid>
                    {tagCardList}
                    <TagUpdateModal 
                        id={tagValue.id} 
                        name={tagValue.name} 
                        description={tagValue.description} 
                        open={isModal} 
                        onModalClose={handleModalClose} />
                </Grid>
            </div>            
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(TagView);