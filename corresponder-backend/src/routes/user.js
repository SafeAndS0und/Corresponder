import userController from '../controllers/user'
const Router = require('express').Router()

Router.post('/', userController.register)
export default Router