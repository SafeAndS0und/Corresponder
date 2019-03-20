import friendsController from '../controllers/friends/index'
import {asyncWrapper} from '../middlewares/errorHandler'
const Router = require('express').Router()


Router.get('/', asyncWrapper(friendsController.getList))

Router.get('/:name', asyncWrapper(friendsController.search))

Router.post('/', asyncWrapper(friendsController.add))

Router.delete('/', asyncWrapper(friendsController.remove))

// TODO: while adding friends you need to see if the friend wasnt in our friend list before
// And you shouldn't create another conversation
// The same with rooms probably
Router.delete('/fromList', asyncWrapper(friendsController.removeFromTheList))


export default Router