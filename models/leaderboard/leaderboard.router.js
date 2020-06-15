import { Router } from 'express'
import { controllers } from './leaderboard.controller'

const router = Router()

// /api/scale/scoreboar
router
  .route('/')
  .get(controllers.getAll)

  .post(controllers.createOne)

export default router
