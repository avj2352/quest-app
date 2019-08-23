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
import { updateArticleRecordById, wordCount } from '../../../../common/async-requests';
import { AppContext } from '../../../../common/AppContext.jsx';
import QuestionForm from '../components/form/QuestionForm.jsx';
import MarkDownEditor from './../components/editor/MarkDownEditor.jsx';
import { getArticleDetailsById } from './../../../../common/async-requests';


const UpdateQuestion = props => {
    // context
    const appContext = useContext(AppContext);
    
    // states
    const [isLoading, setLoading] = useState(false);
    const [qID, setQuestionId] = useState(null);
    const [details, setQuestionDetails] = useState(null);
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
        
        const postParam = {
            title: data.title,
            type: data.type,
            question: qContent,
            answer: aContent,
            tags: data.tags,
            groups: data.groups
        };

        console.log('Update parameters are: ', postParam);

        updateArticleRecordById(postParam, qID)
        .then(res => {
            setLoading(false);
            enqueueSnackbar(`Article updated !`, {variant: 'info'});
            window.location.href = '#/app/admin?g=questions';
        }, err => {
            setLoading(false);
            console.log('Error updating Article: ', err);
            enqueueSnackbar(`Error updating Article !`, {variant: 'error'});
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

    // componentDidMount
    useEffect(()=>{
        setLoading(true);
        const idPath = window.location.hash.indexOf('id=');
        const pathLength = window.location.hash.length;
        console.log('ID: ', window.location.hash.substring(idPath+3, pathLength));
        const qID = window.location.hash.substring(idPath+3, pathLength);
        setQuestionId(qID);
        getArticleDetailsById(qID)
        .then( res => {
            setLoading(false);
            console.log('Question details: ', res.data);
            setQuestionDetails(res.data);
            if (res.data.question && res.data.question !=='') {
                setQuestionContent(res.data.question);
                setQuestionLength(wordCount(res.data.question));
            }
            if (res.data.answer && res.data.answer !== '') {
                setAnswerContent(res.data.answer);
                setAnswerLength(wordCount(res.data.answer));
            }
        });
    },[]);

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
                    {details && <QuestionForm
                        title={details.title ? details.title : ''}
                        pType={details.type ? details.type : null}
                        pGroups={details.groups ? details.groups[0].title : null}
                        display={!isEditor}
                        header={'Update Question / Article'} 
                        onSubmit={handleSubmit}/>}
                        { groupCardList }
                    <CircularLoader display={isLoading} />
                    <MarkDownEditor content={ isQuestionEditor ? qContent: aContent } display={isEditor} isQuestion={isQuestionEditor} onSubmit={handleEditorSubmit}/>
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(UpdateQuestion);