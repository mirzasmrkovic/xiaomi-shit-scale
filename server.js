import express from 'express'
import path from 'path'
import { connect } from './utils/db.js'

const server = express()
const port = process.env.PORT || 3000
const dbPort =
  process.env.DB_PORT || 'mongodb://localhost:27017/xiaomi-scoreboard'

server.use(express.static(path.join(__dirname, 'client/build')))
// server.get('/', async (req, res) => {

// })

export const start = async () => {
  try {
    await connect(dbPort)
    server.listen(port, () => {
      console.log(`REST API listening on port ${port}`)
    })
  } catch (e) {
    console.error(e)
  }
}
