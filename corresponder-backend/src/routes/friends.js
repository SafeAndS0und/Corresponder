import friendsController from '../controllers/friend/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()


Router.get('/', asyncWrapper(friendsController.getList))

Router.post('/', asyncWrapper(friendsController.addFriend))

Router.delete('/', asyncWrapper(friendsController.remove))


export default Router