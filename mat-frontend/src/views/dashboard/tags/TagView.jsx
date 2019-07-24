import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// CSS
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { styles } from './tag-edit-style';
import TagCreate from './TagCreate.jsx';
import TagCard from './TagCard.jsx';
import CircularLoader from './../../../components/loaders/circular-loader/CircularLoader.jsx';
import { getAllTags } from './../../../common/async-requests';
import { useSnackbar } from 'notistack';
import TagUpdateModal from './TagUpdateModal.jsx';

const TagView = props => {
    const { classes } = props;

    //state
    const [tagDetails, setTagDetails] = useState(null);
    const [tagValue, setTagValue] = useState({id:'', name: '', description: ''});
    const [isLoading, setLoading] = useState(false);
    const [isModal, setModal] = useState(false);
    //snackBar
    const { enqueueSnackbar} = useSnackbar();
    
    

    const handleModalClose = (state, action) => {
        console.log('Action was a: ', action);
        setModal(state);
    }

    const handleTagEdit = (data) => {
        console.log('Selected Tag detail is: ', data);
        setTagValue(data);
        setModal(true);
    }

    const handleTagDelete = (data) => {
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
        getAllTags()
        .then(res => {
            setTagDetails(res.data);
            setLoading(false);
            enqueueSnackbar(`Tags loaded successfully !`, {variant: 'success'});
        }, err => {
            console.log('Error loading tags', err);
            enqueueSnackbar(`Error loading tags, Please refresh page`, {variant: 'error'});
        });                
    },[]);

    //render
    return (
        <div className={classes.root}>            
            <CssBaseline />                
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <TagCreate/>
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