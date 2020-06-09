import { Router } from 'express'
import { controllers } from './participant.controller'

const router = Router()

// /api/restaurant
router
  .route('/')
  .get(controllers.getAll)

  .post(controllers.createOne)

export default router
