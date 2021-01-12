import { Router } from 'express'
import { Pool } from 'pg'

import {
  handleInstrukturGet,
  handleInstrukturPost,
  handleInstrukturPut,
} from '../controllers/instruktur.controller'

const instrukturRoute = (pool: Pool) => {
  const router = Router()

  router.get('/', (req, res) => handleInstrukturGet(req, res, pool))
  router.post('/', (req, res) => handleInstrukturPost(req, res, pool))
  router.put('/', (req, res) => handleInstrukturPut(req, res, pool))

  return router
}
export default instrukturRoute
