import { Router } from 'express'
import { controllers } from './user.controller'

const router = Router()

// /api/usr
router
  .route('/')
  .get(controllers.getOne)

  .post(controllers.createOne)

export default router
