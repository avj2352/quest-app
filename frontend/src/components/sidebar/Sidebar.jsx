import React, { useEffect } from 'react';
import './sidebar.css';
import { FaAlignJustify, FaBattleNet, FaChrome, FaDeskpro } from 'react-icons/fa';
import { getAllQuestions } from './../../common/async-requests';

const Sidebar = (props) => {


    // componentDidMount
    useEffect(()=>{
        getAllQuestions().then(data => console.log(data));
    },[]);

    return (
    <div className="s-layout">        
        <div className="s-layout__sidebar">
        <a className="s-sidebar__trigger" href="#0">
            <FaAlignJustify className="icon--menu-sandwich"/>
            {/* <i className="fa fa-bars"></i> */}
        </a>
        <nav className="s-sidebar__nav">
            <ul>
                <li>
                <a className="s-sidebar__nav-link" href="#0">
                    <FaBattleNet className="icon"/>
                    <span>Home</span>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="#0">
                    <FaChrome className="icon"/>
                    <span>Home</span>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="#0">
                    <FaDeskpro className="icon"/>
                    <span>Home</span>
                </a>
                </li>
            </ul>            
        </nav>
        </div>                
    </div>
    );
};


export default Sidebar;