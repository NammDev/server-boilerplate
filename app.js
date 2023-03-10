// Setup
const express = require('express')
const app = express()
const config = require('./config')[process.env.NODE_ENV || 'development']
const log = config.log()

// Connect DB
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(config.postgres.options)
function connectDb() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error)
    })
  return sequelize
}
const postgresClient = connectDb()
config.postgres.client = postgresClient

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
const routes = require('./routes')
// Serices
const TodoService = require('./services/TodoService')
const todoService = new TodoService()

// Use Route & Service
app.use('/', routes(config))

// Listen
port = process.env.PORT || 3000
app.listen(port, () => {
  log.info(`Example app listening on port ${port}`)
})
