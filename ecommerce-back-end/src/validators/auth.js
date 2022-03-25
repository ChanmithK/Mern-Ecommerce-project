const {check, validationResult} = require('express-validator');
exports.validateSignupRequest = [
        check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
        check('lastName')
        .notEmpty()
        .withMessage('lastname is required'),
        check('email')
        .isEmail()
        .withMessage('email is required'),
        check('password')
        .isLength({min:6})
        .withMessage('password must be at least 6 character long')
    
];


exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 character long')

];


// uda karala tiyana errors ekin ekata pennanne me function eken. Ex:- mulinma enawa "firstName is required" . ita passse enawa "lastname is required".
//e wage piliwalata ekin eka weradi pennala denne me function eken
exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}