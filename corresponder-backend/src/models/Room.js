import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roomSchema = new Schema({
   _id: Schema.Types.ObjectId,
   name: {
      type: String,
      required: true,
      unique: true
   },
   description: String,
   owner: String,
   password: String,
   themeColor: String,
   profilePic: String,
   uniqueHref: {
      type: String,
      unique: true
   }

}, {
   timestamps: true
})

const Room = mongoose.model('Room', roomSchema)

export default Room