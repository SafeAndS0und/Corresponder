import mongoose from 'mongoose'
import conController from '../connection/index'
import User from '../../models/User'
import jwt from 'jsonwebtoken'
import conversationController from '../messages/conversation'

export default {

   async add(req, res, next){
      const {_id} = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(_id)

      connection.friends.push(new mongoose.Types.ObjectId(req.body.id))
      await connection.save()

      await conversationController.initConversation(_id, req.body.id) // initalize the conversation in database, messages are empty for now

      res.sendStatus(204)
   },

   async getList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(decoded._id)

      const user = await User.find({_id: connection.friends})
      res.send(user)
   },

   async search(req, res, next){

      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const {friends: userFriendsList} = await conController.findByUserId(decoded._id)

      const userFriendsList_str = userFriendsList.map(id => `${id}`) // WEIRD - needed to cast it to string to filter it later

      const foundUserList = await User.find({
         username: new RegExp(`${req.params.name}`, 'i')
      }, 'username firstname surname profilePic _id').limit(10)

      // only return the rooms that user doesn't have in his list already
      const friends = foundUserList.filter(user => !userFriendsList_str.includes(`${user._id}`))

      res.json({friends})
   },

   async removeFromTheList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization)

      await conController.remove(decoded._id, req.body.id, 'friends')
      res.json(204)
   }

}