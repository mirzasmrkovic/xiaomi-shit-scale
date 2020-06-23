import mongoose from 'mongoose'
import { effortSchema } from '../effort/effort.model'
const Schema = mongoose.Schema

const leaderboardSchema = new Schema({
  leaderboard: [effortSchema],
  scaleID: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Participant'
  }
})

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
