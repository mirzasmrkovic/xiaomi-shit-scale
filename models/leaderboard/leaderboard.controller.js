import { Leaderboard } from './leaderboard.model'

export const getLeaderboard = model => async (req, res) => {
  try {
    const doc = await model.find()
    if (!doc) return res.status(400).end()
    res.status(200).json({ data: doc })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const crudControllers = model => {
  getAll: getAll(model)
}

export const controllers = crudControllers(Leaderboard)
