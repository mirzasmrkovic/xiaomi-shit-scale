import { User } from '../models/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
}
export const signIn = async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res
      .status(401)
      .send({ msg: 'Your username and password are required!' })

  const invalid = { msg: 'Username or password do not match!' }
  try {
    const user = await User.findOne({ username: req.body.username })
      .select('username password')
      .exec()
    if (!user) return res.status(401).send(invalid)

    user.checkPassword(req.body.password, function (err, isMatch) {
      if (err || !isMatch) throw err
      const token = newToken(user)
      return res.status(201).send({ token })
    })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const header = req.headers.authorization
  if (typeof header === 'undefined') return res.status(401).end()
  const bearer = header.split(' ')

  const token = bearer[1]
  const payload = await verifyToken(token)

  const user = await User.findById(payload.id).select('-password').lean().exec()
  if (!user) return res.status(401).end()

  req.user = user
  next()
}
