import React, { useState, useEffect, useRef, useContext } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

// Custom
import { styles } from './create-question-style.js';
import CircularLoader from '../../../../components/loaders/circular-loader/CircularLoader.jsx';
import ArticleCard from '../components/card/ArticleCard.jsx';
import { createNewArticle, wordCount } from '../../../../common/async-requests';
import { AppContext } from '../../../../common/AppContext.jsx';
import QuestionForm from '../components/form/QuestionForm.jsx';
import MarkDownEditor from './../components/editor/MarkDownEditor.jsx';


const CreateQuestion = props => {
    // context
    const appContext = useContext(AppContext);
    
    // states
    const [isLoading, setLoading] = useState(false);
    const [qContent, setQuestionContent] = useState('');
    const [aContent, setAnswerContent] = useState('');
    const [isQuestionEditor, setQuestionEditor] = useState(true);
    const [isEditor, setEditor] = useState(false);
    const [qLength, setQuestionLength] = useState(0);
    const [aLength, setAnswerLength] = useState(0);
    
    // snackbar
    const { enqueueSnackbar} = useSnackbar();
    const { classes } = props;

    

    // event handlers
    const handleSubmit = (action, data) => {
        setLoading(true);
        // console.log('Data to be submitted is: ', title, selectedGroupList, selectedTagList, questionType);
        const postParam = {
            title: data.title,
            type: data.type,
            question: qContent,
            answer: aContent,
            tags: data.tags,
            groups: data.groups
        };

        // console.log('Post parameters are: ', postParam);

        createNewArticle(postParam)
        .then(res => {
            setLoading(false);
            enqueueSnackbar(`New Article Added !`, {variant: 'info'});
            window.location.href = '#/app';
        }, err => {
            setLoading(false);
            console.log('Error creating new Article: ', err);
            enqueueSnackbar(`Error creating new Article!`, {variant: 'error'});
        });
    };

    // event handlers
    const handleArticleCardClick = (type) => {
        if (type === 'question') {
            setQuestionEditor(true);
        } else {
            setQuestionEditor(false);
        }
        setEditor(prev => !prev);
    };

    const handleArticleCardClear = (type) => {
        if (type === 'question') {
            setQuestionContent('');
            setQuestionLength(0);
            enqueueSnackbar(`Cleared Question content`, {variant: 'info'});
        } else {
            setAnswerContent('');
            setAnswerLength(0);
            enqueueSnackbar(`Cleared Answer content`, {variant: 'info'});
        }
    };

    // event handler
    const handleEditorSubmit = (content, state) => {
        if (isQuestionEditor) {
            enqueueSnackbar(`Updated Question content`, {variant: 'info'});
            setQuestionContent(content);
            setQuestionLength(wordCount(content));
        } else {
            enqueueSnackbar(`Updated Answer content`, {variant: 'info'});
            setAnswerContent(content);
            setAnswerLength(wordCount(content));
        }
        setEditor(state);
    };

    // Question / Answer Card
    const groupCardList = !isEditor && <React.Fragment>
        <ArticleCard key={0} length={qLength} title='Question' onClick={handleArticleCardClick} onClear={handleArticleCardClear}/>
        <ArticleCard key={1} length={aLength} title='Answer' onClick={handleArticleCardClick} onClear={handleArticleCardClear}/>
    </React.Fragment>;    

    return (        
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <QuestionForm 
                        display={!isEditor}
                        title=''
                        header={'Add New Question / Article'} 
                        onSubmit={handleSubmit}/>
                        { groupCardList }
                    <CircularLoader display={isLoading} />
                    <MarkDownEditor content={ isQuestionEditor ? qContent: aContent } display={isEditor} isQuestion={isQuestionEditor} onSubmit={handleEditorSubmit}/>
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(CreateQuestion);