import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BackIcon from '@material-ui/icons/CallMissed';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { display } from '@material-ui/system';
import { showIcon } from './../../../components/sidebar/sidebar-icons';
import SimpleBadge from '../../../components/badges/SimpleBadge.jsx';

const useStyles = makeStyles(theme => ({
  card: {
      width:'100%',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 175,
      '& p': {
        fontSize: '18px'
      },
      '& li': {
        fontSize: '18px'
      },
      '& code': {
        fontSize: '15px',
        borderRadius: '10px'
      }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {
    position: 'relative',
    top: 8
  },
  titleIcon: {      
    marginTop: 11,
    color: '#00ffff',
    paddingRight: '10px',      
    position: 'relative',      
  },
  badgeContainer: {
    // border: '1px solid red',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  qArea: {
    // border: '1px solid red',    
    marginLeft: '5px',
    padding: '5px',
    width: '100%',
    textAlign: 'left'    
  },  
  ansArea: {
    // border: '1px solid red',
    width: '100%',
    textAlign: 'left'
  },  
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const  DetailCard = props => {
  const classes = useStyles();
  // refs
  const qRef = createRef();
  const aRef = createRef();

  // states
  const [expanded, setExpanded] = useState(false);
  const [tagList, setTagList] = useState(null);

  // event handlers
  const handleExpandClick =()=>{
    setExpanded(!expanded);
  };

  const handleBackButtonClick = () => {
    props.onBack(false);
  };

  // render icons
  const icon = props.slug ? <div className={classes.titleIcon}>{showIcon(props.slug)}</div> : <React.Fragment></React.Fragment>;

  // render badges
  const badgeIcons = props.selectedTags && props.selectedTags.map((item, index) => {
    return <SimpleBadge key={index} name={item.name} description={item.description} />
  });

  useEffect(()=> {
    console.log('Question content: ', props.qContent);
    console.log('Ans content: ', props.aContent);
    if (qRef.current) qRef.current.innerHTML = props.qContent;
    if (aRef.current) aRef.current.innerHTML = props.aContent;
    qRef.current.querySelectorAll('pre code').forEach((block) => {
      // eslint-disable-next-line no-undef
      hljs.highlightBlock(block); //Highlight JS
    });
    aRef.current.querySelectorAll('pre code').forEach((block) => {
      // eslint-disable-next-line no-undef
      hljs.highlightBlock(block); //Highlight JS
    });
  },[]);

  // render
  return (
    <Grid item xs={12} md={12}>
        <Card className={classes.card}>      
            <CardContent>
                <div className={classes.header}>
                  <IconButton onClick={handleBackButtonClick} aria-label="add to favorites"><BackIcon /></IconButton>                  
                  { icon }
                  <Typography className={classes.title} variant="h5" component="h2">{props.title}</Typography>
                </div>
                <div className={classes.badgeContainer}>
                      {badgeIcons}
                </div>
            </CardContent>
              <div className={classes.qArea} ref={qRef}></div>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton> */}
                {/* <IconButton aria-label="share"><ShareIcon /></IconButton> */}
                <IconButton
                    className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,})}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"><ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                  <div className={classes.ansArea} ref={aRef}></div>                    
                </CardContent>
            </Collapse>
        </Card>
    </Grid>
  );
}

DetailCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  selectedTags: PropTypes.array,
  qContent: PropTypes.string.isRequired,
  aContent: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
}

export default DetailCard;