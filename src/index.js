const express = require('express')
const app = express()
const db = require('../db/db')
const PORT = 3000

// use 
app.use(express.json())

// hello
app.get('/api/hello', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'hello'
  })
})

app.get('/api/users', (req, res) => {
  const users = [
    {name: 'jon', age: 22},
    {name: 'due', age: 22},
    {name: 'steve', age: 22},
    {name: 'max', age: 22},
  ]

  res.status(200).send({
    success: true,
    data: users,
    message: 'Data Berhasil Di Ambil'
  })
})


// API todo
// GET
app.get('/api/todos', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'todo berhasil di ambil',
    data: db
  })
})

// POST
app.post('/api/todos', (req, res) => {
  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description,
  }

  db.push(todo)

  res.status(201).send({
    success: true,
    message: 'todo berhasil di tambah',
    data: todo
  })
})

// GET BY ID
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  db.find((todo) => {
    if (todo.id === id) {
      res.status(200).send({
        success: true,
        message: 'todo berhasil di ambil',
        data: todo
      })
    }
  })

  res.status(404).send({
    success: false,
    message: 'todo tidak di temukan',
  })
})

// DELETE
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const findTodoIndex = db.findIndex(todo => todo.id === id)
  db.splice(findTodoIndex, 1)

  res.status(200).send({
    success: true,
    message: 'todo berhasil di hapus',
  })
})

// EDIT
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const findTodo = db.find(todo => todo.id === id)
  const findTodoIndex = db.findIndex(todo => todo.id === id)

  if (!findTodo) {
    res.status(404).send({
      success: false,
      message: 'todo tidak di temukan',
    })
  }

  const updatedTodo = {
    id: findTodo.id,
    title: req.body.title || findTodo.title,
    description: req.body.description || findTodo.description,
  }

  db.splice(findTodoIndex, 1, updatedTodo)

  res.status(201).send({
    success: true,
    message: 'todo berhasil di update',
    data: updatedTodo
  })

})

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`)
})