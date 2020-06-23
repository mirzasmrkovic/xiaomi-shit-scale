import { Effort } from './effort.model'

const crudControllers = model => {
  getAll: getLeaderboard(model)
}

export const controllers = crudControllers(Effort)
