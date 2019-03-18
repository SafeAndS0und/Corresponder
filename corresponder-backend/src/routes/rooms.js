import roomController from '../controllers/rooms/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()


Router.post('/new', asyncWrapper(roomController.createNew))

Router.post('/', asyncWrapper(roomController.add))

Router.get('/:name', asyncWrapper(roomController.search))

Router.get('/', asyncWrapper(roomController.getList))

Router.patch('/', asyncWrapper(roomController.update))

Router.delete('/', asyncWrapper(roomController.remove))

Router.delete('/fromList', asyncWrapper(roomController.removeFromTheList))




export default Router