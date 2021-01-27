import { Pool } from 'pg'

import { Router } from 'express'

import {
  handleTipeMembershipGet,
  handleTipeMembershipPost,
} from '../controllers/tipeMembership.controller'

const tipeMembershipRoute = (pool: Pool) => {
  const router = Router()

  router.get('/', (req, res) => handleTipeMembershipGet(req, res, pool))
  router.post('/', (req, res) => handleTipeMembershipPost(req, res, pool))

  return router
}

export default tipeMembershipRoute
