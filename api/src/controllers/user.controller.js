/**
 * CRUD - Controller for User Model
*/
import { UserModel } from './../models/user.model';

export class UserController {
    // Create - new User record
    addNewUser (req, res) {
        let aUser;
        try {
        // Query Question
        aUser = new UserModel({
            name: req.body.name,
            password: req.body.password,            
            email: req.body.email,
            premium: req.body.premium
        });
       } catch (err) {
        res.send(err);
       } finally {
        aUser.save((err, data)=>{
            if(err) res.send(err);
            else res.json(data);
        });
       }
    }

    // Retrieve - Get all Users
    getAllUsers (req, res) {
        UserModel.find({},(err, data)=>{
            if (err) res.send(err);
            else res.json(data);
        });
    }

    // Retrieve - Get User by userId
    getUserById (req, res) {
        UserModel.findOne({_id: req.params.userId})
        .exec((err, data)=>{
            if (err) res.send(err);
            else res.json(data);
        });
    }

    // Update - User by UserId
    updateUserById (req, res) {    
        try {            
            const aUser = UserModel.findByIdAndUpdate({ _id: req.params.userId },{
                name: req.body.name,
                password: req.body.password,                
                email: req.body.email,
                premium: req.body.premium               
            }, {new: true}, (err, data)=>{
                if (err) res.send(err);
                else res.json(data);
            });
        } catch (err) {
            res.send(err);
        }
    }

    // DELETE - User by UserId
    deleteUserById (req, res) {
        try {
            UserModel.deleteOne({_id: req.params.userId}, (err)=>{
                if (err) res.send(err);
                else res.json({ message: 'Successfully deleted user record'});
            });
        } catch (err) {
            res.send(err);
        }
    }
}