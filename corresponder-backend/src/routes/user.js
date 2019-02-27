import userController from '../controllers/user'
const Router = require('express').Router()
import {asyncWrapper} from '../middlewares/errorHandler'

Router.post('/', asyncWrapper(userController.register))
export default Router