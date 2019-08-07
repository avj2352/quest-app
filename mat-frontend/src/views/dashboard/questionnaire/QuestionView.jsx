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
import QuestionFilterCard from './components/card/QuestionFilterCard';
import { getAllGroupsWithQuestions } from './../../../common/async-requests';

const QuestionView = props => {
    // states
    const [isLoading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState(null);
    const [title, setGroupTitle] = useState('');
    const [questionsList, setQuestionList] = useState(null);
    const [isQuestionList, toggleQuestionGroupList] = useState(false);
    // snackbar
    const { enqueueSnackbar} = useSnackbar();
    // event handlers
    const handleGroupQuestionFilter = (title, list) => {
        setGroupTitle(title);
        setQuestionList(list);
        toggleQuestionGroupList(prev => !prev);
    }
    // event handlers
    const handleQuestionEdit = (id) => {
        console.log('Editing Question details: ', id);
        window.location.href = `#/app/editor?q=edit&id=${id}`;
    }
    // event handlers
    const handleQuestionDelete = (id) => {
        console.log('Deleting Question details: ', id);
    }

    const { classes } = props;

    const filterQuestionList = questionsList && questionsList.map((el, index) => {
        return <QuestionFilterCard key={index} id={el._id} title={el.title} type={el.type} onEdit={handleQuestionEdit} onDelete={handleQuestionDelete}/>
    });

    const groupCardList = groupList && groupList.map((el, index) => {
        return <QuestionGroupCard key={index} id={el._id} title={el.title} description={el.description} list={el.questions} count={el.questionCount} slug={el.slug} onFilter={handleGroupQuestionFilter}/>
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
                    <Typography component="p" color="textSecondary">
                        {!isQuestionList && `Filter Questions based on Groups / Categories`}
                        {isQuestionList && `Questions / Articles under ${title}`}
                    </Typography>
                        <CircularLoader display={isLoading}/>                       
                    </Grid>
                    {!isQuestionList && groupCardList}
                    {isQuestionList && filterQuestionList}
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(QuestionView);