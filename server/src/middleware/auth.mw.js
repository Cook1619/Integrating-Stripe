import passport from 'passport';

function tokenMiddleware(req, res, next) {
    passport.authenticate('bearer', { session: false })(req, res, next);
    console.log('Success from tokenMiddleWare');
}

function isLoggedIn(req, res, next) {
    if (req.user) {
        console.log('Sucess from isLOggedIn');

        next();
    } else {
        console.log('error logging in from isLoggedIn function')
        res.sendStatus(401);
    }
}

export { tokenMiddleware, isLoggedIn };