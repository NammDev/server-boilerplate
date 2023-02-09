// Setup
const express = require('express')
const app = express()
const config = require('./config')[process.env.NODE_ENV || 'development']

// Connect DB
const { Sequelize } = require('sequelize')

async function connectDb() {
  const sequelize = new Sequelize(config.postgres.options) // Example for postgres
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

config.postgres.client = connectDb()

// Routes
const routes = require('./routes')
// Serices
const TodoService = require('./services/TodoService')
const todoService = new TodoService()

app.use('/', routes({ todoService }))

// Listen
port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
