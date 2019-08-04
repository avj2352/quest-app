import React from 'react';
import GroupView from '../../views/dashboard/groups/GroupView.jsx';
import QuestionView from '../../views/dashboard/questionnaire/QuestionView.jsx';
import TagView from '../../views/dashboard/tags/TagView.jsx';
import NotFound from './../../views/dashboard/not-found/NotFound.jsx';
import QuestionDetails from './../../views/dashboard/questionnaire/editor/QuestionDetails.jsx';
import MarkdownEditor from './../../views/dashboard/questionnaire/editor/MarkDownEditor.jsx';

export const routeMap = (path, search) => {
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
        switch (search) {
            case '?q=add':
                return <QuestionDetails/>;
            case '?q=add&type=question':
                return <MarkdownEditor/>;
            case '?q=add&type=answer':
                return <MarkdownEditor/>;
            default:
                return <NotFound/>;
        }
    } else {
        return <NotFound/>;
    }
}

