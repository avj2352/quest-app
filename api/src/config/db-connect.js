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
            url = `mongodb://admin:zuko2352@ds347707.mlab.com:47707/quest-app-db`;
            break;
    };
    mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // useMongoClient: true,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    });
};