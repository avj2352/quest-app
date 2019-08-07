import React, { useState, useEffect } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
// Custom
import { styles } from './question-admin-style.js';
import QuestionCreateCard from './components/card/QuestionCreateCard.jsx';
import CircularLoader from './../../../components/loaders/circular-loader/CircularLoader.jsx';
import QuestionGroupCard from './components/card/QuestionGroupCard';
import { getAllGroupsWithQuestions } from './../../../common/async-requests';

const QuestionView = props => {
    // states
    const [isLoading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState(null);
    // snackbar
    const { enqueueSnackbar} = useSnackbar();

    const { classes } = props;

    const groupCardList = groupList && groupList.map((el, index) => {
        return <QuestionGroupCard key={index} title={el.title} description={el.description} count={el.questionCount} slug={el.slug}/>
    });

    // componentDidMount
    useEffect(()=>{
        setLoading(true);
        getAllGroupsWithQuestions()
        .then(res => {
            enqueueSnackbar(`Groups loaded successfully`, {variant: 'success'});
            setLoading(false);
            setGroupList(res.data);
        }, err => {
            enqueueSnackbar(`Error loading Groups !`, {variant: 'failure'});
        });
    },[]);

    return (        
        <div className = {classes.root} >
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <QuestionCreateCard/>
                    <Grid item xs={12} md={12} mt={5}>
                    <Typography component="p">Filter Questions based on Groups / Categories</Typography>
                        <CircularLoader display={isLoading}/>                       
                    </Grid>
                    {groupCardList}                    
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(QuestionView);