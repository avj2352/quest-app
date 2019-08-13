import routes from './src/routes/app.routes';
import { setupDBConnection } from './src/config/db-connect';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const DB_ENV = 'PROD';
const path = require('path');
setupDBConnection(DB_ENV);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/hello', (req, res)=>{
    res.send('Hello There !');
});

//Serving static files
app.use('/', express.static(path.join(__dirname,'public')));

//Routes
routes(app);

const server = app.listen(PORT, ()=>{
    console.log(`Server listening at ${server.address().port}`);
});