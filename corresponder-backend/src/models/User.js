import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
      _id: Schema.Types.ObjectId,
      firstname: String,
      surname: String,
      username: {
         type: String,
         required: true,
         unique: true,
         minlength: 3,
         maxlength: 100
      },
      password: {
         type: String,
         required: true,
         minlength: 5
      },
      profilePic: String
   },
   {
      timestamps: true
   })

const User = mongoose.model('User', userSchema)

export default User