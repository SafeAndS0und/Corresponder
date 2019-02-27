import userRouter from './user'
import errorHandler from '../middlewares/errorHandler'
const Router = require('express').Router()

// Mix mini-routers into the main one
Router.use('/user', userRouter)


// deal with errors
Router.use(errorHandler.catchAsyncErr)

export default Router