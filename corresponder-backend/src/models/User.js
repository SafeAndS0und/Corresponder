import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
   _id: Schema.Types.ObjectId,
   firstname: String,
   surname: String,
   username: String,
   password: String,
   profilePic: String
}, {
   timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User