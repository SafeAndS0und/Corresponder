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
      const conversation = await this.findByUsersIds(userIds)
      conversation.messages.push(message)
      await conversation.save()
   },

   async findByUsersIds({userA, userB}){
      return await Conversation.findOne({ $or: [ { userA, userB }, { userA: userB, userB: userA} ] })
   }


}