/**
 * CRUD - Controller for Questionnaire Model
*/
import mongoose from 'mongoose';
import { QuestionnaireModel } from './../models/questionnaire.model';
import { GroupModel } from './../models/group.model';
import { TagModel } from './../models/tag.model';

export class QuestionsController {
    constructor () {
        this.groupModelList = [];
        this.tagModelList = [];
    }

    populateGroupModel(groupList) {
        let result;
        groupList.map(el => {
            this.groupModelList.push(mongoose.Types.ObjectId(el));
        });
        try {
            GroupModel.find({
                '_id': {$in: this.groupModelList}
            }, (err, data)=>{
                if (err) return null;
                else return data; 
            })
        } catch (err) {
            return null;
        }
    }

    populateTagModel(tagList) {
        let result;
        tagList.map(el => {
            this.tagModelList.push(mongoose.Types.ObjectId(el));
        });
        try {
            TagModel.find({
                '_id': {$in: this.tagModelList}
            }, (err, data)=>{
                if (err) return null;
                else return data;
            });
        } catch(err) {
            console.log('Error retrieving tag records', err);
            return null;
        }
    }

    // Create - new question record
    addNewQuestion (req, res) {
        // prepare query
        try {
            // get reference for tagId and groupId
            const tagList = req.body.tags;
            const groupList = req.body.groups;
            const groupModelList = this.populateGroupModel(groupList);
            const tagModelList = this.populateTagModel(tagList);

            // Query Question
            const aQuestion = new QuestionnaireModel({
                title: req.body.title,
                type: req.body.type,
                question: req.body.question,
                answer: req.body.answer,
                date: new Date().getTime(),
                tags: tagModelList,
                groups: groupModelList
            });
        } catch (err) {
            res.send(err);
        } finally {
            aQuestion.save((err, data)=>{
                if(err) res.send(err);
                else res.json(data);
            });
        }
    }

    // Retrieve - question by Id
    getQuestionById (req, res) {
        QuestionnaireModel.findOne({_id: req.params.questionId})
        .populate('tags')
        .populate('groups')
        .exec((err, data)=>{
            if (err) res.send(err);
            else res.json(data);
        });
    }

    // UPDATE - question by Id
    updateQuestionById (req, res) {
        // prepare query
        try {
            // get question by Id
            const questionId = req.params.questionId;
            // get reference for tagId and groupId
            const tagList = req.body.tags;
            const groupList = req.body.groups;
            const groupModelList = this.populateGroupModel(groupList);
            const tagModelList = this.populateTagModel(tagList);

            // Query Question
            const aQuestion = QuestionnaireModel.findByIdAndUpdate({ _id: questionId },{
                title: req.body.title,
                type: req.body.type,
                question: req.body.question,
                answer: req.body.answer,
                date: new Date().getTime(),
                tags: tagModelList,
                groups: groupModelList
            }, {new: true}, (err, data)=>{
                if (err) res.send(err);
                else res.json(data);
            });
        } catch (err) {
            res.send(err);
        }
    }

    // DELETE - question by id
    deleteQuestionById (req, res) {
        try {
            QuestionnaireModel.deleteOne({_id: req.params.questionId}, (err)=>{
                if (err) res.send(err);
                else res.json({ message: 'Successfully deleted question record'});
            });
        } catch (err) {
            res.send(err);
        }
    }
}