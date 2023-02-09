// Setup
const express = require('express')
const app = express()

// Connect DB
const { Sequelize } = require('sequelize')

async function connectDb() {
  const sequelize = new Sequelize('postgres://postgres:namkhanh@localhost:5432/phongtro') // Example for postgres
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

connectDb()

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
