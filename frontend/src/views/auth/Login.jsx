import React, {useState, useEffect, useContext} from 'react';
import Loader from './../../components/loader/Loader.jsx';
import './login.css';
import imgLogo from '../../assets/img/logo-small.png';
import { authenticationUser, getUserByEmail } from './../../common/async-requests';
import { AppContext } from '../../common/AppContext.jsx';

const Login = props => {
    const appContext = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [username, setUsername]   = useState('');
    const [password, setPassword] = useState('');

    //componentDidMount
    useEffect(()=>{
        appContext.removeLocalStorageItem('user-details');
    },[]);
    
    const onChange = async (field, evt) => {
        evt.preventDefault();        
        switch(field) {
            case 'username':
                setErrMsg('');
                setUsername(evt.target.value);
                break;
            default:
                setPassword(evt.target.value);
                break;            
        };
    };

    const storeCredentials = (email) => {
        getUserByEmail(email)
        .then(res => {
            appContext.addLocalStorageJSON('user-details', res.data);
            setIsLoading(false);
            window.location.href = '#/dashboard';
        });        
    }

    const authenticate = async (evt) => {
        evt.preventDefault();
        // console.log('Credentials: ', username, password);
        if( username && password) {
            setIsLoading(true);
            authenticationUser({email: username, password: password})
            .then(data => {
                storeCredentials(username);
            })
            .catch(err => {
                console.log('Error with authentication', err);
                setErrMsg('ERROR: Invalid Username / Password');
                setIsLoading(false);
            });
        } else {
            setErrMsg('ERROR: Invalid Username / Password');
        }
    };

    // Switch between loader and login model
    const loginModel = !isLoading && <div className="card text-white bg-info mb-3">
    <div className="card-header">
        <h4>Login</h4>
    </div>
    <div className="card-body">                                        
        <div className="form-group">                        
            <div>{errMsg}</div>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"
                    onChange = {e => onChange('username', e)}
                    value = {username}                    
            />                                                
            <div>&nbsp;</div>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                onChange = {e => onChange('password', e)}
                value = {password}
            />
            <div>&nbsp;</div>
            <button onClick={authenticate} type="button" className="btn btn-danger btn-lg btn-block">LOGIN</button>
            <div>&nbsp;</div>
            <small className="form-text text-white">&copy; 2019 www.innovoskies.com</small>
        </div>
    </div>
    </div>;

    //render
    return (
        <React.Fragment>
        <Loader visible={isLoading} />
        <div className="login-section">
            <div className="logo">
                <img src={imgLogo} alt="logo"/>
            </div>
            {loginModel}
        </div>
        </React.Fragment>
    );
}

export default Login;