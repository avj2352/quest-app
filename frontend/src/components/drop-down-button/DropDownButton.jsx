/**
 * Login / Dropdown button under Navbar - Quest App
 */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../../common/AppContext.jsx';
import './drop-down.css';


const DropDownButton = props => {
    const appContext = useContext(AppContext);
    const [userDetails, setUserDetails] = useState({name: '', premium: false});
    const [isUserLogin, setUserLogin] = useState(false);

    // componentDidMount
    useEffect(() => {
        const userDetails = appContext.getLocalStorageJSON('user-details');
        if (userDetails) {
            setUserDetails({name: userDetails.name, premium: userDetails.premium});
            setUserLogin(true);
        }
    }, []);

    const showDropDown = isUserLogin && <React.Fragment>
        <input type="checkbox" className="dd-input" id="test"/>
        <ul className="dd-menu">
            <li>{`Premium: ${userDetails.premium}`}</li>
            <li className="divider"></li>
            <li><a href="#/login">Logout</a></li>
        </ul>
    </React.Fragment>;

    const loginText = isUserLogin ? userDetails.name : <a href="#/login">Login</a>;

    // render
    return (
        <React.Fragment>
            <label className="dropdown">
                <div className="dd-button">
                    {loginText}
                </div>
                {showDropDown}
            </label>
        </React.Fragment>
    );
}

export default DropDownButton;