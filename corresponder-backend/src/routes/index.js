const Router = require('express').Router()
import userController from '../controllers/user'

Router.get('*', userController.sayHi)

export default Router