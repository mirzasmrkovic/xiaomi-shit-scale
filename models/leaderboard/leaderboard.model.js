import mongoose from 'mongoose'
import { Participant } from '../participant/participant.model'

const leaderboardSchema = new mongoose.Schema({
  leaderboard: [Participant],
  scaleID: {
    type: String,
    required: true
  },
  owner: {
    type: String
  }
})

export const Leaderboard = mongoose.model('leaderboard', leaderboardSchema)
