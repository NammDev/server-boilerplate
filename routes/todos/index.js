const express = require('express')
const TodoService = require('../../services/TodoService')
const router = express.Router()

module.exports = (config) => {
  const todoService = new TodoService(config.postgres.client)
  router.get('/', async (req, res) => {
    try {
      const todo = await todoService.getTodo()
      res.send(todo)
    } catch (error) {
      console.log(error)
    }
  })
  return router
}
