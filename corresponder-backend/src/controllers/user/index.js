import mongoose from 'mongoose'
import User from '../../models/User'
import conController from '../connection/index'
import jwt from 'jsonwebtoken'


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

      await conController.registerUser(user._id)

      res.json({
         msg: 'Registered successfully',
         user
      })

   },


   async login(req, res, next){

      const user = await User.findOne({
         username: req.body.username, password: req.body.password
      })

      const token = await jwt.sign(
         {
            _id: user._id
         },
         'superPrivate', // TODO: ekhm
         {
            expiresIn: 3600 * 2
         }
      )
      user
         ? res.status(200).send({
            msg: "Logged in",
            token
         })
         : res.status(404).send('Wrong credentials')
   },


   async update(req, res, next){

      const rb = req.body

      if(!rb.username) next({message: 'Incorrect Username'})

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


   async verifyToken(req, res, next){
      const decoded = await jwt.verify(req.params.token, 'superPrivate')
      res.status(200).send({verified: true, expiresAt: decoded.exp})
   }
}
