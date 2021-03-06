import mongoose from 'mongoose'
import Room from '../../models/Room'
import conController from '../connection/index'
import RMList from '../messages/roomMessages'
import jwt from 'jsonwebtoken'

export default {

   async createNew(req, res, next){

      const rb = req.body

      const {_id} = jwt.decode(req.headers.authorization) // decoded token to get the id

      const room = await new Room({
         _id: new mongoose.Types.ObjectId,
         name: rb.name,
         description: rb.description,
         owner: _id,
         password: rb.password,
         themeColor: rb.themeColor,
         uniqueHref: rb.uniqueHref,
         profilePic: rb.profilePic
      }).save()

      await conController.addNewRoom(room, _id)
      await RMList.initMsgList(room._id, next)

      res.json({
         msg: 'Successfully added new rooms',
         room
      })
   },

   async add(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(decoded._id)

      connection.rooms.push(new mongoose.Types.ObjectId(req.body.id))
      await connection.save()

      res.sendStatus(204)
   },

   async search(req, res, next){
      // const fixedStr = req.params.name.replace('_', ' ') // Tesla_Lovers => Tesla Lovers (as in database)

      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const {rooms: userRoomList} = await conController.findByUserId(decoded._id)

      const userRoomList_str = userRoomList.map(id => `${id}`) // WEIRD - needed to cast it to string to filter it later

      const foundRoomList = await Room.find({
         name: new RegExp(`${req.params.name}`, 'i')
      }, 'name description owner themeColor uniqueHref _id').limit(10)

      // only return the rooms that user doesn't have in his list already
      const rooms = foundRoomList.filter(room => !userRoomList_str.includes(`${room._id}`))

      res.json({rooms})
   },

   async getList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const {rooms} = await conController.findByUserId(decoded._id)

      const roomList = await Room.find({_id: rooms}) // returns all the rooms for the specific user
      res.json({roomList})
   },

   async update(req, res, next){

      const rb = req.body

      await Room.updateOne(
         {
            name: rb.name
         },
         {
            name: rb.name,
            description: rb.description,
            themeColor: rb.themeColor,
            password: rb.password,
            uniqueHref: rb.uniqueHref,
            profilePic: rb.profilePic
         }
      )

      res.send('Patched')
   },

   async remove(req, res, next){
      await Room.deleteOne({
         name: req.body.name
      })

      res.sendStatus(204)
   },

   async removeFromTheList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization)

      await conController.remove(decoded._id, req.body.id, 'rooms')
      res.json(204)
   }

}