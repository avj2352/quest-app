/**
 * Authentication Handler Functions
 */
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from  'passport-google-oauth20';
// import { gClientID, gClientSecret } from '../config/google-oauth-config';
// import { UserModel } from '../models/user.model';

// // Create an instance of GoogleStrategy and configure it in passport
// export const useGoogleOAuth = (callback) => {
    
//     passport.use(new GoogleStrategy({
//         clientID: gClientID,
//         clientSecret: gClientSecret,
//         callbackURL: '/auth/google/callback',
//         passReqToCallback: true
//     }, (request, accessToken, refreshToken, profile, done)=>{      
//         console.log('From server: ', accessToken, profile);
//         UserModel.findOne({ email: profile.emails[0].value}).then(user => {
//         if (user) {
//             done(null, user);
//         } else {
//             new UserModel({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 provider: 'google',
//                 premium: false
//             }).save()            
//             .then(user => done(null, user));
//         }
//     }); 
//     }));
// };

