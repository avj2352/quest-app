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
import { getAllGroupsWithQuestions, getAllTags, postMarkdownRender } from './../../common/async-requests';
import SimpleCard from './components/SimpleCard.jsx';
import DetailCard from './components/DetailCard.jsx';

// CSS
import { styles } from './card-view-style';

const CardListView = props => {
    
    
    const [isLoading, setLoading] = useState(false);
    const [list, setMainList] = useState(null);    
    const [qContent, setQuestionContent] = useState(null);
    const [aContent, setAnswerContent] = useState(null);
    const [cardDetails, setCardDetails] = useState(null);        
    const [tagList, setTagList] = useState(null);        
    const [questionList, setQuestionList] = useState(null);
    const [isQuestionDetails, toggleQuestionDetail] = useState(false);
    //snackBar
    const { enqueueSnackbar} = useSnackbar();
    // styles
    const { classes } = props;
    
    // event handlers and methods
    const filterGroupList = (list, path) => {
        let filteredList = [];
        // console.log('Path and List are: ', path, list);
        if (path !== 'all') {
            filteredList = list.filter(item => {
                return item.slug === path;
            });
        } else {
            filteredList = list;
        }
        // console.log('filtered list is: ', filteredList);
        if (filteredList.length > 0) enqueueSnackbar(`${filteredList.length} Question(s) Loaded...`, {variant: 'info'});
        else enqueueSnackbar(`No Question(s) present in this group yet!`, {variant: 'info'});
        return filteredList;
    };

    const handleBackButtonClick = (status) => {
        toggleQuestionDetail(status);
    };

    const handleCardClick = (data) => {
        setLoading(true);
        console.log('Card was clicked: ', data);
        // render both q&a as html using Promise.all
        const renderQuestionPromise = postMarkdownRender(data.qContent);
        const renderAnswerPromise = postMarkdownRender(data.aContent);        
        Promise.all([renderQuestionPromise, renderAnswerPromise])
        .then(res => {
            setCardDetails(data);
            console.log('Render contents are: ', res);
            setQuestionContent(res[0].data.markdown);
            setAnswerContent(res[1].data.markdown);
            toggleQuestionDetail(prev => !prev);
            setLoading(false);
        })
    };

    // filter questions from groups
    const filterQuestionList = (list) => {
        const result = [];
        list.map(el => {
             el.questions.length > 0 && el.questions.map(temp => {
                const item = {                    
                    id: temp._id,
                    title: temp.title,
                    groupId: el._id,
                    qContent: temp.question,
                    aContent: temp.answer,
                    slug: el.slug,
                    tagList: temp.tags
                };
                result.push(item);
            });
        });
        // console.log('question list is: ', result);
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
            enqueueSnackbar(`${count} Question(s) Loaded...`, {variant: 'info'});
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
        toggleQuestionDetail(false);
        if (list && list.length > 0){            
            const path = window.location.hash.substring(6, window.location.hash.length);            
            const filteredQuestionList = filterQuestionList(list);
            const filteredList = filterGroupList(filteredQuestionList, path);
            setQuestionList(filteredList);
        }
    },[window.location.hash]);

    // listComponent
    const simpleCardList = tagList && questionList && questionList.map(( item, index ) => {
        return <SimpleCard
                key={index}
                id={item.id}
                groupId = {item.groupId}
                slug={item.slug}
                title={item.title}
                tagList={tagList}
                selectedTags={item.tagList}
                qContent={item.qContent}
                aContent={item.aContent}
                onClick={handleCardClick}/>
    });

    // render cardDetailComponent
    const showCardDetails = isQuestionDetails && cardDetails && <DetailCard
                            id={cardDetails.id}
                            title={cardDetails.title}
                            groupId={cardDetails.groupId}
                            slug={cardDetails.slug}
                            selectedTags={cardDetails.selectedTags}
                            qContent = {qContent}
                            aContent = {aContent}
                            onBack = {handleBackButtonClick}/>;
    //render
    return (
        <div className={classes.root}>            
            <CssBaseline />                
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <Grid item xs={12} md={12}>
                        <CircularLoader display={isLoading}/>                    
                    </Grid>
                    {!isQuestionDetails && simpleCardList}
                    {showCardDetails}
                </Grid>
            </div>            
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(CardListView);