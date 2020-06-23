// import { authControllers } from '../../utils/auth'
import { User } from './user.model'
import { crudControllers } from '../../utils/crud'

export const controllers = crudControllers(User)

export const me = async (req, res) => res.status(200).json({ data: req.user })
