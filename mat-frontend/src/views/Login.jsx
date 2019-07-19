import React, {useState, useEffect, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//Context
import { AppContext } from './../common/AppContext.jsx';
import { authenticationUser, getUserByEmail } from './../common/async-requests';
//CSS in JS
import { useStyles } from './login-style';
import logo from './../assets/apple-icon.png';


const Login = ()=>{
  const classes = useStyles();
  const appContext = useContext(AppContext);

  //states
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

    const handleChange = prop => event => {
        if(event.target.value !== '') {
            setErrMsg('');
        }
        if (event.target.name === 'email') {            
            setUserName(event.target.value);
        } else {            
            setPassword(event.target.value);
        }        
    };

    const storeCredentials = (email) => {
        getUserByEmail(email)
        .then(res => {
            appContext.addLocalStorageJSON('user-details', res.data);
            setLoading(true);
            window.location.href = '#/app';
        });        
    }

    const authenticate = async (evt) => {
        setLoading(true);
        evt.preventDefault();
        // console.log('Credentials: ', username, password);
        if( username && password) {
            // setIsLoading(true);
            authenticationUser({email: username, password: password})
            .then(data => {
                storeCredentials(username);
            })
            .catch(err => {
                console.log('Error with authentication', err);
                setErrMsg('ERROR: Invalid Username / Password');                
                setLoading(false);
            });
        } else {
            setErrMsg('ERROR: Invalid Username / Password');
            setLoading(false);
        }
    };

    //componentDidMount
    useEffect(()=>{
        appContext.removeLocalStorageItem('user-details');
    },[]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
            <img className={classes.imgLogo} src={logo} alt="app-logo"/>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>        
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {loading && <div className={classes.progress}>                        
            <LinearProgress color="secondary" />
        </div>}
        <form className={classes.form} noValidate>
        <Typography className={classes.validationText} component="p">
          {errMsg}
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={handleChange()}/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={handleChange()}/>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = { authenticate }
          >
            Sign In
          </Button>          
        </form>
      </div>
      <Box mt={5}>        
      </Box>
    </Container>
  );
}

export default Login;