import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSnackbar } from 'notistack';
// CSS
import { withStyles } from '@material-ui/core/styles';
import { styles } from './group-edit-styles';
// Custom
import GroupCreate from './GroupCreate.jsx';
import GroupCard from './GroupCard.jsx';
import CircularLoader from './../../../components/loaders/circular-loader/CircularLoader.jsx';
import { getAllGroups } from './../../../common/async-requests';
import GroupUpdateModal from './GroupUpdateModal.jsx';

const GroupView = props => {
    const { classes } = props;
    //snackBar
    const { enqueueSnackbar} = useSnackbar();

    // states
    const [isLoading, setLoading] = useState(true);
    const [groupList, setGroupList] = useState([]);
    const [groupValue, setGroupValue] = useState({id: '', name: '', slug:'', description: '', premium: false });
    const [isModal, setModal] = useState(false);

    // event handlers
    const handleGroupCreate = () => {
        console.log('Handler called');
    }

    const handleGroupEdit = (data) => {
        console.log('Handling Group Edit', data);
        setGroupValue(data);
        setModal(true);
    }

    const handleGroupDelete = (data) => {
        console.log('Handling Group Delete', data);
    }

    const handleModalClose = (state, action) => {
        console.log('Modal close!');
    }

    //componentDidMount
    useEffect(()=>{
        getAllGroups()
        .then(res => {
            setLoading(false);
            enqueueSnackbar(`Groups loaded successfully !`, {variant: 'success'});
            setGroupList(res.data);
            console.log('Group list is: ', res.data);
        }, err => {
            console.log('Error loading Groups', err);
            enqueueSnackbar(`Error loading Groups, Please refresh page`, {variant: 'error'});
        });

    },[]);

    // Render group list
    const groupListDom = groupList.length > 0 && groupList.map((el, index) => <GroupCard 
        key={index} 
        id={el._id}
        title={el.title}
        slug={el.slug}
        description={el.description}
        premium={el.premium}
        onEdit={handleGroupEdit}
        onDelete={handleGroupDelete}
        />);

    // render
    return (
        <div className = {classes.root}>
            <CssBaseline />
            <div className={classes.cardContent}>
                <Grid container spacing={1}>                    
                    <GroupCreate onCreateGroup={handleGroupCreate}/>
                    <Grid item xs={12} md={12}>
                        <CircularLoader display={isLoading}/>
                    </Grid>
                    {groupListDom}
                    <GroupUpdateModal
                        open = {isModal}
                        id = {groupValue.id}
                        name = {groupValue.name}
                        slug = {groupValue.slug}
                        description = {groupValue.description}
                        premium = {groupValue.premium}
                        onModalClose = {handleModalClose}
                    />
                </Grid>
            </div>            
        </div>
        
    );
};

export default withStyles(styles, { withTheme: true })(GroupView);