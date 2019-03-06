import userController from '../controllers/user/index'
import {asyncWrapper} from '../middlewares/errorHandler'
import {register} from '../middlewares/userValidation'
const Router = require('express').Router()

Router.post('/', register, asyncWrapper(userController.register))
Router.post('/login', asyncWrapper(userController.login))
Router.delete('/', asyncWrapper(userController.remove))
Router.patch('/', asyncWrapper(userController.update))

Router.get('/token/:token', asyncWrapper(userController.verifyToken))

export default Router