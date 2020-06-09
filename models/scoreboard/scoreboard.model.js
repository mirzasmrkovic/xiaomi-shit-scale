import mongoose from 'mongoose'
import { Participant } from './models/participant/participant.model'

const scoreboardSchema = new mongoose.Schema({
  scoreboard: [Participant]
})

export const Scoreboard = mongoose.model('scoreboard', scoreboardSchema)
