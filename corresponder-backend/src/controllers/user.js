import mongoose from 'mongoose'
import User from '../models/User'


export default {
   async register(req, res, next){

      const rb = req.body

      const user = await new User({
         _id: mongoose.Types.ObjectId(),
         username: rb.username,
         firstname: rb.firstname,
         surname: rb.surname,
         profilePic: rb.profilePic = ""
      }).save()

      res.send('registered')

   }
}
