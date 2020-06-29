require('dotenv').config()
import express from 'express'
import path from 'path'
import socket from 'socket.io'
import { connect } from './utils/db.js'
import { connectPeripheral } from './utils/peripheral'
import { protect, login, signup } from './utils/auth'

import userRouter from './models/user/user.router'
import effortRouter from './models/effort/effort.router'

const app = express()
const port = process.env.PORT || 3001
const dbPort =
  process.env.DB_PORT || 'mongodb://localhost:27017/xiaomi-scoreboard'

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.json())

// Auth
app.use('/signup', signup)
app.use('/login', login)
app.use('/api/', protect)

// Api
app.use('/api/usr/', userRouter)
app.use('/api/effort', effortRouter)

export const start = async () => {
  try {
    await connect(dbPort)
    const server = app.listen(port, () => {
      console.log(`REST API listening on port ${port}`)
    })
    const io = socket(server)
    io.on('connection', socket => {
      console.log('made socket connection', socket.id)

      connectPeripheral('e0ff1a5adf4f43ea87fd067f66ce3395', data => {
        socket.emit('weight', data)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  } catch (e) {
    console.error(e)
  }
}
