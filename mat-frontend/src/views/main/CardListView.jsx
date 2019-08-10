/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// Material
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
// Custom

import TagCard from './../dashboard/tags/TagCard.jsx';
import CircularLoader from './../../components/loaders/circular-loader/CircularLoader.jsx';
import { getAllTags, deleteTagById } from './../../common/async-requests';
// CSS
import { styles } from './card-view-style';

const CardListView = props => {
    const { classes } = props;

    
    const [isLoading, setLoading] = useState(false);    
    //snackBar
    const { enqueueSnackbar} = useSnackbar();
    
    
    

    //componentDidMount
    useEffect(()=>{
         
    },[]);

    //render
    return (
        <div className={classes.root}>            
            <CssBaseline />                
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <Grid item xs={12} md={12}>
                        <CircularLoader display={isLoading}/>                    
                    </Grid>
                    {}
                </Grid>
            </div>            
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(CardListView);