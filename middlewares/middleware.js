const {body} = require('express-validator');





const validate =() => {
    const validation= [body('name')
                    .notEmpty()
                    .withMessage('required')
                    .isLength({min:2})
                    .withMessage('at least 2 digits'),
                body('price')
                    .notEmpty()
                    .withMessage('required') ];
                    return validation;
}


module.exports = {validate}