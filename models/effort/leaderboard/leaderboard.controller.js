import { Effort } from '../effort.model'
import R from 'ramda'

export const getLeaderboard = async (req, res) => {
  try {
    const docs = await Effort.aggregate([
      {
        $group: {
          _id: '$uid',
          best: { $max: '$score' }
        }
      }
    ]).sort('-best')

    return res.status(200).json({ data: docs })
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}

export const getTopTen = async (req, res) => {
  try {
    const docs = await Effort.aggregate([
      {
        $group: {
          _id: '$uid',
          best: { $max: '$score' }
        }
      }
    ])
      .sort('-best')
      .limit(10)
    return res.status(200).json({ data: docs })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}
