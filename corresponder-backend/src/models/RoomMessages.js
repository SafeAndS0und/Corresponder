import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roomMessagesSchema = new Schema({
   _id: Schema.Types.ObjectId,
   room: Schema.Types.ObjectId,
   messages: [Schema.Types.ObjectId]
}, {
   timestamps: false
})

const RoomMessages = new mongoose.model('RoomMessages', roomMessagesSchema, 'room-messages')

export default RoomMessages