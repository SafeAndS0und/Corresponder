import userController from '../controllers/user'
const Router = require('express').Router()
import {asyncWrapper} from '../middlewares/errorHandler'

Router.post('/', asyncWrapper(userController.register))
Router.post('/login', asyncWrapper(userController.login))
Router.delete('/', asyncWrapper(userController.remove))
Router.patch('/', asyncWrapper(userController.update))

export default Router