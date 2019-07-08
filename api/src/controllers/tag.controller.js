/**
 * CRUD - Controller for Tag Model
*/
import { TagModel } from './../models/tag.model';

export class TagController {

    getAllTags(req, res) {
        TagModel.find({},(err, data)=>{
            if(err) res.send(err);
            else res.json(data); // Get JSON format of contact
        });
    }
    
    // CREATE - tag record by name
    addNewTag(req, res) {
        let newTagRecord = new TagModel(req.body);
        newTagRecord.save((err, data)=> {
            if(err) res.send(err);
            else res.send(data);
        });
    }
    
    // RETRIEVE - tag record by name
    getTagByName(req, res) {
        TagModel.find({name: req.params.name},(err, data)=>{
            if(err) res.send(err);
            else res.json(data); // Get JSON format of contact
        });
    }
    
    // UPDATE - tag record by name
    updateTagByName(req, res) {
        TagModel.findOneAndUpdate({_id: req.params.name}, req.body, { new: true }, (err, data)=> {
            if (err) res.send(err);
            else res.json(data); // Get JSON format of data
        });
    }
    
    // DELETE - tag record by name
    deleteTagByName(req, res) {
        TagModel.deleteOne({_id: req.params.name}, (err)=>{
            if (err) res.send(err);
            else res.json({ message: 'Successfully deleted tag record'});
        });
    }


}