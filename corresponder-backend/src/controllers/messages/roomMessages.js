import mongoose from 'mongoose'
import RoomMessages from '../../models/RoomMessages'

export default {

   async initMsgList(room, next){
      await new RoomMessages({
         _id: new mongoose.Types.ObjectId,
         room
      })
         .save(err =>{
            if(err) next(err)
         })
   },

   async addMsgToList(room, msg){
      const roomMessages = await RoomMessages.findOne({room})
      roomMessages.messages.push(msg)
      await roomMessages.save()
   },

   async findById(room){
      return await RoomMessages.findOne({room})
   }

}