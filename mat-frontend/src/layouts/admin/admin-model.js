import React from 'react';
import GroupEdit from '../../views/dashboard/groups/GroupEdit.jsx';
import QuestionEdit from '../../views/dashboard/questionnaire/QuestionEdit.jsx';
import TagView from '../../views/dashboard/tags/TagView.jsx';
import NotFound from './../../views/dashboard/not-found/NotFound.jsx';

export const routeMap = (path, search) => {    
    if (path === '/app/edit') {
        switch (search) {
            case '?g=questions':
                return <QuestionEdit/> ;                
            case '?g=tags':
                return <TagView/>;                
            case '?g=groups':
                return <GroupEdit/> ;
            default:
                return <NotFound/>;
        }
    } else {
        return <NotFound/>;
    }
}

