import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Table from '../table';
import { encode, decode } from '../utils/tokens';
import { checkPassword } from '../utils/hash'

let usersTable = new Table('users');
let tokensTable = new Table('tokens');

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, (email, password, done) => {

        console.log('Local Strat')
        // array destructuring. find() will return an array of results.
        // destructuring the first (and hopefully only) result into the user variable
        usersTable.find({ email })
            .then((results) => results[0])
            .then((user) => {
                if (user && user.hash) {
                    checkPassword(password, user.hash)
                        .then((matches) => {
                            if (matches) {
                                //password correct
                                tokensTable.insert({
                                    userid: user.id
                                })
                                    .then((idObj) => encode(idObj.id))
                                    .then((token) => {
                                        return done(null, { token })
                                    });
                            } else {
                                //password incorrect
                                return done(null, false, { message: 'Invalid credentials' });
                            }
                        }).catch((err) => {
                            throw err;
                        })
                } else {
                    return done(null, false, { message: 'Invalid credentials' });
                }
            }).catch((err) => {
                return done(err);
            })
    }));
    passport.use(new BearerStrategy(async (token, done) => {
        let tokenId = decode(token);
        console.log(tokenId);
        if (!tokenId) {
            return done(null, false, { message: 'Invalid token' });
        }
        try {
            let tokenRecord = await tokensTable.getOne(tokenId);
            let user = await usersTable.getOne(tokenRecord.userid);
            if (user) {
                delete user.password; //removes pw from user object on server
                return done(null, user);// after this, req.user is SET
            } else {
                return done(null, false, { message: 'Invalid token' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    app.use(passport.initialize());
}

export default configurePassport;