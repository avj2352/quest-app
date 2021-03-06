/**
 * Model for Questionnaire server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Enter Username'
    },
    password: {
        type: String,
        required: 'Enter password',
        select: false
    },
    provider: {
        type: String,
        required: 'Enter provier'
    },
    email: {
        type: String,
        required: 'Enter Email ID'
    },            
    role: {
        type: String,
        required: 'Is User a premium or free tier user'
    }
});

export const UserModel = mongoose.model('users', UserSchema);