module.exports = {

   asyncWrapper(fn){ // Pass it a function
      return (req, res, next) =>{ //
         fn(req, res, next).catch(err => next(err))
      }
   },

   logError(err, req, res, next){
      console.error('ERROR: ', err)
      next(err)
   },

   catchErr(err, req, res, next){
      res.status(err.status ? err.status : 404).json(err.message)
   }

}