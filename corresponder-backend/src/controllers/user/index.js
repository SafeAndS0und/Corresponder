import mongoose from 'mongoose'
import User from '../../models/User'
import conController from '../connection/index'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export default {

   async register(req, res, next){
      const rb = req.body

      const user = await new User({
         _id: mongoose.Types.ObjectId(),
         username: rb.username,
         firstname: rb.firstname,
         surname: rb.surname,
         password: await bcrypt.hash(rb.password, 6),
         profilePic: rb.profilePic = ""
      }).save()

      await conController.registerUser(user._id, next)

      res.json({
         msg: 'Registered successfully',
         user
      })

   },


   async login(req, res, next){
      const user = await User.findOne({
         username: req.body.username
      })

      let token

      if(user){
         const passwordOK = await bcrypt.compare(req.body.password, user.password)
         if(!passwordOK){
            return res.status(400).send('Wrong password')
         }

         token = await jwt.sign(
            {
               _id: user._id
            },
            'superPrivate', // TODO: ekhm
            {
               expiresIn: 3600 * 2
            }
         )
      }

      user
         ? res.status(200).send({
            msg: "Logged in",
            id: user._id,
            token,
            firstname: user.firstname,
            surname: user.surname
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
      res.status(200).send({verified: true, expiresAt: decoded.exp, id: decoded._id})
   }
}
