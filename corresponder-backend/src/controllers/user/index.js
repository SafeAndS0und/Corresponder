import mongoose from 'mongoose'
import User from '../../models/User'


export default {


   async register(req, res, next){

      // TODO: Bcrypt the password

      const rb = req.body

      const user = await new User({
         _id: mongoose.Types.ObjectId(),
         username: rb.username,
         firstname: rb.firstname,
         surname: rb.surname,
         password: rb.password,
         profilePic: rb.profilePic = ""
      }).save()

      res.json({
         msg: 'Registered successfully',
         user
      })

   },


   async login(req, res, next){

      // TODO: Assign token

      const user = await User.findOne({
         username: req.body.username, password:req.body.password
      })
      user
         ? res.send('Logged in')
         : res.status(404).send('Wrong credentials')
   },


   async update(req, res, next){

      const rb = req.body

      await User.updateOne(
         {
            username: rb.username
         },
         {
            username: rb.username,
            firstname: rb.firstname,
            surname: rb.surname,
            password: rb.password,
            profilePic: rb.profilePic = ""
         }
      )

      res.send('Patched')
   },


   async remove(req, res, next){
      await User.deleteOne({
         username: req.body.username
      })

      res.sendStatus(204)
   },
}
