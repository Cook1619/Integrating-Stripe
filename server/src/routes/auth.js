import { Router } from 'express';
import passport from 'passport';
import { encode } from '../utils/tokens';
import { generateHash } from '../utils/hash';

let router = Router();

//actually /api/auth.login
router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            console.log('Coming from router.post in Auth.js')
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});

router.get('/generate/:pw', (req,res,next) => {
    generateHash(req.params.pw)
    .then((hash) => {
        res.send(hash);
    }).catch((err) => {
        next(err);
    });
})

export default router;