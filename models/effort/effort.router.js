import { Router } from 'express'
import { controllers } from './effort.controller'

const router = Router()

// /api/usr/effort
router.route('/')
// .get(controllers.getAll)

// .post(controllers.createOne)

export default router
