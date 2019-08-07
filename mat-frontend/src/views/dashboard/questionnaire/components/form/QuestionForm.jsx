import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { styles } from './question-form-style.js';
import OutlinedDropDown from './../../../../../components/dropdowns/OutlinedDropDown.jsx';
import ActionableBadge from './../../../../../components/badges/ActionableBadge.jsx';
import { getAllGroups, getAllTags } from './../../../../../common/async-requests';

const QuestionForm = props => {
    const { classes, display } = props;
    const { enqueueSnackbar} = useSnackbar();
    // state    
    const [groupList, setGroupList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [title, setTitle] = useState(props.title);
    const [isLoading, setLoading] = useState(false);
    const [typeList, setTypeList] = useState([{display: 'Question', value: 'question'}, {display: 'Article', value: 'article'}]);
    const [selectedGroupList, setSelectedGroupList] = useState(null);
    const [questionType, setQuestionType] = useState(null);
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [errorMsg, setErrMsg] = useState(null);

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

    const handleTypeSelect = (data) => {        
        setQuestionType(data);
    };

    const handleGroupSelect = (data) => {
        console.log('Selected group is: ', [data]);
        setSelectedGroupList([data]);
    };

    const handleTagDelete = id => {
        console.log('Tag to be deleted', id);
        setSelectedTagList(prev => {
            return prev.splice(0, prev.indexOf(id));
        });
    }

    const handleTagSelect = (data) => {
        console.log('Selected Tag is: ', data);
        setSelectedTagList(prev => {
            return [...prev, data];
        });
    };

    const handleSubmit = () => {
        const postParam = {
            title: title,
            type: questionType,
            question: '',
            answer: '',
            tags: selectedTagList,
            groups: selectedGroupList
        };
        // bubble up
        props.onSubmit(props.type, postParam);
    };
    
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

    // render
    return (
        display && <React.Fragment>
        <Grid className={classes.gridContainer} item xs={12} md={12}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h5" component="h2">{props.title}</Typography>
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
                        </CardActions>
                    </Card>
                </Grid>
    </React.Fragment>
    );
}


QuestionForm.propTypes = {    
    display: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,    
};

export default withStyles(styles, { withTheme: true })(QuestionForm);