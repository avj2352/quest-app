import React, { createRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import './markdown-editor.css';
import Button from '@material-ui/core/Button';
// custom
import { AppContext } from './../../../../../common/AppContext.jsx';
import { postMarkdownRender } from './../../../../../common/async-requests';
import { isParenthesisMatching } from './../../../../../common/bracket-matching';


const MarkDownEditor = props => {
    // context
    const appContext = useContext(AppContext);
    // ref
    const editorRef = createRef();
    const containerRef = createRef();
    const renderHTMLRef = createRef();

    // state
    const [content, setContent] = useState('');

    // match brackets
    // const matchBrackets = () => {
    //     if(editorRef.current.value && editorRef.current.value.length > 0) {            
    //         const data = isParenthesisMatching(editorRef.current.value[editorRef.current.value.length-1]);
    //         if (!data.status && data.char ) {                
    //             data.char.map(el => {
    //                 if (el === '(') {
    //                     editorRef.current.value = `${editorRef.current.value})`;
    //                 } else if (el === '{') {
    //                     editorRef.current.value = `${editorRef.current.value}}`;
    //                 }
    //             });
    //         }
    //     }        
    // };

    // event handlers
    const handleSubmit = () => {        
        props.onSubmit(content, false);
    }

    const handleOnChange = (evt) => {
        // console.log('event object', evt.target.value);
        setContent(evt.target.value);
    }

    const handleRender = () => {
        console.log('Render markdown');
        postMarkdownRender(content)
        .then( res => {
            console.log('Response is: ', res);
            if(res.data && res.data.markdown) {
                renderHTMLRef.current.innerHTML = res.data.markdown;
                renderHTMLRef.current.querySelectorAll('pre code').forEach((block) => {
                    // eslint-disable-next-line no-undef
                    hljs.highlightBlock(block); //Highlight JS
                });
            }
        }, err => {
            console.log('Error converting markdown to html', err);
        });
    }

    // componentDidMount
    useEffect(()=>{
        // get context values
        // console.log('Location object', window.location);
        setContent(props.content);        
        if (editorRef.current) editorRef.current.value = props.content;
        if (editorRef.current) editorRef.current.style.width = `${containerRef.current.clientWidth}px`;
        if (editorRef.current) editorRef.current.style.height = `${containerRef.current.clientHeight}px`;
    },[props.display]);

    const editorContent = props.display && <React.Fragment>
        <Grid item xs={12} md={12} className="container">
            <Grid item xs={12} md={6} ref={containerRef} className="editor-container">
                <textarea onBlur={handleOnChange} className="editor-form" ref={editorRef}></textarea>
            </Grid>    
            <Grid item xs={12} md={6} className="preview-container">
                <div className="content" ref={renderHTMLRef}>
                </div>
                <div className="actions">
                    <Button onClick={handleRender} variant="contained" size="small" color="secondary">Render</Button>
                    <Button onClick={handleSubmit} variant="contained" size="small" color="primary">Submit</Button>
                </div>
            </Grid>
        </Grid>
    </React.Fragment>

    return (editorContent);
};

MarkDownEditor.propTypes = {
    display: PropTypes.bool.isRequired,
    isQuestion: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default MarkDownEditor;