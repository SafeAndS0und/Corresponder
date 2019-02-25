const Router = require('express').Router()

Router.get('*', (req, res) => res.send('Hello, look further!'))

export default Router