import mongoose from 'mongoose'

const Schema = mongoose.Schema

const conversationSchema = new Schema({
   _id: Schema.Types.ObjectId,
   userA: {
      type: Schema.Types.ObjectId,
      ref: "User"
   },
   userB: {
      type: Schema.Types.ObjectId,
      ref: "User"
   },
   messages: [{
      type: Schema.Types.ObjectId,
      ref: "Message"
   }]

}, {
   timestamps: false
})

const Conversation = new mongoose.model('Conversation', conversationSchema, 'conservations')

export default Conversation