import { Router } from 'express'
import { Pool } from 'pg'
import {
  handleAbsensInstrukturGet,
  handleAbsensiInstrukturPost,
} from '../controllers/absensiInstruktur'
import {
  handleAbsensiMemberGet,
  handleAbsensiMemberPost,
} from '../controllers/absensiMember.controller'

const absensiRoute = (pool: Pool) => {
  const router = Router()

  router.get('/member', (req, res) => handleAbsensiMemberGet(req, res, pool))
  router.post('/member', (req, res) => handleAbsensiMemberPost(req, res, pool))
  router.get('/instruktur', (req, res) => handleAbsensInstrukturGet(req, res, pool))
  router.post('/instruktur', (req, res) => handleAbsensiInstrukturPost(req, res, pool))

  return router
}

export default absensiRoute
