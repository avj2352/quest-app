/**
 * Controller to add a list of all Users who have completed a question
 * contains two fields - List of users, List of Questions
*/
import { InventoryModel } from './../models/inventory.model';

export class InventoryController {
    addNewRecord (req, res) {
        try {
            // Query Question
            const newRecord = new InventoryModel({
                user: req.params.userId,
                question: req.params.questionId
            });
        } catch (err) {
            res.send(err);
        } finally {
            newRecord.save((err, data)=>{
                if(err) res.send(err);
                else res.json(data);
            });
        }
    }

    // Delete - Delete a record by searching userId and questionId
    deleteRecord (req, res) {
        try {
            InventoryModel.deleteOne({
                user: req.params.userId,
                question: req.params.questionId
            }, (err)=>{
                if (err) res.send(err);
                else res.json({ message: 'Successfully deleted inventory record'});
            });
        } catch (err) {
            res.send(err);
        }  
    }        
}