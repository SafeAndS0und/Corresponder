import mongoose from 'mongoose'
import User from '../models/User'

export default {
   async register(req, res, next){

      const rb = req.body

      next('somting went wong!!!')
      // const user = await new User({
      //    _id: mongoose.Types.ObjectId(),
      //    username: rb.username,
      //    firstname: rb.firstname,
      //    surname: rb.surname,
      //    profilePic: rb.profilePic = ""
      // }).save()
      //
      // console.log(user)
      //
      //
      // res.send('registered')

   }
}
