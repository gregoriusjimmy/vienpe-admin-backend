const express = require('express')
const absensiInstruktur = require('../controllers/absensiInstruktur')
const absensiMember = require('../controllers/absensiMember.controller')

const absensiRoute = (pool) => {
  const router = express.Router()

  router.get('/member', (req, res) => absensiMember.handleAbsensiMemberGet(req, res, pool))
  router.post('/member', (req, res) => absensiMember.handleAbsensiMemberPost(req, res, pool))
  router.get('/instruktur', (req, res) =>
    absensiInstruktur.handleAbsensInstrukturGet(req, res, pool)
  )
  router.post('/instruktur', (req, res) =>
    absensiInstruktur.handleAbsensiInstrukturPost(req, res, pool)
  )

  return router
}

module.exports = absensiRoute
