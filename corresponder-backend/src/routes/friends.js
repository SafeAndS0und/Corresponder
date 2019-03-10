import friendsController from '../controllers/friend/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()


Router.get('/', asyncWrapper(friendsController.getList))

Router.get('/:name', asyncWrapper(friendsController.search))

Router.post('/', asyncWrapper(friendsController.add))

Router.delete('/', asyncWrapper(friendsController.remove))


export default Router