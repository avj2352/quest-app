/**
 * Model for Tag server side schema
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TagSchema = new Schema({
    name: {
        type: String,
        required: 'Enter tag name'
    },
    description: {
        type: String,
        required: 'Provide Description'
    }    
});

export const TagModel = mongoose.model('tags', TagSchema);
