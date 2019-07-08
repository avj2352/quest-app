/**
 * Model for Questionnaire server side schema
 */
import mongoose from 'mongoose';
import { QuestionnaireSchema } from './questionnaire.model';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Enter Username'
    },
    password: {
        type: String,
        required: 'Enter Password'
    },
    email: {
        type: String,
        required: 'Enter Email ID'
    },        
    questions: [QuestionnaireSchema]
});

export const UserModel = mongoose.model('users', UserSchema);