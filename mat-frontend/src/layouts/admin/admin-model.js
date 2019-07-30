import React from 'react';
import GroupView from '../../views/dashboard/groups/GroupView.jsx';
import QuestionView from '../../views/dashboard/questionnaire/QuestionView.jsx';
import TagView from '../../views/dashboard/tags/TagView.jsx';
import NotFound from './../../views/dashboard/not-found/NotFound.jsx';

export const routeMap = (path, search) => {
    if (path === '/app/edit') {

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
    } else {
        return <NotFound/>;
    }
}

