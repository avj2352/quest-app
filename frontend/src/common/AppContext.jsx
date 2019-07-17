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
            topics:[],
            inputList:[],
            filterText:'',
            qLength:0,
            rLength:0,
            version:'3.0.1',
            title:'QUEST APP',
            user:'',            
            slug:'',
            date:0,                
            setSlug:(value)=>{
                console.log('Setting slug: ', value);
                this.setState({slug: value});
            }, 
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


