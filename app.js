// Setup
const express = require('express')
const app = express()

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
