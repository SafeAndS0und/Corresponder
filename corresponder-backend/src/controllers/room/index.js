import mongoose from 'mongoose'
import Room from '../../models/Room'
import conController from '../connection/index'
import jwt from 'jsonwebtoken'

export default {

   async createNew(req, res, next){

      //TODO: Hash the password

      const rb = req.body

      const {_id} = jwt.decode(req.headers.authorization) // decoded token to get the id

      const room = await new Room({
         _id: new mongoose.Types.ObjectId,
         name: rb.name,
         description: rb.description,
         owner: _id,
         password: rb.password,
         themeColor: rb.themeColor,
         uniqueHref: rb.uniqueHref
      }).save()

      await conController.addNewRoom(room, _id)

      res.json({
         msg: 'Successfully added new room',
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
      const rooms = await Room.find({
         name: new RegExp(`${req.params.name}`, 'i')
      }, 'name description owner themeColor uniqueHref _id').limit(10)

      res.json({rooms})
   },

   async getList(req, res, next){
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id
      const connection = await conController.findByUserId(decoded._id)

      const roomList = await Room.find({_id: connection.rooms}) // returns all the rooms for the specific user
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
            uniqueHref: rb.uniqueHref
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
      const decoded = jwt.decode(req.headers.authorization) // decoded token to get the id TODO: EXTRACT IT

      await conController.remove(decoded._id, req.body.id, 'rooms')
      res.json(204)
   }

}