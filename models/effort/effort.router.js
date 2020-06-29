import { Router } from 'express'
import { controllers } from './effort.controller'

const router = Router()

// /api/effort
router
  .route('/')

  .get(controllers.getMany)

router.use('/', controllers.statusActive)
// /api/effort/initiate
router.use('/initiate', controllers.commenceEffort)
router.route('/initiate').post(controllers.createOne) // commence an effort

// /api/effort/conclude
router.route('/conclude').put(controllers.concludeEffort) // conclude an effort

// /api/effort/:id
router
  .route('/:id')

  .get(controllers.getOne)

export default router
