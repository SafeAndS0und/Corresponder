import mongoose from 'mongoose'
import Connection from '../../models/Connection'
import MessageList from '../messages/messageList'


export default {

   async registerUser(id, next){
      await new Connection({
         _id: new mongoose.Types.ObjectId,
         userId: id
      }).save(err => {
         if(err) next(err)
      })

      await MessageList.initMsgList('friend', id, next)
   },

   async addNewRoom(room, id){
      const con = await Connection.findOne({userId: id}) // find which user we're talking about - from the token
      con.rooms.push(room._id) // push chosen rooms id to the array
      con.save()
   },

   async addFriend(req, res, next ){
      const con = await Connection.findOne({userId: id}) // find which user we're talking about - from the token
      con.friends.push(friend._id) // push chosen rooms id to the array
      con.save()
   },

   async findByUserId(id){
      return await Connection.findOne({userId: id})
   },

   async remove(userId, objId, property){
      const user = await Connection.findOne({userId})
      const index = user[property].indexOf(objId)
      user[property].splice(index, 1)
      await user.save()
   }

}