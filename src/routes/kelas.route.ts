import { Router } from 'express'
import { Pool } from 'pg'

import {
  handleKelasGet,
  handleKelasPost,
  handleKelasAktifPut,
} from '../controllers/kelas.controller'

const kelasRoute = (pool: Pool) => {
  const router = Router()

  router.get('/', (req, res) => handleKelasGet(req, res, pool))
  router.post('/', (req, res) => handleKelasPost(req, res, pool))
  router.put('/aktif', (req, res) => handleKelasAktifPut(req, res, pool))
  return router
}

export default kelasRoute
