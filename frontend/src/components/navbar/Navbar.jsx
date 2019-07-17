import React from 'react';
import './navbar.css';

const Navbar = props => {
    const routeToLogin = (evt) => {
        evt.preventDefault();
        window.location.href = '#/login';
    }
    return(
        <div>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="content">
                    <a className="navbar-brand" href="#">QUEST APP</a>
                    <button onClick={routeToLogin} type="button" className="btn btn-info">Login</button>
                    </div>
                </nav>
            </div>
    );
};

export default Navbar;