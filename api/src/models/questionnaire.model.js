/**
 * Model for Questionnaire server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const QuestionnaireSchema = new Schema({
    title: {
        type: String,
        required: 'Enter Question title'
    },
    type: {
        type: String,
        required: 'QA type question or Article type'
    },    
    question: {
        type: String,
        required: 'Enter the Question'
    },    
    answer: {
        type: String,
        required: 'Enter the Answer'
    },
    date: {
        type: Number,
        required: 'Provide Date of creation'
    },    
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tags'
    }],
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'groups'
    }]
});

export const QuestionnaireModel = mongoose.model('questions', QuestionnaireSchema);