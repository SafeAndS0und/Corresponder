import mongoose from 'mongoose'
import Message from '../../models/Message'
import jwt from 'jsonwebtoken'
import MLController from './messageList'

export default {

   async addNew(req, res, next){
      const {_id} = jwt.decode(req.headers.authorization)

      const message = await new Message({
         _id: new mongoose.Types.ObjectId,
         owner: _id,
         content: req.body.content
      })

      await message.save()

      await MLController.addMsgToList(req.body.parent, message._id)

      res.json({
         msg: "Added",
         message
      })

   },

   async getList(req, res, next){
      const {_id} = jwt.decode(req.headers.authorization)
      
   },

   async remove(req, res, next){
      const deletedMsg = await Message.deleteOne({_id: req.body._id})

      res.status(200).send({
         deletedCount: deletedMsg.deletedCount
      })

   }
}