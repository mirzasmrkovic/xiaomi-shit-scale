import express from 'express'
import path from 'path'
import socket from 'socket.io'
import { connect } from './utils/db.js'
import { connectPeripheral } from './utils/peripheral'

const app = express()
const port = process.env.PORT || 3001
const dbPort =
  process.env.DB_PORT || 'mongodb://localhost:27017/xiaomi-scoreboard'

app.use(express.static(path.join(__dirname, 'client/build')))

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
