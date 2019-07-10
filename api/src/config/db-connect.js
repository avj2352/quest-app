/**
 * Module to setup mongoose connection
 */
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const setupDBConnection = (env)=>{
    let url;
    switch(env) {
        case 'DEV':
            url = `mongodb://localhost/QuestApp`
            break;
        case 'PROD':
            url = `mongodb://pramod.jingade@gmail.com:zuko2352@ds347707.mlab.com:47707/quest-app-db`;
            break;
    };
    mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
        // useMongoClient: true
    });
};