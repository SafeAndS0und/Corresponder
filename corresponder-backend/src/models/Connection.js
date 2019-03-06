import mongoose from 'mongoose'

const Schema = mongoose.Schema

const connectionSchema = new Schema({
      _id: Schema.Types.ObjectId,
      userId: Schema.Types.ObjectId,
      rooms: [Schema.Types.ObjectId],
      friends: [Schema.Types.ObjectId]
   },
   {
      timestamps: false
   })

const Connection = mongoose.model('Connection', connectionSchema)

export default Connection

