import React from 'react';
import GroupEdit from '../../views/dashboard/groups/GroupEdit.jsx';
import QuestionEdit from '../../views/dashboard/questionnaire/QuestionEdit.jsx';
import TagEdit from '../../views/dashboard/tags/TagEdit.jsx';
import NotFound from './../../views/dashboard/not-found/NotFound.jsx';

export const routeMap = (path, search) => {
    // console.log('path is: ', path);
    let routeList = [];
    if (path === '/app/edit') {
        switch (search) {
            case '?g=questions':
                return <QuestionEdit/> ;                
            case '?g=tags':
                return <TagEdit/> ;                
            case '?g=groups':
                return <GroupEdit/> ;
            default:
                return <NotFound/>;
        }
    } else {
        return <NotFound/>;
    }
}

