import React, { createRef, useState, useEffect, useContext } from 'react';
import './markdown-editor.css';
import Button from '@material-ui/core/Button';
// custom
import { AppContext } from './../../../../common/AppContext.jsx';

const MarkDownEditor = props => {
    // context
    const appContext = useContext(AppContext);
    // ref
    const editorRef = createRef();
    const containerRef = createRef();

    // state
    const [content, setContent] = useState('');

    // event handlers
    const handleSubmit = () => {
        switch(window.location.hash) {
            case '#/app/editor?q=add&type=question':
                console.log('Setting value for question', content);
                appContext.addLocalStorageItem('question', content);
                break;
            default:
                console.log('Setting value for answer');
                appContext.addLocalStorageItem('answer', content);
        }
        window.location.href = `#/app/editor?q=add`;
    }

    const handleOnChange = (evt) => {
        // console.log('event object', evt.target.value);
        setContent(evt.target.value);
    }

    const handleRender = () => {
        console.log('Render markdown');
    }

    // componentDidMount
    useEffect(()=>{
        // get context values
        console.log('Location object', window.location);
        switch(window.location.hash) {
            case '#/app/editor?q=add&type=question':
                editorRef.current.value = appContext.getLocalStorageItem('question');
                // console.log('Getting value from question', appContext.getLocalStorageItem('question'));
                break;
            default:
                // console.log('Getting value from answer');
                setContent(appContext.getLocalStorageItem('answer'));                
        }
        // Making editor width and height same as the container
        editorRef.current.style.width = `${containerRef.current.clientWidth}px`;
        editorRef.current.style.height = `${containerRef.current.clientHeight}px`;
    },[]);

    return (
        <div className="container">
            <div className="editor-container" ref={containerRef}>
                <textarea onBlur={handleOnChange} className="editor-form" ref={editorRef}></textarea>
            </div>
            <div className="preview-container">
                <div className="content">

                </div>
                <div className="actions">
                    <Button onClick={handleRender} variant="contained" size="small" color="secondary">Render</Button>
                    <Button onClick={handleSubmit} variant="contained" size="small" color="primary">Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default MarkDownEditor;