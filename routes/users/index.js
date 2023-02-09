const express = require('express')
const UserService = require('../../services/UserService')
const router = express.Router()

module.exports = (config) => {
  const userService = new UserService(config.postgres.client)
  userService.getClient()
  router.get('/', async (req, res) => {
    try {
      const todo = await userService.getUser()
      res.send(todo)
    } catch (error) {
      console.log(error)
    }
  })
  return router
}
