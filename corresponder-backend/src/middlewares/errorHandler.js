export default {
   catchAsyncErr(err, req, res, next){
      console.log('im an error handler')
      res.send({error: err})
   }
}