import express from 'express'
import path from 'path'
import socket from 'socket.io'
import { connect } from './utils/db.js'

const app = express()
const port = process.env.PORT || 3000
const dbPort =
  process.env.DB_PORT || 'mongodb://localhost:27017/xiaomi-scoreboard'

app.use(express.static(path.join(__dirname, 'client/build')))

const getApiAndEmit = socket => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit('entry', response)
}

export const start = async () => {
  try {
    await connect(dbPort)
    const server = app.listen(port, () => {
      console.log(`REST API listening on port ${port}`)
    })
    const io = socket(server)
    let interval
    io.on('connection', socket => {
      console.log('made socket connection', socket.id)
      if (interval) {
        clearInterval(interval)
      }
      interval = setInterval(() => getApiAndEmit(socket), 1000)
      socket.on('disconnect', () => {
        console.log('Client disconnected')
        clearInterval(interval)
      })
    })
  } catch (e) {
    console.error(e)
  }
}
