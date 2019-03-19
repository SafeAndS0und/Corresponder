import mongoose from 'mongoose'
import Conversation from '../../models/Conversation'

export default {

   async initConversation(userA, userB, next){
      await new Conversation({
         _id: new mongoose.Types.ObjectId,
         userA,
         userB
      })
         .save(err =>{
            if(err) next(err)
         })
   },

   async addMsgToList(userIds, message){
      const conversationId = await this.findByUsersIds(userIds)
      const con = await Conversation.findById(conversationId)
      con.messages.push(message)
      await con.save()
   },

   async findByUsersIds({userA, userB}){
      const conv = await Conversation.findOne({userA, userB})
      return conv._id
   }


}