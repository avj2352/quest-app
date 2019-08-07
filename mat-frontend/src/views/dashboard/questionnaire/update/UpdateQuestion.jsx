import React, { useState, useEffect, useRef, useContext } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

// Custom
import { styles } from './update-question-style.js';
import CircularLoader from '../../../../components/loaders/circular-loader/CircularLoader.jsx';
import ArticleCard from '../components/card/ArticleCard.jsx';
import { createNewArticle } from '../../../../common/async-requests';
import { AppContext } from '../../../../common/AppContext.jsx';
import QuestionForm from '../components/form/QuestionForm.jsx';


const UpdateQuestion = props => {
    // context
    const appContext = useContext(AppContext);
    
    // states
    const [isLoading, setLoading] = useState(false);                
    
    // snackbar
    const { enqueueSnackbar} = useSnackbar();
    const { classes } = props;

    const handleSubmit = (action, data) => {
        setLoading(true);
        // console.log('Data to be submitted is: ', title, selectedGroupList, selectedTagList, questionType);
        const postParam = {
            title: data.title,
            type: data.questionType,
            question: '',
            answer: '',
            tags: data.selectedTagList,
            groups: data.selectedGroupList
        };

        createNewArticle(postParam)
        .then(res => {
            setLoading(false);
            enqueueSnackbar(`New Article Added !`, {variant: 'info'});
            window.location.href = '#/app/admin?g=questions';
        }, err => {
            setLoading(false);
            console.log('Error creating new Article: ', err);
            enqueueSnackbar(`Error creating new Article!`, {variant: 'error'});
        });
    }

    // Question / Answer Card
    const groupCardList = <React.Fragment>
        <ArticleCard key={0} title='Question' slug={`/question`}/>
        <ArticleCard key={1} title='Answer' slug={`/answer`}/>
    </React.Fragment>;    

    return (        
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <QuestionForm 
                        display={true} 
                        title={'Update Question / Article'}
                        onSubmit={()=>console.log('Submitted')}/>                        

                        { groupCardList }
                    <CircularLoader display={isLoading} />
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(UpdateQuestion);