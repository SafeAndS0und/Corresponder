import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageListSchema = new Schema({
   _id: Schema.Types.ObjectId,
   type: String,
   parent: Schema.Types.ObjectId,
   messages: [Schema.Types.ObjectId]
}, {
   timestamps: false
})

const MessageList = new mongoose.model('MessageList', messageListSchema, 'message-list')

export default MessageList