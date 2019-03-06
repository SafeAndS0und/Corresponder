import mongoose from 'mongoose'
import Room from '../../models/Room'
import conController from '../connection/index'

export default {

   async createNew(req, res, next){

      //TODO: Hash the password

      const rb = req.body

      const room = await new Room({
         _id: new mongoose.Types.ObjectId,
         name: rb.name,
         description: rb.description,
         owner: rb.owner,
         password: rb.password,
         themeColor: rb.themeColor,
         uniqueHref: rb.uniqueHref
      }).save()

      await conController.addNewRoom(room, "5c80193539247a02e80f86d4")

      res.json({
         msg: 'Successfully added new room',
         room
      })

   },

   async getOne(req, res, next){

      const fixedStr = req.params.name.replace('_', ' ') // Tesla_Lovers => Tesla Lovers (as in database)

      const room = await Room.findOne({
         name: fixedStr
      })
      res.json({room})
   },

   async getList(req, res, next){
      const rooms = await Room.find({}) // returns all the rooms TODO: what for?
      res.json({rooms})
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

   }

}