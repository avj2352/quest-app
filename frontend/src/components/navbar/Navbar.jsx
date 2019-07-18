import React from 'react';
import './navbar.css';
import DropDownButton from '../drop-down-button/DropDownButton.jsx';

const Navbar = props => {                    
    return (
        <div>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="content">
                    <a className="navbar-brand" href="#">QUEST APP</a>                    
                    <DropDownButton/>
                    </div>
                </nav>
            </div>
    );
};

export default Navbar;