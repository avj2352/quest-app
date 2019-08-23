import React from 'react';
import GroupView from '../../views/dashboard/groups/GroupView.jsx';
import QuestionView from '../../views/dashboard/questionnaire/QuestionView.jsx';
import TagView from '../../views/dashboard/tags/TagView.jsx';
import NotFound from './../../views/dashboard/not-found/NotFound.jsx';
import CreateQuestion from './../../views/dashboard/questionnaire/create/CreateQuestion.jsx';
import UpdateQuestion from '../../views/dashboard/questionnaire/update/UpdateQuestion.jsx';
import CardListView from './../../views/main/CardListView.jsx';


export const routeMap = (path, search) => {
    // console.log('Path and search are: ', path, search);
    if (path === '/app/admin') {
        switch (search) {
            case '?g=questions':
                return <QuestionView/> ;                
            case '?g=tags':
                return <TagView/>;                
            case '?g=groups':
                return <GroupView/> ;
            default:
                return <NotFound/>;
        }
    } else if (path === '/app/editor') {
        if(search.indexOf('?q=edit') > -1) {
            return <UpdateQuestion/>;
        } else if (search === '?q=add') {
            return <CreateQuestion/>;
        } else {
            return <NotFound/>;    
        }
    } else {
        return <CardListView/>;
    }
}

