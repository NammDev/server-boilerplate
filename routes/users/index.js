const express = require('express')
const UserService = require('../../services/UserService')
const router = express.Router()

module.exports = (config) => {
  const userService = new UserService(config.postgres.client)

  router.post('/create', async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body)
      res.send(user)
    } catch (err) {
      return next(err)
    }
  })

  router.get('/all', async (req, res, next) => {
    try {
      const userList = await userService.getAllUsers()
      res.send(userList)
    } catch (err) {
      return next(err)
    }
  })

  router.get('/all/email', async (req, res, next) => {
    try {
      const userList = await userService.getAllUsersAttribute()
      res.send(userList)
    } catch (err) {
      return next(err)
    }
  })

  router.get('/findone', async (req, res, next) => {
    try {
      const user = await userService.findOneUser()
      res.send(user)
    } catch (err) {
      return next(err)
    }
  })

  router.get('/', async (req, res) => {
    try {
      const user = await userService.getUser()
      res.json(user)
    } catch (err) {
      return next(err)
    }
  })
  return router
}
