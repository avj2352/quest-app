import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// Materials
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import FilterIcon from '@material-ui/icons/FilterList';
// Custom
import SimpleBadge from './../../../../../components/badges/SimpleBadge.jsx';
import CircularBadge from '../../../../../components/badges/CircularBadge.jsx';
import { AppContext } from '../../../../../common/AppContext.jsx';

const styles = theme => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 175,
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      flexGrow: 1
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    chip: {
        margin: theme.spacing(1),
    },
    row: {
      // border:'1px solid red',
      justifyContent: 'space-between',
      display: 'flex',
      width: '100%'
    },
    pos: {
      textAlign: 'left',
      marginBottom: 12,
      fontSize: 18
    },
    action: {
      display: 'flex',
      // border: '1px solid red',
      justifyContent: 'center'
    },
    fab: {
      margin: '0 10px'
    }
  });

const ArticleCard = props => {
    const { classes } = props;
    // context
    const appContext = useContext(AppContext);
    // state
    const [qLength, setQuestionLength] = useState(0);
    const [aLength, setAnswerLength] = useState(0);
    
    // event handlers
    const handleClear = () => {
        if( props.title.toLowerCase() === 'question') {
          appContext.removeLocalStorageItem('question');
        } else {
          appContext.removeLocalStorageItem('answer');
        }
        renderWordCount();
    };

    const handleSubmit = () => {
      // Re-route to add new Question
      window.location.href = `#/app/editor?q=add&type=${props.title.toLowerCase()}`;
    }

    // wordCount - simple function
    const wordCount = (data) => {
      if (data === '') return 0;
      else return data.split(' ').length;
    };

    const renderWordCount = () => {
      console.log('App context qContent is: ', appContext.questionContent);
      console.log('App context aContent is: ', appContext.answerContent);
      const questionContent = appContext.getLocalStorageItem('question');
      const answerContent = appContext.getLocalStorageItem('answer');
      if (questionContent) setQuestionLength(wordCount(questionContent));
      else setQuestionLength(0);
      if (answerContent) setAnswerLength(wordCount(answerContent));
      else setAnswerLength(0);
    };

    // componentDidMount
    useEffect(()=>{
      renderWordCount();
    },[]);

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.row}>
                      <Typography variant="h5" component="h2">{props.title}</Typography>                      
                    </div>
                    <Typography component="p" className={classes.pos} color="textSecondary">
                        {`Word Count: ${props.title.toLowerCase() === 'question' ? qLength : aLength}`}
                    </Typography>
                </CardContent>
                <CardActions className={classes.action}>
                    <Button onClick={handleSubmit} variant="contained" size="medium" color="primary">{`Fill in / Edit ${props.title}`}</Button>
                    <Button onClick={handleClear} size="medium" color="primary">Clear</Button>
                </CardActions>
            </Card>          
        </Grid>
    );
}

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired  
}

export default withStyles(styles, { withTheme: true })(ArticleCard);