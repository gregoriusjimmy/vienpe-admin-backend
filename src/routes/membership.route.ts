import { Router } from 'express'
import { Pool } from 'pg'
import {
  handleMembershipGet,
  handleMembershipPost,
  handleMembershipPut,
} from '../controllers/membership.controller'

const membershipRoute = (pool: Pool) => {
  const router = Router()

  router.get('/', (req, res) => handleMembershipGet(req, res, pool))
  router.post('/', (req, res) => handleMembershipPost(req, res, pool))
  router.put('/', (req, res) => handleMembershipPut(req, res, pool))

  return router
}

export default membershipRoute
