import { Effort } from './effort.model'
import { crudControllers } from '../../utils/crud'

const activeEffortSize = async uid => {
  return await Effort.countDocuments(
    {
      uid: uid,
      status: 'active'
    },
    (err, count) => console.log(`user ${uid} has ${count} active efforts`)
  )
    .lean()
    .exec()
}

const statusActive = async (req, res, next) => {
  console.log('statusActive')
  const statusActive = await activeEffortSize(req.user._id)
  req.statusActive = statusActive
  next()
}

const commenceEffort = async (req, res, next) => {
  console.log('commence')
  if (req.statusActive !== 0) return res.status(400).end()
  next()
}

const concludeEffort = async (req, res) => {
  console.log('conclude')
  if (req.statusActive !== 1) return res.status(400).end()
  try {
    const effort = await Effort.findOne({ uid: req.user._id, status: 'active' })
      .lean()
      .exec()

    const updated = await Effort.findOneAndUpdate(
      { uid: req.user._id, status: 'active' },
      {
        ...req.body,
        status: 'concluded',
        score: effort.commence - req.body.conclude
      },
      { new: true }
    )
    return res.status(200).send({ data: updated })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

export const controllers = {
  ...crudControllers(Effort),
  statusActive: statusActive,
  commenceEffort: commenceEffort,
  concludeEffort: concludeEffort
}
