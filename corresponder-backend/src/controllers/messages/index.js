import mongoose from 'mongoose'
import Message from '../../models/Message'
import jwt from 'jsonwebtoken'
import roomMsgsController from './roomMessages'
import conversationController from './conversation'

export default {

   async addNewRoomMsg(req, res, next){
      const {_id} = jwt.decode(req.headers.authorization)

      const message = await new Message({
         _id: new mongoose.Types.ObjectId,
         owner: _id,
         content: req.body.content
      })
      await message.save()

      await roomMsgsController.addMsgToList(req.body.parent, message._id)

      res.json({
         msg: "Added",
         message
      })
   },

   async addNewFriendMsg(req, res, next){
      const {_id} = jwt.decode(req.headers.authorization)

      const message = await new Message({
         _id: new mongoose.Types.ObjectId,
         owner: _id,
         content: req.body.content
      })
      await message.save()

      await conversationController.addMsgToList({userA: _id, userB: req.body.parent}, message._id)

      res.json({
         msg: "Added",
         message
      })
   },

   async getRoomMsgs(req, res, next){
      const {messages: messageIds} = await roomMsgsController.findById(req.params.id)
      const messages = await Message.find({_id: messageIds}).populate('owner') // Like joining in SQL
      res.send(messages)
   },

   async getFriendMsgs(req, res, next){

   },

   async remove(req, res, next){
      const deletedMsg = await Message.deleteOne({_id: req.body._id})

      res.status(200).send({
         deletedCount: deletedMsg.deletedCount
      })

   }
}