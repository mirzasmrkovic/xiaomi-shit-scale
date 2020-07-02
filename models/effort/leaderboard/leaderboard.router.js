import { Router } from 'express'
import { getLeaderboard, getTopTen } from './leaderboard.controller'

const router = Router()

// /leaderboard
router
  .route('/')

  .get(getTopTen)

router
  .route('/all')

  .get(getLeaderboard)

export default router
