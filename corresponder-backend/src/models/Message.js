import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
   _id: Schema.Types.ObjectId,
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   content: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const Message = new mongoose.model('Message', messageSchema)

export default Message