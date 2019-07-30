import React, { useState, useEffect } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// Custom
import { styles } from './question-edit-style';
import QuestionCreate from './QuestionCreate.jsx';
import CircularLoader from './../../../components/loaders/circular-loader/CircularLoader.jsx';
import QuestionGroupCard from './QuestionGroupCard.jsx';
import { getAllGroupsWithQuestions } from './../../../common/async-requests';

const QuestionView = props => {
    // states
    const [isLoading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState(null);

    const { classes } = props;

    const groupCardList = groupList && groupList.map((el, index) => {
        return <QuestionGroupCard key={index} title={el.title} description={el.description} count={el.questionCount} slug={el.slug}/>
    });

    // componentDidMount
    useEffect(()=>{
        setLoading(true);
        getAllGroupsWithQuestions()
        .then(res => {
            console.log('Result is: ', res.data);
            setLoading(false);
            setGroupList(res.data);
        });
    },[]);

    return (        
        <div className = {classes.root} >
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <QuestionCreate/>
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