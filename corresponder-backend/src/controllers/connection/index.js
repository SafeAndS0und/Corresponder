import mongoose from 'mongoose'
import Connection from '../../models/Connection'

export default {

   async registerUser(id){
      const con = await new Connection({
         _id: new mongoose.Types.ObjectId,
         userId: id
      }).save()
   },

   async addNewRoom(room, id){
      const con = await Connection.findOne({userId: id}) // find which user we're talking about - from the token
      con.rooms.push(room._id) // push chosen room id to the array
      con.save()
   }

}