import mongoose from 'mongoose'
import conController from '../connection/index'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

export default {

   async getOne(req, res, next){

   },

   async getList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(decoded._id)

      const user = await User.find({_id: connection.friends })
      res.send(user)
   },

   async remove(req, res, next){

   }

}