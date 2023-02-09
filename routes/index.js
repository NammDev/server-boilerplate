const express = require('express')
const router = express.Router()

const todosRoute = require('./todos')

module.exports = (params) => {
  router.get('/', (req, res) => {
    res.send('Home Page')
  })

  router.use('/todo', todosRoute(params.todoService))

  return router
}
