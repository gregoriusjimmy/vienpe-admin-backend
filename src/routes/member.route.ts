import { Router } from 'express'
import { Pool } from 'pg'

import {
  handleMemberGet,
  handleMemberPost,
  handleMemberPut,
} from '../controllers/member.controller'

const memberRoute = (pool: Pool) => {
  const router = Router()

  router.get('/', (req, res) => handleMemberGet(req, res, pool))
  router.post('/', (req, res) => handleMemberPost(req, res, pool))
  router.put('/', (req, res) => handleMemberPut(req, res, pool))

  return router
}

export default memberRoute
