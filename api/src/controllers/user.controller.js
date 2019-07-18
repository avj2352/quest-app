/**
 * CRUD - Controller for User Model
*/
import { UserModel } from './../models/user.model';
import bcrypt from 'bcrypt';
export const saltRounds = 10;

export class UserController {
    // Create - new User record
    addNewUser (req, res) {
        let aUser;
        try {        
        aUser = new UserModel({
            name: req.body.name,
            provider: req.body.provider,
            password: bcrypt.hashSync(req.body.password, saltRounds),
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

    // Create new record - without req, res
    createRecord (data) {
        let aUser;
        try {
        // Query Question
        aUser = new UserModel({
            name: data.name,
            provider: data.provider,
            password: data.password,
            email: data.email,
            premium: data.premium
        });
       } catch (err) {
        console.log('Error while populating data: ', err);
       } finally {
        return aUser.save();
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

    // Retrieve - Get user by email
    getUserByEmail (email) {
        const promise = new Promise((resolve, reject)=>{
            UserModel.findOne({email: email})
            .exec((err, data)=>{
                if (err) reject(err);
                else resolve(data);
            });
        });
        return promise;
    }

    // Fetch userDetails
    fetchUserByEmail (email) {
        const promise = new Promise((resolve, reject)=>{
            UserModel.findOne({email: email})
            .select('+password')
            .exec((err, data)=>{
                if (err) reject(err);
                else resolve(data);
            });
        });
        return promise;
    }
    
    // Update - User by UserId
    updateUserById (req, res) {    
        try {            
            const aUser = UserModel.findByIdAndUpdate({ _id: req.params.userId },{
                name: req.body.name,
                provider: req.body.provider,
                password: bcrypt.hashSync(req.body.password, saltRounds),
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