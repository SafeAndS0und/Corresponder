import roomController from '../controllers/room/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()


Router.post('/', asyncWrapper(roomController.createNew))

Router.get('/:name', asyncWrapper(roomController.search))

Router.get('/', asyncWrapper(roomController.getList))

Router.patch('/', asyncWrapper(roomController.update))

Router.delete('/', asyncWrapper(roomController.remove))



export default Router