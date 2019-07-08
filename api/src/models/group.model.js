/**
 * Model for Group server side schema
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GroupSchema = new Schema({
    title: {
        type: String,
        required: 'Enter group title'
    },
    slug: {
        type: String,
        required: 'Enter group slug'
    },    
    description: {
        type: String,
        required: 'Provide group description'
    },
    isPublic: {
        type: Boolean,
        required: 'Public or Private collection'
    },
});

export const GroupModel = mongoose.model('groups', GroupSchema);