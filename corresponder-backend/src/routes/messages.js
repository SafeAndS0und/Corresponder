import messagesController from '../controllers/messages/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()

Router.get('/room/:id', asyncWrapper(messagesController.getRoomMsgs))
Router.get('/friend/:id', asyncWrapper(messagesController.getFriendMsgs))

Router.post('/room', asyncWrapper(messagesController.addNewRoomMsg))
Router.post('/friend', asyncWrapper(messagesController.addNewFriendMsg))

Router.delete('/', asyncWrapper(messagesController.remove))

export default Router