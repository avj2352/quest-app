import bcrypt from 'bcrypt';
import { saltRounds, UserController } from '../controllers/user.controller';
import { UserModel } from '../models/user.model';

export class BasicAuthentication {

    constructor() {
        this.user = new UserController();
        this.getUserDetailsByEmail = this.getUserDetailsByEmail.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    authenticateUser (req, res) {
        try{    
            const email = req.body.email;
            const password = req.body.password;
            // console.log('email and password is: ', email, password);
            this.user.fetchUserByEmail(email)
            .then(user => {
                // console.log('User password is: ', user.password);
                if(bcrypt.compareSync(password, user.password)) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            })
            .catch(err => {
                res.sendStatus(400);
            })
        } catch (err) {
            res.send(err);
        }
    }

    getUserDetailsByEmail (req, res) {        
            this.user.getUserByEmail(req.params.emailId)
            .then(data => {
                // console.log('Success!', data);
                res.json(data);
            })
            .catch(err => {
                res.send(err);
            });        
    }

}