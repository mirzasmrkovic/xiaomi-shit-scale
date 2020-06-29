import { Router } from 'express'
import { controllers, me } from './user.controller'

const router = Router()

// /api/usr
router
  .route('/')
  .get(me)

  .post(controllers.createOne)

export default router
