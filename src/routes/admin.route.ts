import { Router } from 'express'
import { Pool } from 'pg'

import { handleAdminLoginPost } from '../controllers/admin.controller'

const adminRoute = (pool: Pool) => {
  const router = Router()

  router.post('/login', (req, res) => handleAdminLoginPost(req, res, pool))

  return router
}

export default adminRoute
