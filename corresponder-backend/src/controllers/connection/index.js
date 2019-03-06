import mongoose from 'mongoose'
import Connection from '../../models/Connection'

export default {

   async addNewRoom(req, res, next){
      const con = await new Connection({
         _id: new mongoose.Types.ObjectId,
         userId: "5c76ca95da313c0e54f67a8c",
         rooms: ["5c781319e99f512e642f069e", "5c781cc3fa7058370075d14d"],
         friends: ["5c780f46a4511819c48c60c2"]
      }).save()
   }

}