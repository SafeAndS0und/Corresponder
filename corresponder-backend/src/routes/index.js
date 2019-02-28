import userRouter from './user'
import roomsRouter from './rooms'
import errorHandler from '../middlewares/errorHandler'
const Router = require('express').Router()

// Mix mini-routers into the main one
Router.use('/user', userRouter)
Router.use('/rooms', roomsRouter)


// Deal with errors by a router-level error handler
Router.use(errorHandler.logError)
Router.use(errorHandler.catchErr)

export default Router