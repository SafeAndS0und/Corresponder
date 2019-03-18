import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
   _id: Schema.Types.ObjectId,
   owner: Schema.Types.ObjectId,
   content: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const Message = new mongoose.model('Message', messageSchema)

export default Message