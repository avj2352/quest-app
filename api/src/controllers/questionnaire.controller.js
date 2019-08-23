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


    // Create - new question record
    addNewQuestion (req, res) {
        // prepare query
        let aQuestion;        
        const tagList = req.body.tags;
        const groupList = req.body.groups;        
        // Query Question
        aQuestion = new QuestionnaireModel({
            title: req.body.title,
            type: req.body.type,
            question: req.body.question,
            answer: req.body.answer,
            tags: tagList,
            groups: groupList,
            date: new Date().getTime()                
        });
        aQuestion.save((err, data)=>{
            if(err) res.send(err);
            else res.json(data);
        });        
    }

    getAllQuestions (req, res) {
        QuestionnaireModel.find({})
        .populate('tags')
        .populate('groups')
        .exec((err, data)=>{
            if (err) res.send(err);
            else res.json(data);
        });
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

    // Retrieve - questions by groupId
    getQuestionByGroupId (req, res) {
        QuestionnaireModel.find({groups: req.params.groupId})
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

            // Query Question
            QuestionnaireModel.findByIdAndUpdate({ _id: questionId },{
                title: req.body.title,
                type: req.body.type,
                question: req.body.question,
                answer: req.body.answer,
                date: new Date().getTime(),
                tags: tagList,
                groups: groupList
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