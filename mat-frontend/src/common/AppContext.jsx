/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { Component } from 'react';
export const AppContext = React.createContext();

export class AppProvider extends Component {
    constructor() {
        super();
        this.state = {            
            version:'3.0.3',            
            title:'Quest App',
            themePalette:'light',
            isHeaderSearch: true,
            questionContent: '',
            answerContent: '',
            toggleTheme:()=>{                
                this.setState(prev=>({themePalette: prev.themePalette === 'light' ? 'dark' : 'light'}));
            },
            setLightTheme:()=>{                
                this.setState({themePalette:'light'});
            },
            setHeaderSearch:(val)=>{
                this.setState({isHeaderSearch: val});
            },
            addLocalStorageItem:(name, value) => {
                localStorage.setItem(`quest-${name}`, value);
            }, 
            removeLocalStorageItem:(name) => {
                localStorage.removeItem(`quest-${name}`);
            },
            getLocalStorageItem:(name) => {
                return localStorage.getItem(`quest-${name}`);
            },
            addLocalStorageJSON: (name, data) => {
                localStorage.setItem(`quest-${name}`, JSON.stringify(data));
            },
            getLocalStorageJSON: (name) => {
                const data = localStorage.getItem(`quest-${name}`);
                return JSON.parse(data);
            },
            setMarkdownContent: (type, data) => {
                if (type === 'question') this.setState({questionContent: data});
                else this.setState({answerContent: data});
            },
            getMarkdownContent: (type) => {
                if (type === 'question') return this.questionContent;
                else return this.answerContent;
            }
        };
    }

    componentDidMount() {   
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    }
}


