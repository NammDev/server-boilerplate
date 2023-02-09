const express = require('express')
const UserService = require('../../services/UserService')
const router = express.Router()

module.exports = (config) => {
  const userService = new UserService(config.postgres.client)
  router.get('/', async (req, res) => {
    try {
      const user = await userService.getUser()
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  })
  return router
}
