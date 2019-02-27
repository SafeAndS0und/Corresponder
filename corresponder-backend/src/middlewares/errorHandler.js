module.exports = {

   asyncWrapper(fn){
      return (req, res, next) =>{
         fn(req, res, next).catch(next)
      }
   },

   logError(err, req, res, next){
      console.error('ERROR: ', err.message)
      next(err)
   },

   catchErr(err, req, res, next){
      res.send({error: err})
   }

}