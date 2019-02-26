import User from '../models/User'

export default {
   sayHi(req, res, next){
      console.log(User)
      res.send('hi')
   }
}
