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

const TagView = props => {
    const { classes } = props;

    //state
    const [tagDetails, setTagDetails] = useState(null);
    const [isLoading, setLoading] = useState(true);
    //snackBar
    const { enqueueSnackbar} = useSnackbar();
    
    // render tagCard list
    const tagCardList = tagDetails && tagDetails.map((el, index) => {
        return (
            <TagCard key={index} id={el._id} name={el.name} description={el.description}/>
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
                </Grid>
            </div>            
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(TagView);