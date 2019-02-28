import userController from '../controllers/user/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()

Router.post('/', asyncWrapper(userController.register))
Router.post('/login', asyncWrapper(userController.login))
Router.delete('/', asyncWrapper(userController.remove))
Router.patch('/', asyncWrapper(userController.update))

export default Router