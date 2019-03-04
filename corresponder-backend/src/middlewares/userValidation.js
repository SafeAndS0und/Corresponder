import { check, validationResult } from 'express-validator/check'

module.exports.register =  [
   check('password').exists().isLength({min: 5}).withMessage('Too short! 5 Characters minimum.'),
   check('username').exists().isLength({min: 3}).withMessage('Too short! 3 Characters minimum.'),
   function(req, res, next){
      if(!validationResult(req).isEmpty()){
         return res.status(400).json({
            errors: validationResult(req).array()
         })
      }
      next()
   }
]