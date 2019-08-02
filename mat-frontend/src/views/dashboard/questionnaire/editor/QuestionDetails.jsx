import React, { useState, useEffect, useRef } from 'react';
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
import QuestionCreate from './../QuestionCreate.jsx';
import CircularLoader from './../../../../components/loaders/circular-loader/CircularLoader.jsx';
import ArticleCard from './ArticleCard.jsx';
import { getAllGroupsWithQuestions } from './../../../../common/async-requests';

const QuestionView = props => {
    // states
    const [isLoading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState(null);
    const [errorMsg, setErrMsg] = useState(null);
    const [title, setTitle] = useState(null);
    
    // snackbar
    const { enqueueSnackbar} = useSnackbar();

    const { classes } = props;

    const handleChange = prop => event => {
        if(event.target.value !== '') {
            setErrMsg(null);
          } else {
            setErrMsg(`Require Tag Name and Description`);
          }  
          if (event.target.name === 'name') {
              setTitle(event.target.value);
          }
    };    

    

    // Question / Answer Card
    const groupCardList = <React.Fragment>
        <ArticleCard key={0} title='Question' slug={`/question`}/>
        <ArticleCard key={1} title='Answer' slug={`/answer`}/>
    </React.Fragment>;    

    // componentDidMount
    useEffect(()=>{
        setLoading(true);        
    },[]);

    return (        
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
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
                                        <OutlinedDropDown label="Type"/>
                                    </Grid>
                                    <Grid item xs={12} md={4}>        
                                        <OutlinedDropDown label="Category"/>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <OutlinedDropDown label="Tags"/>
                                    </Grid>
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
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.action}>
                                <Button variant="contained" size="medium" color="primary">Submit</Button>
                                <Button size="medium" color="primary">Cancel</Button>
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