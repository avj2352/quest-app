/**
 * CRUD - Controller for Group Model
*/
import { GroupModel } from './../models/group.model';

export class GroupController {

    getAllGroups (req, res) {
        GroupModel.find({}, (err, data)=>{
            if (err) res.send(err);
            else res.json(data);
        });
    }

    // CREATE - group record
    addNewGroup (req, res) {
        let newGroupRecord = new GroupModel(req.body);
        newGroupRecord.save((err, data)=>{
            if(err) res.send(err);
            else res.send(data);
        });
    }

    // RETRIEVE - group record by id
    getGroupById (req, res) {
        GroupModel.find({_id: req.params.groupId}, (err, data)=>{
            if (err) res.send(err);
            else res.json(data);
        });
    }

    updateGroupById (req, res) {
        GroupModel.findOneAndUpdate({_id: req.params.groupId}, req.body, { new: true }, (err, data)=>{
            if (err) res.send(err);
            else res.json(contact); // Get JSON format of contact
        });
    }

    deleteGroupById (req, res) {
        GroupModel.deleteOne({_id: req.params.id}, (err)=>{
            if (err) res.send(err);
            else res.json({message: `Successfully deleted group id: ${req.params.id}`});
        });
    }
}