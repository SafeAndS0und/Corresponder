import messagesController from '../controllers/messages/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()

Router.get('/', asyncWrapper(messagesController.getList))
Router.post('/', asyncWrapper(messagesController.addNew))
Router.delete('/', asyncWrapper(messagesController.remove))

export default Router