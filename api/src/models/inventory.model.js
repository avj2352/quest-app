/**
 * Creating a Map collection containing a list of Users and the Question ID they have read
 */
/**
 * Model for Questionnaire server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const InventorySchema = new Schema({           
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'questions'
    }    
});

export const InventoryModel = mongoose.model('inventory', InventorySchema);