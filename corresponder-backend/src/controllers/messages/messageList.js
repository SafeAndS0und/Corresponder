import mongoose from 'mongoose'
import MessageList from '../../models/MessageList'

export default {

   async initMsgList(type, parent, next){
      const messageList = await new MessageList({
         _id: new mongoose.Types.ObjectId,
         type,
         parent
      })
         .save(err => {
         if(err) next(err)
      })
   },

   async addMsgToList(parent, msg){
      const messageList = await MessageList.find({parent})
      messageList.messages.push(msg)
      await messageList.save()
   }

}