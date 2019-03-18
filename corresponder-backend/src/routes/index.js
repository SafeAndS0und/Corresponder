import userRouter from './user'
import roomsRouter from './rooms'
import friendsRouter from './friends'
import messagesRouter from './messages'
import errorHandler from '../middlewares/errorHandler'
const Router = require('express').Router()

// Mix mini-routers into the main one
Router.use('/user', userRouter)
Router.use('/rooms', roomsRouter)
Router.use('/friends', friendsRouter)
Router.use('/messages', messagesRouter)


// Deal with errors by a router-level error handler
Router.use(errorHandler.logError)
Router.use(errorHandler.catchErr)

export default Router