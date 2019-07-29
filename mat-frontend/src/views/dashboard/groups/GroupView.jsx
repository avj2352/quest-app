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
import { getAllGroups, deleteGroupById } from './../../../common/async-requests';
import GroupUpdateModal from './GroupUpdateModal.jsx';

const GroupView = props => {
    const { classes } = props;
    //snackBar
    const { enqueueSnackbar} = useSnackbar();

    // states
    const [isLoading, setLoading] = useState(true);
    const [groupList, setGroupList] = useState([]);

    const [groupValue, setGroupValue] = useState({
        id: '',
        name: '',
        slug:'',
        description: '',
        premium: false
    });

    const [isModal, setModal] = useState(false);

    // lifecycle methods
    const refreshGroupDetails = () => {
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
    };

    // event handlers
    const handleGroupCreate = (action) => {
        console.log('Action was a: ', action);
        if(action === 'success') {
            enqueueSnackbar(`Group record created !`, {variant: 'info'});
            refreshGroupDetails();
        } else if (action === 'failure') {
            enqueueSnackbar(`Error creating Group record...`, {variant: 'error'});
        }
    };

    const handleGroupEdit = (data) => {
        console.log('Handling Group Edit', data);
        setGroupValue(data);
        setModal(true);
    };

    const handleGroupDelete = (data) => {
        // console.log('Handling Group Delete', data);
        setLoading(true);
        const deletePromise = deleteGroupById(data.id);
        const allGroupsPromise = getAllGroups();
        deletePromise.then(res => allGroupsPromise, err => {
            setLoading(false);
            console.log('Error deleting Group: ', err);
            enqueueSnackbar(`Error deleting Group: ${data.name}, Please refresh page`, {variant: 'error'});
        }).then(res => {
            setLoading(false);
            setGroupList(res.data);
            enqueueSnackbar(`Showing new data`, {variant: 'success'});
        }, err => {
            setLoading(false);
            console.log('Error deleting Group: ', err);
            enqueueSnackbar(`Error deleting Group: ${data.name}, Please refresh page`, {variant: 'error'});
        });        
    };

    const handleModalClose = (state, action) => {
        console.log('Action was a: ', action);
        if(action === 'success') {
            enqueueSnackbar(`Group record updated !`, {variant: 'info'});
            refreshGroupDetails();
        } else if (action === 'failure') {
            enqueueSnackbar(`Error updating Group record...`, {variant: 'error'});
        }
        setModal(state);
    };

    //componentDidMount
    useEffect(()=>{
        refreshGroupDetails();
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
                        onModalClose = {handleModalClose}/>
                </Grid>
            </div>            
        </div>
        
    );
};

export default withStyles(styles, { withTheme: true })(GroupView);