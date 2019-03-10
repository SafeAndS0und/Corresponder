import mongoose from 'mongoose'
import conController from '../connection/index'
import User from '../../models/User'
import jwt from 'jsonwebtoken'
import Room from "../../models/Room"

export default {

   async getOne(req, res, next){

   },

   async add(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(decoded._id)

      connection.friends.push(new mongoose.Types.ObjectId(req.body.id))
      await connection.save()

      res.sendStatus(204)
   },

   async getList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(decoded._id)

      const user = await User.find({_id: connection.friends})
      res.send(user)
   },

   async search(req, res, next){

      const friends = await User.find(
         {username: new RegExp(`${req.params.name}`, 'i')},
         'username firstname surname profilePic _id')

      res.json({friends})
   },

   async remove(req, res, next){

   }

}