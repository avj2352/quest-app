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
import { getAllGroupsWithQuestions, getAllTags } from './../../common/async-requests';
import SimpleCard from './components/SimpleCard.jsx';

// CSS
import { styles } from './card-view-style';

const CardListView = props => {
    
    
    const [isLoading, setLoading] = useState(false);
    const [list, setMainList] = useState(null);
    const [tagList, setTagList] = useState(null);
    const [groupList, setGroupList] = useState(null);
    const [questionList, setQuestionList] = useState(null);
    //snackBar
    const { enqueueSnackbar} = useSnackbar();
    // styles
    const { classes } = props;
    
    // event handlers and methods
    const filterGroupList = (list, path) => {
        return list;
    };

    const handleCardClick = () => {
        console.log('Card was clicked');
    };

    // filter questions from groups
    const filterQuestionList = (list) => {
        const result = [];
        const fList = list.map(el => {
             el.questions.length > 0 && el.questions.map(temp => {
                const item = {                    
                    id: temp._id,
                    title: temp.title,
                    groupId: el._id,
                    content: temp.question,
                    slug: el.slug,
                    tagList: temp.tags
                };
                result.push(item);
            });
        });
        console.log('question list is: ', result);
        return result;
    };


    const refreshCardList = () => {
        let filteredQuestionList;
        let count;
        setLoading(true);
        let allGroupQuestionPromise = getAllGroupsWithQuestions();
        let allTagPromise = getAllTags();
        allGroupQuestionPromise
        .then( res => {
            // console.log('Loaded group list', res.data);
            setMainList(res.data);
            filteredQuestionList = filterQuestionList(res.data);
            count = filteredQuestionList.length;
            setQuestionList(filteredQuestionList);
            return allTagPromise;            
        }, err => {
            setLoading(false);
            console.log('Error loading questions', err);
            enqueueSnackbar(`Error loading questions...`, {variant: 'error'});
        }).then( res2 => {
            // console.log('Loaded tag list', res2.data);
            setTagList(res2.data);
            setLoading(false);
            enqueueSnackbar(`${count} Questions Loaded...`, {variant: 'info'});
        }, err => {
            setLoading(false);
            console.log('Error loading tags', err);
            enqueueSnackbar(`Error loading tags...`, {variant: 'error'});
        });
    }

    // componentDidMount
    useEffect(()=>{
        refreshCardList();
    },[]);
        
    // componentDidUpdate
    useEffect(()=>{
        if (list && list.length > 0){
            const filteredList = filterGroupList(list, window.location.hash);
            setGroupList(filteredList);
            const filteredQuestionList = filterQuestionList(filteredList);
            setQuestionList(filteredQuestionList);
        }
    },[window.location.hash]);

    // listComponent
    const simpleCardList = tagList && questionList && questionList.map(( item, index ) => {
        return <SimpleCard
                key={index}
                id={item.id}
                slug={item.slug}
                title={item.title}
                tagList={tagList}
                selectedTags={item.tags}
                content={item.content}
                onClick={handleCardClick}/>
    });

    //render
    return (
        <div className={classes.root}>            
            <CssBaseline />                
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <Grid item xs={12} md={12}>
                        <CircularLoader display={isLoading}/>                    
                    </Grid>
                    {simpleCardList}
                </Grid>
            </div>            
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(CardListView);