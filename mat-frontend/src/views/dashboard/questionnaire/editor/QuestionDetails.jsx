import React, { useState, useEffect, useRef, useContext } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Custom
import { styles } from './question-editor-style.js';
import OutlinedDropDown from './../../../../components/dropdowns/OutlinedDropDown.jsx';
import ActionableBadge from './../../../../components/badges/ActionableBadge.jsx';
import QuestionCreate from './../QuestionCreate.jsx';
import CircularLoader from './../../../../components/loaders/circular-loader/CircularLoader.jsx';
import ArticleCard from './ArticleCard.jsx';
import { getAllGroups, getAllTags } from './../../../../common/async-requests';
import { AppContext } from './../../../../common/AppContext.jsx';
import { createNewArticle } from './../../../../common/async-requests';


const QuestionView = props => {
    // context
    const appContext = useContext(AppContext);
    
    // states
    const [isLoading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [tagList, setTagList] = useState(null);
    const [typeList, setTypeList] = useState([{display: 'Question', value: 'question'}, {display: 'Article', value: 'article'}]);
    const [selectedGroupList, setSelectedGroupList] = useState(null);
    const [questionType, setQuestionType] = useState(null);
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [errorMsg, setErrMsg] = useState(null);
    const [title, setTitle] = useState('');
    
    // snackbar
    const { enqueueSnackbar} = useSnackbar();
    const { classes } = props;

    // event handlers
    const handleChange = prop => event => {
        if(event.target.value !== '') {
            setErrMsg(null);
            setTitle(event.target.value);
          } else {
            setTitle('');
            setErrMsg(`Require Tag Name and Description`);
          }          
    };    

    const handleTagDelete = id => {
        console.log('Tag to be deleted', id);
        setSelectedTagList(prev => {
            return prev.splice(0, prev.indexOf(id));
        });
    }

    const handleTypeSelect = (data) => {        
        setQuestionType(data);
    }

    const handleGroupSelect = (data) => {
        setSelectedGroupList([data]);
    }

    const handleTagSelect = (data) => {
        console.log('Selected Tag is: ', data);
        setSelectedTagList(prev => {
            return [...prev, data];
        });
    }

    const handleSubmit = () => {
        setLoading(true);
        // console.log('Data to be submitted is: ', title, selectedGroupList, selectedTagList, questionType);
        const postParam = {
            title: title,
            type: questionType,
            question: '',
            answer: '',
            tags: selectedTagList,
            groups: selectedGroupList
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

    // renders
    const cancelableBadges = (selectedTagList.length > 0) && selectedTagList.map((el, index) => {
        const tempList = tagList.filter(item => {
            return item.value === el;
        });
        return <ActionableBadge 
            key={index} 
            id={el} 
            name={tempList[0].display} 
            description={tempList[0].display} 
            onDelete={handleTagDelete}/>
    });
    

    // Question / Answer Card
    const groupCardList = <React.Fragment>
        <ArticleCard key={0} title='Question' slug={`/question`}/>
        <ArticleCard key={1} title='Answer' slug={`/answer`}/>
    </React.Fragment>;    

    // componentDidMount
    useEffect(()=>{        
        setLoading(true);
        const allTagPromise = getAllTags();
        const allGroupPromise = getAllGroups();
        allTagPromise.then(res => {
            const dataOneList = res.data.map(el => {
                return {
                    display: el.name,
                    value: el._id
                };
            });
            setTagList(dataOneList);
            // console.log('Tag List is: ', dataOneList);
            return allGroupPromise;
        }, err => {
            setLoading(false);
            console.log('Error loading Tags', err);
            enqueueSnackbar(`Error loading Tags!`, {variant: 'error'});
        }).then( res1 => {
            const dataTwoList = res1.data.map(el => {
                return {
                    display: el.title,
                    value: el._id
                };
            });
            setGroupList(dataTwoList);
            // console.log('Group List is: ', dataTwoList);
            enqueueSnackbar(`Dropdown options loaded successfully !`, {variant: 'success'});
            setLoading(false);
        }, err => {
            setLoading(false);
            enqueueSnackbar(`Error loading Groups!`, {variant: 'error'});
        });         
    },[]);

    return (        
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <Grid className={classes.gridContainer} item xs={12} md={12}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h5" component="h2">Add New Article / Question</Typography>
                                <Typography component="p" className={classes.pos} color="textSecondary">
                                    Please fill in all the details below:
                                </Typography>   
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <TextField 
                                            fullWidth 
                                            margin="normal" 
                                            required 
                                            id="name" 
                                            label="Enter Title" 
                                            name="name" 
                                            autoFocus
                                            onBlur={handleChange()} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        {typeList && <OutlinedDropDown label="Type" options={typeList} onSelect={handleTypeSelect}/>}
                                    </Grid>
                                    <Grid item xs={12} md={4}>        
                                        {groupList && <OutlinedDropDown label="Category" options={groupList} onSelect={handleGroupSelect}/>}
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        {tagList && <OutlinedDropDown label="Tags" options={tagList} onSelect={handleTagSelect}/>}
                                    </Grid>
                                    <Grid className={classes.editTagContent} item xs={12} md={12}>
                                        {cancelableBadges}
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.action}>
                                <Button disabled={title === '' || selectedTagList.length === 0 || selectedGroupList.length === 0} 
                                        variant="contained" 
                                        onClick={handleSubmit}
                                        size="medium" 
                                        color="primary" >Submit</Button>
                                {/* <Button size="medium" color="primary">Cancel</Button> */}
                            </CardActions>
                        </Card>
                    </Grid>                    
                    {groupCardList}
                    <CircularLoader display={isLoading} />
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(QuestionView);