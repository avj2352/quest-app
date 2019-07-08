/**
 * Model for Questionnaire server side schema
 */
import mongoose from 'mongoose';
import { TagSchema } from './tag.model';
import { GroupSchema } from './group.model';

const Schema = mongoose.Schema;

export const QuestionnaireSchema = new Schema({
    title: {
        type: String,
        required: 'Enter Question title'
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
    tags: [TagSchema],
    group: GroupSchema
});

export const QuestionnaireModel = mongoose.model('questions', QuestionnaireSchema);